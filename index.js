// const express = require("express");
// const app = express();
// const port = 8080;
// const socketIo = require("socket.io");
// const http = require("http");
// const server = http.createServer(app);
// const io = socketIo(server);

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log(`App listening on port: ${port}`);
});

app.use(express.static(__dirname + '/public'));

// app.listen(port, () => {
//   console.log(`App listening on port: ${port}`);
// });

io.on("connection", (socket) => {
  console.log("a user connected");
});
