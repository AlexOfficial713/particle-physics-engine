import Particle from "./particle.js";

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

let particle = new Particle(ctx, 10, 10);

export let randParticleSpawn = () => {
    let xPos = Math.floor((Math.random() * window_width.valueOf()) + 1);
    let yPos = 10;
    return [xPos, yPos];
}

export let randParticleVel = () => {
    let randVelX = Math.floor((Math.random() * 21) - 10);
    let randVelY = Math.floor((Math.random() * 21) - 10);
    return [randVelX, randVelY];
}

//Function called every frame
let tick = () => {
    let deltaTime = 0;
    if (lastTick != 0) deltaTime = (Date.now() - lastTick) / 1000; //DeltaTime is time since last frame in seconds

    particleList.forEach(element => {
        element.tickFunctions(deltaTime);
    });

    let randChance = Math.floor((Math.random() * 10) + 1);
    if (randChance == 1 && particleList.length < 51) {
        let location = randParticleSpawn();
        let velPair = randParticleVel();
        let par = new Particle(ctx, location[0], location[1]);
        par.velocity[0] = velPair[0];
        par.velocity[1] = velPair[1];
    }

    /*clearCounter++;
    if (clearCounter = 10) {
        ctx.clearRect(0, 0, window_width, window_height);
    }*/


    lastTick = Date.now();
    requestAnimationFrame(tick);
}
    
tick()