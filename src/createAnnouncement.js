// src/score.js
import * as PIXI from 'pixi.js';
import { state } from './state';

export function createAnnouncement(app) {
  const text = new PIXI.Text('Wave 1 Ready', {
    fontFamily: 'Bungee',
    fontSize: 28,
    fill: 0xffffff, // white
    align: 'center',
    fontWeight: 'bold',
  });

  text.anchor.set(0.5); // Center the text's anchor
  text.x = app.screen.width / 2;
  text.y = app.screen.height / 2;
  app.stage.addChild(text);

  return text;
}


export function animateAnnouncement(announcementText, app, customMessage = null) {
  updateAnnouncementText(announcementText, customMessage);

  announcementText.visible = true;
  announcementText.x = -announcementText.width;
  announcementText.alpha = 1;

  const targetX = app.renderer.screen.width / 2;
  const slideSpeed = 10;
  const duration = 3000;
  let opacitySpeed = 0.05;

  function slideIn() {
    announcementText.x += slideSpeed;

    if (announcementText.x < targetX) {
      requestAnimationFrame(slideIn);
    } else {
      announcementText.x = targetX;
      oscillateOpacity(duration, slideOut);
    }
  }

  function oscillateOpacity(timeRemaining, onComplete) {
    announcementText.alpha -= opacitySpeed;

    if (announcementText.alpha <= 0 || announcementText.alpha >= 1) {
      opacitySpeed = -opacitySpeed;
    }

    timeRemaining -= 16; // Approximate time for 60fps

    if (timeRemaining > 0) {
      requestAnimationFrame(() => oscillateOpacity(timeRemaining, onComplete));
    } else {
      onComplete();
    }
  }

  function slideOut() {
    announcementText.x += slideSpeed;

    if (announcementText.x < app.renderer.screen.width + announcementText.width) {
      requestAnimationFrame(slideOut);
    } else {
      announcementText.visible = false;
    }
  }

  slideIn();
}

function updateAnnouncementText(announcementText, customMessage = null) {
  if (customMessage) {
    announcementText.text = customMessage;
  } else {
    announcementText.text = `Wave ${state.wave} ready!`;
  }
}