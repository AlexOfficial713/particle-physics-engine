import Particle from "./particle.js";

export const gravity = 0.1;
export let particleList = [];
export let window_height = window.innerHeight;
export let window_width = window.innerWidth;
let lastTick = 0;

const viewPort = document.createElement("canvas");
document.body.appendChild(viewPort);
const ctx = viewPort.getContext("2d");
viewPort.id = "viewPort";
let particle = new Particle(ctx, 10, 10);

//Function called every frame
let tick = () => {
    let deltaTime = 0;
    if (lastTick != 0) deltaTime = (Date.now() - lastTick) / 1000; //DeltaTime is time since last frame in seconds

    particleList.forEach(element => {
        element.tickFunctions(deltaTime);
    });

    let randChance = Math.floor((Math.random() * 10) + 1);
    if (randChance == 1 && particleList.length < 11) {
        let xPos = Math.floor((Math.random() * window_width) + 1);
        new Particle(ctx, xPos, 10);
    }

    lastTick = Date.now();
    requestAnimationFrame(tick);
}
    
tick()