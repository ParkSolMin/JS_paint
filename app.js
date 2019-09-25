const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const colors = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

let painting = false;
let filling = false;

canvas.width = 700;
canvas.height = 600;

ctx.lineWidth = 5;
ctx.strokeStyle = "black";
ctx.fillStyle = "black";

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onPaintingSize(event) {
   ctx.lineWidth = event.target.value; 
}

function onChangeColor(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
}

function modeClick() {
    if(filling) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function clickFilling() {
    if(filling) {
        ctx.fillRect(0, 0, 700, 600);
    }
}

function rightClick(event) {
    event.preventDefault();
}

function saveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image
    link.download = "new_image";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("click", clickFilling);

    canvas.addEventListener("contextmenu", rightClick);
}

if(range) {
    range.addEventListener("input", onPaintingSize);
}

Array.from(colors).forEach(color => color.addEventListener("click", onChangeColor));

if(mode) {
    mode.addEventListener("click", modeClick);
}

if(save) { 
    save.addEventListener("click", saveClick);
}