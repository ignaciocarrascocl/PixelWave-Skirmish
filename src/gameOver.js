// gameOver.js

import { createAnnouncement, animateAnnouncement } from "./createAnnouncement";
import { playSound } from "./sounds";
import { state } from "./state";

export function gameOver(app, player) {
  state.gameOver = true;

  if (player.parent) {
    player.parent.removeChild(player);
  }

  player.destroy();

  const announcementText = createAnnouncement(app);
  animateAnnouncement(announcementText, app, `Game over`);
  playSound("start.wav");
}