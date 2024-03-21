const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app)
const PORT = process.env.PORT || 3000
const socket = require('socket.io');(http, {
    cors: {
      origin: "*"}
          // origin: "http://localhost:3000"}
});

app.use(cors())
let users = []

socket.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)  
    socket.on("message", data => {
      socket.emit("messageResponse", data)
    })

    socket.on("typing", data => (
      socket.broadcast.emit("typingResponse", data)
    ))

    socket.on("newUser", data => {
      users.push(data)
      socket.emit("newUserResponse", users)
    })

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      users = users.filter(user => user.socketID !== socket.id)
      socket.emit("newUserResponse", users)
      socket.disconnect()
    });
});

app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});


http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);

    socket.listen(process.env.PORT || 3000);
});