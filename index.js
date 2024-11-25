const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket handling
io.on("connection", (socket) => {
    console.log("A new user has connected:", socket.id);

    // Handle incoming user messages
    socket.on("user-message", (message) => {
        console.log(`Message from ${socket.id}: ${message}`);
        io.emit("message", message); // Broadcast the message to all connected clients
    });
});

// Serve static files
app.use(express.static(path.resolve("./public")));

// Route for the homepage
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./public/index.html")); // Ensure correct path resolution
});

// Start the server
server.listen(9000, () => console.log(`Server started at PORT: 9000`));
