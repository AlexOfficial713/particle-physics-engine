import Particle from "./particle.js";
import User from "./user.js";

export const gravity = 0.1;
export let particleList = [];
let lastTick = 0;
let clearCounter = 0;

const viewPort = document.createElement("canvas");
document.body.appendChild(viewPort);
const ctx = viewPort.getContext("2d");
viewPort.id = "viewPort";
export let window_height = viewPort.height;
export let window_width = viewPort.width;

export let user = new User();

export let randParticleSpawn = () => {
    let xPos = Math.floor((Math.random() * window_width.valueOf()) + 1);
    let yPos = 1;
    return [xPos, yPos];
}

export let randParticleVel = () => {
    let randVelX = Math.floor((Math.random() * 51) - 10);
    let randVelY = Math.floor((Math.random() * 51) - 10);
    return [randVelX, randVelY];
}

export function boxCollisionDetection(x1, y1, w1, h1, x2, y2, w2, h2) {
    const rect1Bottom = y1 + h1;
    const rect1Right = x1 + w1;
    const rect2Bottom = y2 + h2;
    const rect2Right = x2 + w2;

    // Check for collision
    return !(rect1Bottom < y2 || y1 > rect2Bottom || rect1Right < x2 || x1 > rect2Right);
}
let location = randParticleSpawn();
        let velPair = randParticleVel();
        let par = new Particle(ctx, location[0], location[1]);
        par.velocity[0] = velPair[0];
        par.velocity[1] = velPair[1];

//Function called every frame
let tick = () => {
    let deltaTime = 0;
    if (lastTick != 0) deltaTime = (Date.now() - lastTick) / 1000; //DeltaTime is time since last frame in seconds

    particleList.forEach(element => {
        element.tickFunctions(deltaTime);
    });
    user.tickFunctions();

    /*let randChance = Math.floor((Math.random() * 10) + 1);
    if (randChance == 1 && particleList.length < 101) {
        let location = randParticleSpawn();
        let velPair = randParticleVel();
        let par = new Particle(ctx, location[0], location[1]);
        par.velocity[0] = velPair[0];
        par.velocity[1] = velPair[1];
    }*/

    lastTick = Date.now();
    requestAnimationFrame(tick);
}
    
tick()
