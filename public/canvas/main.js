const rgbas = [
	[0, 0, 0, 255],
	[137, 141, 144, 255],
	[255, 255, 255, 255],
	[212, 215, 217, 255],
	[156, 105, 38, 255],
	[255, 153, 170, 255],
	[180, 74, 192, 255],
	[129, 30, 159, 255],
	[81, 233, 244, 255],
	[54, 144, 234, 255],
	[36, 80, 164, 255],
	[126, 237, 86, 255],
	[0, 163, 104, 255],
	[255, 214, 53, 255],
	[255, 168, 0, 255],
	[255, 69, 0, 255],
];
const container = document.querySelector(".canvas-container");
container.style.transform = "scale(20, 20)";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorOptions = document.querySelectorAll(".color-option");

fetch("http://localhost:3000/api/canvas")
	.then((res) => res.json())
	.then((data) => {
		let canvasImg = [];
		data.forEach((color) => {
			const rgba = rgbas[color];
			canvasImg = canvasImg.concat(rgba);
		});
		const imgData = new ImageData(new Uint8ClampedArray(canvasImg), 32);
		ctx.putImageData(imgData, 0, 0);
	})
	.catch((err) => console.error(err));

let selectedColor = "rgb(0, 0, 0)";
let zoom = 20;
const zoomSpeed = 2;
const squareCount = canvas.width;
let squareSize = zoom;

// ---color selector---
colorOptions.forEach(function (colorOption) {
	colorOption.addEventListener("click", function () {
		selectedColor = colorOption.style.backgroundColor;
		colorOptions.forEach((option) => {
			option.classList.remove("selected-color");
		});
		colorOption.classList.add("selected-color");
	});
});

// ---navigation---
// zoom
container.addEventListener("wheel", (e) => {
	if (e.deltaY < 0) {
		zoom += zoomSpeed;
	} else if (e.deltaY > 0 && zoom > 2) {
		zoom -= zoomSpeed;
	}
	container.style.transform = `scale(${zoom}, ${zoom})`;
	squareSize = zoom;
});

// pan
let isDragging = false;
let startCoords = { x: 0, y: 0 };
let translation = { x: 0, y: 0 };
let downPos = { x: 0, y: 0 };
const threshold = 4;

container.addEventListener("mousedown", function (e) {
	isDragging = true;
	startCoords.x = e.clientX;
	startCoords.y = e.clientY;
	downPos.x = e.clientX;
	downPos.y = e.clientY;
});
container.addEventListener("mouseup", () => {
	isDragging = false;
	container.style.cursor = "default";
});
container.addEventListener("mousemove", function (e) {
	if (isDragging) {
		const diffX = Math.abs(e.clientX - downPos.x);
		const diffY = Math.abs(e.clientY - downPos.y);
		if (diffX > threshold || diffY > threshold) {
			const deltaX = e.clientX - startCoords.x;
			const deltaY = e.clientY - startCoords.y;

			translation.x += deltaX;
			translation.y += deltaY;

			startCoords.x = e.clientX;
			startCoords.y = e.clientY;

			container.style.cursor = "move";

			// updating canvas position
			canvas.style.transform = `translate(${translation.x / zoom}px, ${
				translation.y / zoom
			}px)`;
		}
	}
});

// ---canvas---
// color new square
canvas.addEventListener("mouseup", function (e) {
	isDragging = false;
	container.style.cursor = "default";

	const diffX = Math.abs(e.clientX - downPos.x);
	const diffY = Math.abs(e.clientY - downPos.y);

	if (diffX < threshold && diffY < threshold) {
		let rect = canvas.getBoundingClientRect();
		let x = e.clientX - rect.left;
		let y = e.clientY - rect.top;

		let xPos = Math.floor(x / squareSize);
		let yPos = Math.floor(y / squareSize);

		ctx.fillStyle = selectedColor;
		ctx.strokeStyle = "rgba(0, 0, 0, 0)";
		ctx.fillRect(xPos, yPos, squareSize / zoom, squareSize / zoom);

		socket.emit("pixelPlaced", { x: xPos, y: yPos, col: selectedColor });
	}
});

socket.on("pixelReceived", (data) => {
	ctx.fillStyle = data.col;
	ctx.strokeStyle = "rgba(0, 0, 0, 0)";
	ctx.fillRect(data.x, data.y, squareSize / zoom, squareSize / zoom);
});

function drawLine(a, b, c, d) {
	ctx.beginPath();
	ctx.moveTo(a, b);
	ctx.lineTo(c, d);
	ctx.stroke();
}

function drawBorders() {
	ctx.strokeStyle = "lightgray";
	ctx.lineWidth = 1;

	for (let row = 0; row <= squareCount - 1; row++) {
		for (let col = 0; col <= squareCount - 1; col++) {
			let xPos = col * squareSize;
			let yPos = row * squareSize;

			drawLine(xPos, yPos, xPos + squareSize, yPos);
			drawLine(xPos, yPos, xPos, yPos + squareSize);
		}
	}
}
