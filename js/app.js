//canvas elements
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

//range slider element
const sliderDiv = document.getElementById('sliderDiv');
const slider = document.getElementById('slider');
const sliderP = document.getElementById('sliderAmt');

//initializes on change in window size or new slider vaule
window.addEventListener('resize', init);
slider.addEventListener('input', refresh)

//stores canvas dimensions
var width = window.innerWidth;
var height = window.innerHeight;

//constants for tree;
const length = 200;
var angle = Math.PI/4;
const minSize = 2;

function init() {
    //sets up slider;
    sliderDiv.style.width = width/2 + "px";
    sliderDiv.style.height = "2rem";
    
    sliderP.innerHTML = parseFloat(slider.value).toFixed(2);
    sliderP.style.fontSize = "1.5rem";
    sliderP.style.color = "#fff";
    
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

    //draws background color
    c.fillStyle = "#333";
    c.fillRect(0, 0, width, height);

    //moves the origin of the canvas
    c.translate(width/2, height);

    //draws tree
    branch(length);
}

function refresh() {
    init();
    angle = slider.value;
    //2.46 looks like snow flake fractal
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
        // c.rotate(angle + ((Math.random()*Math.PI/8) - Math.PI/16));

        //recursively calls back
        branch(2*len/3);

        //restores to previous canvas state
        c.restore();

        //does the same for the left side
        c.save();
        c.rotate(-angle);
        // c.rotate(-angle + ((Math.random()*Math.PI/8) - Math.PI/16));
        branch(2*len/3);
        c.restore();

        // c.save();
        // branch(2*len/3);
        // c.restore();

        //adds in another 2 branches
        // c.save();
        // c.rotate(angle/4);
        // branch(2*len/3);
        // c.restore();

        // c.save();
        // c.rotate(-angle/4);
        // branch(2*len/3);
        // c.restore();
    }
}

//animation
// var anim = 0;
// var da = .01;

// function animate() {
//     requestAnimationFrame(animate);
//     c.fillStyle = "#333";
//     c.fillRect(0, 0, width, height);

//     anim += da;
//     // if(anim > Math.PI || anim < 0)
//     //     da = -da;
//     // slider.value = anim;
//     refresh();
// }

//initalizes at run time
init();

//animate();