// ---color selsctor---

let colorOptions = document.querySelectorAll(".color-option");
let selectedColor;

colorOptions.forEach(function (colorOption) {
  colorOption.addEventListener("click", function () {
    selectedColor = colorOption.style.backgroundColor;
    colorOptions.forEach((option) => {
      option.classList.remove("selected-color");
    });
    colorOption.classList.add("selected-color");
  });
});

// ---canvas---

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const squareCount = 24;
const squareSize = canvas.width / squareCount;

canvas.addEventListener("click", function (event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  let row = Math.floor(y / squareSize);
  let col = Math.floor(x / squareSize);

  let xPos = col * squareSize;
  let yPos = row * squareSize;

  ctx.fillStyle = selectedColor;
  ctx.fillRect(xPos, yPos, squareSize, squareSize);
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

drawBorders();
