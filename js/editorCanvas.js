/*
  this handles te DRAWING to the
  CANVAS element in the editor
*/

var color = {
    1: '#65702A',
    2: '#BABF75',
    3: '#F2E5AD',
    4: '#759CBF',
    5: '#7194F4',
    6: '#F2EBCC',
    7: '#BF6858', //clay pot
    8: '#8A4926', //brown bark
}

var age = {
    "limb1" : 0,
    "limb2" : 0,
    "limb3" : 0,
}

var canvas = document.getElementById("plantCanvas")
var c = canvas.getContext("2d");
function init()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}

function draw()
{
    c.fillStyle = color[6];
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = color[2];
    //drawCircle(200, 200, 200);
    updateAge();
    drawTree(canvas.width/2, canvas.height* 7/8, 300)
    
    requestAnimationFrame(draw);
}
init();


function drawCircle(x, y, r)
{
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI*2);
    c.fill();
}

function drawLeaf(x, y)
{

}
//TODO should depend on age and
//if you are actually looking at the page
function updateAge()
{
    let dt = 0.2;
    if(age['limb1'] < 100)
    {
	age['limb1'] += dt;
    }
    else if(age['limb2'] < 100)
    {
	age['limb2'] += dt;
    }
    else if(age['limb3'] < 100)
    {
	age['limb3'] += dt;
    }
}

function drawTree(x, y, h)
{
    //x, y is the BOTTOM of the tree's pot
    let w = 60;
    c.fillStyle = color[7];
    c.fillRect(x - w/2, y, w, h/10);
    let trunkWidth = w/5;
    c.fillStyle = color[8];
    c.fillRect(x - trunkWidth/2, y - h, trunkWidth, h);

    var drawLimb = function(x, y, angle, age){
	let limbW = 10;
	let limbH = 90 * age/100;
	let leafSize = 40;
	c.fillStyle = color[8];
	c.translate(x, y);
	c.rotate(angle);
	c.fillRect(0, 0, limbH, limbW); //this seems backwards but is correct
	c.setTransform(1, 0, 0, 1, 0, 0); //clear tranformations
	c.translate(x + limbH * Math.cos(angle), y + limbH * Math.sin(angle));
	c.fillStyle = color[2];
	drawCircle(0, 0, leafSize * age/100);
	c.setTransform(1, 0, 0, 1, 0, 0); //clear tranformations
    }

    //limb1
    let limb1X = x - 3 ;
    let limb1Y = y - 1/9 * h;
    drawLimb(limb1X, limb1Y, -Math.PI*3/4, age['limb1']);

    let limb2X = x - 3 ;
    let limb2Y = y - 1/2 * h;
    drawLimb(limb2X, limb2Y, -Math.PI*1/4, age['limb2']);
    
    let limb3X = x - 3 ;
    let limb3Y = y - 5/6 * h;
    drawLimb(limb3X, limb3Y, -Math.PI*3/4, age['limb3']);
}
