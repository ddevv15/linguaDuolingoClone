from typing import Any

from vision_agents.core import Agent, AgentLauncher, Runner, User
from vision_agents.core.instructions import Instructions
from vision_agents.plugins import getstream, openai

BASE_INSTRUCTIONS = """
You're a warm, energetic language teacher in a real one-on-one conversation — not a script reader.

How you sound:
- Talk like a real person: short, natural sentences with contractions ("let's", "you've got it", "nice try").
- Keep every reply to one or two sentences, then stop and let the student respond — this is a back-and-forth, not a monologue.
- Mostly speak English. When you bring in a target-language word or phrase, say it slowly and immediately give its English translation.
- Bring genuine energy and warmth — sound delighted when they get it, gentle when they don't.
- Never use markdown — this is a voice call.

How you teach:
- Stay locked onto today's lesson — its language, its goal, its words and phrases. Don't wander into other topics or other languages.
- Introduce one word or phrase at a time, model it slowly with its translation, then ask the student to say it back to you.
- Actually listen to what they say. If they nail it, celebrate briefly and move on. If they stumble, correct them gently and ask them to try again before moving forward.
- Let their response shape what you do next — pick up the pace when they're flying, slow down and re-explain when they need it.
"""


async def create_agent() -> Agent:
    # StreamEdge reads STREAM_API_KEY and STREAM_API_SECRET from .env automatically.
    edge = getstream.Edge()

    # Realtime reads OPENAI_API_KEY from .env automatically.
    # send_video=False keeps this voice-only — no video frames sent to OpenAI.
    llm = openai.Realtime(
        model="gpt-realtime-2",
        voice="alloy",
        send_video=False,
    )

    return Agent(
        edge=edge,
        llm=llm,
        agent_user=User(id="language-teacher", name="Language Teacher"),
        instructions=BASE_INSTRUCTIONS,
    )


def _build_lesson_instructions(context: dict[str, Any]) -> str:
    """Turn the AgentCallContext packed into the call's custom data (see
    src/types/learning.ts) into instructions tailored to this lesson."""
    lines = [BASE_INSTRUCTIONS.strip(), ""]

    lesson_title = context.get("lessonTitle")
    language_name = context.get("languageName")
    if lesson_title:
        lines.append(
            f'Today\'s lesson is "{lesson_title}"'
            + (f" ({language_name})" if language_name else "")
            + ". Greet the student warmly, mention the lesson by name, "
            "and jump straight into practicing together — no need to ask "
            "which language or level they're at."
        )

    lesson_description = context.get("lessonDescription")
    if lesson_description:
        lines.append(f"Lesson focus: {lesson_description}")

    goal = context.get("goal") or {}
    if goal.get("description"):
        lines.append(f"Session goal: {goal['description']}")

    vocabulary = context.get("vocabulary") or []
    words = ", ".join(
        f"{item['word']} ({item['translation']})"
        for item in vocabulary
        if item.get("word") and item.get("translation")
    )
    if words:
        lines.append(f"Practice these vocabulary words with the student: {words}.")

    phrases = context.get("phrases") or []
    phrase_list = ", ".join(
        f'"{item["phrase"]}" ({item["translation"]})'
        for item in phrases
        if item.get("phrase") and item.get("translation")
    )
    if phrase_list:
        lines.append(f"Practice these phrases with the student: {phrase_list}.")

    teacher_prompt = context.get("teacherPrompt")
    if teacher_prompt:
        lines.append(teacher_prompt)

    return "\n".join(lines)


async def join_call(agent: Agent, call_type: str, call_id: str) -> None:
    call = await agent.create_call(call_type, call_id)

    # Read the lesson context the Expo app packed into the call's custom data
    # on join (see AgentCallContext in src/types/learning.ts) and tailor the
    # agent's instructions to this specific lesson before it starts talking.
    await call.get()
    context = call.custom_data or {}
    if context:
        agent.instructions = Instructions(input_text=_build_lesson_instructions(context))

    async with agent.join(call):
        await agent.finish()


if __name__ == "__main__":
    runner = Runner(
        launcher=AgentLauncher(
            create_agent=create_agent,
            join_call=join_call,
        )
    )
    runner.cli()
