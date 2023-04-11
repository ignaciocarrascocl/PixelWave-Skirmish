export function restartPlayer(player, app){
    player.x = (app.screen.width - player.width) / 2;
    player.y = app.screen.height - player.height * 2;
}