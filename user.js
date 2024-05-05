export default class User {
    constructor() {
        this.div = document.createElement("div");
        this.width = 100;
        this.height = 100;
        
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.backgroundColor = "blue";
        this.div.style.position = "absolute"
        this.div.style.zIndex = 100;

        document.addEventListener("mousemove", (event)=>{this.mouseMonitor(event)})

        document.body.appendChild(this.div)
    }

    mouseMonitor(event) {
        this.mouseX = event.pageX;
        this.mouseY = event.pageY;
    }

    tickFunctions() {
        this.div.style.left = this.mouseX - this.width / 2 + "px"
        this.div.style.top = this.mouseY - this.height / 2 + "px"
    }
}