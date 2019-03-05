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
    requestAnimationFrame(draw);
}
init();
