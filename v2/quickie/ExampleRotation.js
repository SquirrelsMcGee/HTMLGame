/*
** This code demonstrates how one can rotate an object around an arbitrary point in the HTML canvas
*/


var size = { x: 100, y: 50 };
var rotPos = { rx: 0.5, ry: 0.5 }; // "uv" rotation coordinates

var pos = { x: 100, y: 10 };

setInterval(() => {
    theta = (theta + 1) % 360;

    // Clear the context
    ctx.clearRect(0, 0, c.width, c.height);

    // Draw object world pos
    ctx.fillStyle = "green";
    ctx.fillRect(0 + pos.x -2.5, 0 + pos.y -2.5, 5, 5);

    // Worldspace coordinates of the rotation
    let rotPosWX = size.x * rotPos.rx;
    let rotPosWY = size.y * rotPos.ry;

    // First translate the context to the center you wish to rotate around
    ctx.translate(rotPosWX + pos.x, rotPosWY + pos.y);

    // Perform the rotation
	ctx.rotate(theta * Math.PI / 180);

    // Undo the translation
    ctx.translate(-rotPosWX,-rotPosWY);

    // Draw Object
    ctx.fillStyle = "red";
	ctx.fillRect(0, 0, size.x, size.y);

    // Calculate centre of rotation in world space
    ctx.fillStyle = "blue";
    ctx.fillRect(0 + rotPosWX -2.5, 0 + rotPosWY -2.5, 5, 5);


	// Reset rotation
    ctx.resetTransform();

}, 10);
