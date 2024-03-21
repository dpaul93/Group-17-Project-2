const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app)
const PORT = 4000
// const PORT = process.env.PORT || 3000
const socketIO = require('socket.io')(http, {
    cors: {
      // origin: "*"}
          origin: "http://localhost:5173"}
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname,  "build", "index.html"));
//   });
// }

app.use(cors())
let users = []

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)  
    socket.on("message", data => {
      socketIO.emit("messageResponse", data)
    })

    socket.on("typing", data => (
      socket.broadcast.emit("typingResponse", data)
    ))

    socket.on("newUser", data => {
      users.push(data)
      socketIO.emit("newUserResponse", users)
    })

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      users = users.filter(user => user.socketID !== socket.id)
      socketIO.emit("newUserResponse", users)
      socket.disconnect()
    });
});

// app.get('/', (req, res) => {
//   res.send("hello world")
// })

app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);

// app.listen(process.env.PORT || 3000, () => {
//     console.log("Server has started");

    // socketIO.listen(process.env.PORT || 3000);
});