import * as PIXI from 'pixi.js';


export function createApp(){

    // Create a Pixi Application
const app = new PIXI.Application({
    width: 400,
    height: 800,
    backgroundColor: 0x000000,
});
globalThis.__PIXI_APP__ = app;
document.body.appendChild(app.view);
return app;
}