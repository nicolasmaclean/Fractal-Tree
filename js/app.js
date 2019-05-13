//canvas elements
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

//range slider element
const sliderDiv = document.getElementById('sliderDiv');
const slider = document.getElementById('slider');
const sliderP = document.getElementById('sliderAmt');
const check2 = document.getElementById('2');
const check3 = document.getElementById('3');
const check4 = document.getElementById('4');
const lenInput = document.getElementById('length');

//initializes on change in window size or new slider vaule
window.addEventListener('resize', init);
slider.addEventListener('input', () => {
    angle = slider.value;
    init();
});
check2.addEventListener('change', () => {
    type = 0;
    init();
});
check3.addEventListener('change', () => {
    type = 1;
    init();
});
check4.addEventListener('change', () => {
    type = 2;
    init();
});
lenInput.addEventListener('input', () => {
    minSize = lenInput.value;
    init();
});

//stores canvas dimensions
var width = window.innerWidth;
var height = window.innerHeight;

//constants for tree;
var length = canvas.height/3;
var angle = Math.PI/4;
var minSize = 10;
var type = 0;


lenInput.value = 10;
function init() {
    //sets up slider;
    sliderDiv.style.width = width/2 + "px";
    // sliderDiv.style.height = "10rem";
    
    slider.style.width = width/4 + "px";
    slider.defaultValue = 3*Math.PI/4;
    slider.max = Math.PI;
    slider.min = -Math.PI;
    slider.step = ".05";
    
    //sets the canvas dimensions
    width = window.innerWidth;
    height = window.innerHeight - sliderDiv.clientHeight;
    canvas.width = width;
    canvas.height = height;
    
    if(canvas.height < canvas.width){
        length = canvas.height/3;
    } else {
        length = canvas.width/3;
    }
    
    //draws background color
    c.fillStyle = "#333";
    c.fillRect(0, 0, width, height);
    
    let temp = "angle: " + (180* parseFloat(slider.value).toFixed(2)/Math.PI);
    if(temp.substring(8, 9) === "."){
        sliderP.innerHTML = temp.substring(0, 8) + '\u00B0';
    } else
        sliderP.innerHTML = temp.substring(0, 9) + '\u00B0';
    sliderP.style.fontSize = "1.5rem";
    sliderP.style.color = "#fff";

    //moves the origin of the canvas
    c.translate(width/2, height);
    
    switch(type){
        case 0: branch(length); break;
        case 1: branch3(length); break;
        case 2: branch4(length); break;
    }
}

//recursively draws tree
function branch(len) {
    //draws current branch
    c.strokeStyle = "#fff";
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(0, -len);
    c.stroke();

    //moves origin to the end of the branch
    c.translate(0, -len);

    //stops recurision if the length is too short
    if(len > minSize){
        //saves original canvas state
        c.save();

        //rotates right
        c.rotate(angle);

        //recursively calls back
        branch(2*len/3);

        //restores to previous canvas state
        c.restore();

        //does the same for the left side
        c.save();
        c.rotate(-angle);
        branch(2*len/3);
        c.restore();
    }
}

function branch3(len){
    c.strokeStyle = "#fff";
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(0, -len);
    c.stroke();

    c.translate(0, -len);

    if(len > minSize){
        c.save();
        c.rotate(angle);
        branch(2*len/3);
        c.restore();

        c.save();
        c.rotate(-angle);
        branch(2*len/3);
        c.restore();

        c.save();
        branch(2*len/3);
        c.restore();
    }
}

function branch4(len){
    c.strokeStyle = "#fff";
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(0, -len);
    c.stroke();

    c.translate(0, -len);

    if(len > minSize){
        c.save();
        c.rotate(angle);
        branch(2*len/3);
        c.restore();

        c.save();
        c.rotate(-angle);
        branch(2*len/3);
        c.restore();

        c.save();
        c.rotate(angle/3);
        branch(2*len/3);
        c.restore();

        c.save();
        c.rotate(-angle/3);
        branch(2*len/3);
        c.restore();
    }
}

init();