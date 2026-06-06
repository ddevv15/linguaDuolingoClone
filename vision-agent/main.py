from vision_agents.core import Agent, AgentLauncher, Runner, User
from vision_agents.plugins import getstream, openai

INSTRUCTIONS = """
You are an enthusiastic, patient AI language teacher.

Rules:
- You always speak English.
- You help the student learn their target language through English.
- At the start of every session, greet the student warmly and ask which language
  they want to practice and their current level (beginner / intermediate / advanced).
- Adapt your exercises to their level.
- Keep turns short and conversational.
- Correct mistakes gently and immediately, then continue.
- Use simple vocabulary in your English explanations.
- Celebrate progress with brief encouragement.
- Do not use markdown formatting — this is a voice call.
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
        instructions=INSTRUCTIONS,
    )


async def join_call(agent: Agent, call_type: str, call_id: str) -> None:
    call = await agent.create_call(call_type, call_id)
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
