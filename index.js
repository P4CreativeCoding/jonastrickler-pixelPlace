const colors = [
	"rgb(0, 0, 0)",
	"rgb(137, 141, 144)",
	"rgb(255, 255, 255)",
	"rgb(212, 215, 217)",
	"rgb(156, 105, 38)",
	"rgb(255, 153, 170)",
	"rgb(180, 74, 192)",
	"rgb(129, 30, 159)",
	"rgb(81, 233, 244)",
	"rgb(54, 144, 234)",
	"rgb(36, 80, 164)",
	"rgb(126, 237, 86)",
	"rgb(0, 163, 104)",
	"rgb(255, 214, 53)",
	"rgb(255, 168, 0)",
	"rgb(255, 69, 0)",
];
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

const canvasSize = 32;
const canvasArr = [];
for (let i = 0; i < canvasSize; i++) {
	for (let j = 0; j < canvasSize; j++) {
		canvasArr.push(2);
	}
}

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("pixelPlaced", (data) => {
		const colorIndex = colors.indexOf(data.col);
		canvasArr[data.x + data.y * canvasSize] = colorIndex;

		io.emit("pixelReceived", data);
	});
});

app.get("/api/canvas", (req, res) => {
	res.json(canvasArr);
});

server.listen(port, function () {
	console.log(`App listening on port: ${port}`);
});
