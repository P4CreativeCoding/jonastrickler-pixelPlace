const container = document.querySelector(".canvas-container");
container.style.transform = "scale(20, 20)";
const canvas = document.getElementById("canvas");
canvas.style.transform = "translate(0, 0)";
const ctx = canvas.getContext("2d");
const colorOptions = document.querySelectorAll(".color-option");

let selectedColor = "black";

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
		// let x = e.clientX - rect.left - zoom / 2;
		let x = e.clientX - rect.left;
		let y = e.clientY - rect.top - zoom / 2;
		console.log(x, y);

		let xPos = Math.floor(x / squareSize);
		let yPos = Math.floor(y / squareSize);

		ctx.fillStyle = selectedColor;
		ctx.strokeStyle = "rgba(0, 0, 0, 0)";
		ctx.fillRect(xPos, yPos, squareSize / zoom, squareSize / zoom);
	}
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
