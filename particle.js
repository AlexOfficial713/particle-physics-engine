import { gravity, particleList, window_height, window_width, randParticleSpawn, randParticleVel, boxCollisionDetection, user } from "./script.js";

class Force {
    constructor(xComponent, yComponent, id) {
        this.x = xComponent;
        this.y = yComponent;
        this.id = id;
    }
}

export default class Particle {
    constructor(ctx, x, y, color = "#FF0000", mass = 5) {
        this.color = color;
        this.ctx = ctx;
        this.mass = mass;
        this.forces = [];

        ctx.beginPath();
        ctx.rect(x, y, 1, 1);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

        //Arrays with x,y components
        this.netForce = [0, 0];
        this.acceleration = [0, 0];
        this.velocity = [0, 0];
        this.x = x;
        this.y = y;

        particleList.push(this);
        document.body.addEventListener("keypress", ()=>{
            this.velocity[0] = 0
            console.log("hi")
        });
    }

    setPosition(x, y) {
        this.ctx.clearRect(this.x - 3, this.y - 3, 6, 6);
        
        this.ctx.beginPath();
        this.ctx.rect(x, y, 1, 1);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
        

        this.x = x;
        this.y = y;
    }

    findForceWithID(id) {
        this.forces.forEach((element, index) => {
            if (element.id = id) return index;
        })
        return -1;
    }

    applyForce(force) {
        if(this.findForceWithID(force.id) < 0) {
            this.forces.push(force);
            this.netForce[0] += force.x;
            this.netForce[1] += force.y;
        }
    }

    removeForce(id) {
        if(this.findForceWithID(id) > -1) {
            this.forces.splice(this.findForceWithID(id), 1);
            this.netForce[0] -= forces[this.findForceWithID(id)].x;
            this.netForce[1] -= forces[this.findForceWithID(id)].y;
        }
    }

    //DeltaTime is time since last frame in seconds
    tickFunctions(deltaTime) {
        if (this.velocity[0] != 0 || this.velocity[1] != 0) {
            const bounceDecrease = 5;

            if (this.x + (this.velocity[0] * deltaTime) <= 0) {
                //velocity is initially negative
                if (-this.velocity[0] - bounceDecrease > 0) this.velocity[0] = -this.velocity[0] - bounceDecrease;
                else {
                    this.velocity[0] = 0;
                    this.setPosition(0, this.y);
                }
            }
            if (this.x + (this.velocity[0] * deltaTime) >= window_width) {
                //velocity is initially positive
                if (-this.velocity[0] + bounceDecrease < 0) this.velocity[0] = -this.velocity[0] + bounceDecrease;
                else {
                    this.velocity[0] = 0;
                    this.setPosition(window_width, this.y);
                }
            }
            if (this.y + (this.velocity[1] * deltaTime) <= 0) {
                //velocity is initially negative
                if (-this.velocity[1] - bounceDecrease > 0) this.velocity[1] = -this.velocity[1] - bounceDecrease;
            }
            if (this.y + (this.velocity[1] * deltaTime) >= window_height) {
                //velocity is initially positive
                if (-this.velocity[1] + bounceDecrease < 0) this.velocity[1] = -this.velocity[1] + bounceDecrease;
                else {
                    this.velocity[1] = 0;
                    this.setPosition(this.x, window_height);
                }
            }
        }
        if (this.acceleration[0] != 0 || this.acceleration[1] != 0) {
            this.velocity[0] = this.velocity[0] + (this.acceleration[0] * deltaTime);
            this.velocity[1] = this.velocity[1] + (this.acceleration[1] * deltaTime);
        }
        if (this.forces.length > 0) {
            this.acceleration[0] = this.netForce[0] / this.mass;
            this.acceleration[1] = this.netForce[1] / this.mass;
        }

        /*let randRespawnChance = Math.floor((Math.random() * 1001) + 1);
        if (randRespawnChance == 1) {
            let location = randParticleSpawn();
            let randVel = randParticleVel();
            this.setPosition(location[0], location[1]);
            this.velocity[0] = randVel[0];
            this.velocity[1] = randVel[1];
        }*/

        //collision detection
        if (boxCollisionDetection(user.x, user.y, user.width, user.height, this.x, this.y, 1, 1)) { 
            if (particleList.indexOf(this) == 0) {
                console.log("collision")
            }
            this.velocity[0] = 0
            this.velocity[1] = 0
        }

        this.setPosition(this.x + (this.velocity[0] * deltaTime), this.y + (this.velocity[1] * deltaTime))

        this.applyForce(new Force(0, gravity * this.mass, "gravity"));
    }
}