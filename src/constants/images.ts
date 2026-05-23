// declare png modules locally to satisfy TS when project doesn't have global declarations
declare module '*.png';

import earth from "@/assets/images/earth.png";
import mascotAuth from "@/assets/images/mascot-auth.png";
import mascotWelcome from "@/assets/images/mascot-welcome.png";
import mascotLogo from "@/assets/images/moscot-logo.png";
import palace from "@/assets/images/palace.png";
import streakFire from "@/assets/images/streak-fire.png";
import treasure from "@/assets/images/treasure.png";

export const images = {
  mascotLogo,
  mascotWelcome,
  mascotAuth,
  earth,
  palace,
  treasure,
  streakFire,
};
