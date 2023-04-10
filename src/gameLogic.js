// src/gamelogic.js

import { state } from "./state";
import { animateAnnouncement, createAnnouncement } from "./createAnnouncement";
import { playSound } from "/src/sounds";

export function gameLogic(app) {
  const { enemyCounter, waveReady, wave } = state;
  if (!state.gameStart && !state.waiting) {
    // first run of the game.
    const announcementText = createAnnouncement(app);
    animateAnnouncement(announcementText, app, `Game start`);
    playSound("start.wav");
    setTimeout(() => {
      animateAnnouncement(announcementText, app, `Incomming wave`);
      playSound('interaction.wav', 1)
      setTimeout(() => {
        state.gameStarted = true;
      }, 3000);
    }, 3000);
    state.gameStart = true;
  }

  if (enemyCounter === 0 && waveReady) {
    //change wave/level
    const announcementText = createAnnouncement(app);
    animateAnnouncement(announcementText, app, `Wave ${wave} exterminated!`);

    playSound('activate.wav')

    state.waveReady = false;
    state.wave++;
    state.waiting = true;
    // reset the generated enemies waiting 3 seconds for the announcement and then 3 seconds to start generating enemies
    setTimeout(() => {
      state.generatedEnemies = { type1: 0, type2: 0, type3: 0 };
      animateAnnouncement(
        announcementText,
        app,
        `Wave ${state.wave} incoming!`
      );
      playSound('ping.wav')
      setTimeout(() => {
        state.waiting = false;
      }, 3000);
    }, 3000);
  }
}
