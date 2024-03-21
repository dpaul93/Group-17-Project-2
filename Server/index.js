const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app)
const path = require('path')
// const PORT = process.env.PORT || 3000
const socketIO = require('socket.io')(http, {
    cors: {
      origin: "*"}
          // origin: "http://localhost:3000"}
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "build", "index.html"));
  });
}

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

app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Server has started");

    // socketIO.listen(process.env.PORT || 3000);
});