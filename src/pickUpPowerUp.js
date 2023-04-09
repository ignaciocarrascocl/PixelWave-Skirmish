//powerUp
import { playSound } from '/src/sounds';
import { effects } from './particles';
import { state } from './state';
import { regainHealth } from "./regainHealth";

export function pickUpPowerUp(app, player, powerup){
if(player){
    if(powerup.getBounds()){
        const playerBounds = player.getBounds();
        const currentPowerUpBounds = powerup.getBounds();
        if (playerBounds.intersects(currentPowerUpBounds)) {
            if(powerup.type == 'bomb'){
                state.bombs = state.bombs + 3;
                state.score = state.score+10
            } else if(powerup.type == 'health'){
                regainHealth(player)
                state.score = state.score+10

            } else {
                state.score = state.score+10
                if(state.weaponUpgrade < 3){
                    state.weaponUpgrade++
                }
            }
            effects(powerup.x, powerup.y, 10, 5, app, powerup.color);
            app.stage.removeChild(powerup);
            state.currentPowerUps.splice(state.currentPowerUps.indexOf(powerup), 1);
            playSound("ok.wav", 1);
            powerup.destroy();
          }
    }
}


}