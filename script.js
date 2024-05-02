const viewPort = document.createElement("canvas");
document.body.appendChild(viewPort);
const ctx = viewPort.getContext("2d");
viewPort.id = "viewPort";
ctx.beginPath();
ctx.rect(0, 0, 100, 100);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();
