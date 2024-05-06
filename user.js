export default class User {
    constructor() {
        this.refreshTime = 100; //Time in ms that it will take before velocity and acceleration are updated
        this.div = document.createElement("div");
        this.width = 100;
        this.height = 100;
        
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.backgroundColor = "blue";
        this.div.style.position = "absolute"
        this.div.style.zIndex = 100;

        this.velocity = [0, 0];
        this.acceleration = [0, 0];
        this.x = this.div.getBoundingClientRect().x;
        this.y = this.div.getBoundingClientRect().y;

        document.addEventListener("mousemove", (event)=>{this.mouseMonitor(event)})

        document.body.appendChild(this.div)

        setTimeout(() => {
            let newVelX = (this.div.getBoundingClientRect().x - this.x) / (this.refreshTime / 1000);
            let newVelY = (this.div.getBoundingClientRect().y - this.y) / (this.refreshTime / 1000);

            this.acceleration[0] = (newVelX - this.velocity[0]) / (this.refreshTime / 1000);
            this.acceleration[1] = (newVelY - this.velocity[1]) / (this.refreshTime / 1000);

            this.velocity[0] = newVelX;
            this.velocity[1] = newVelY;

            this.refreshVars();
        }, this.refreshTime);
    }

    refreshVars() {
        setTimeout(() => {
            let newVelX = (this.div.getBoundingClientRect().x - this.x) / (this.refreshTime / 1000);
            let newVelY = (this.div.getBoundingClientRect().y - this.y) / (this.refreshTime / 1000);

            this.acceleration[0] = (newVelX - this.velocity[0]) / (this.refreshTime / 1000);
            this.acceleration[1] = (newVelY - this.velocity[1]) / (this.refreshTime / 1000);

            this.x = this.div.getBoundingClientRect().x;
            this.y = this.div.getBoundingClientRect().y;

            this.velocity[0] = newVelX;
            this.velocity[1] = newVelY;

            this.refreshVars();
        }, this.refreshTime);
    }

    mouseMonitor(event) {
        this.mouseX = event.pageX;
        this.mouseY = event.pageY;
    }

    tickFunctions() {
        this.div.style.left = this.mouseX - this.width / 2 + "px"
        this.div.style.top = this.mouseY - this.height / 2 + "px"

        this.x = this.mouseX - this.width / 2;
        this.y = this.mouseY - this.height / 2;
    }
}