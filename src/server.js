import express from 'express';
import http from 'http';
import {WebSocket} from "ws";


const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname+"/public"));
app.get("/", (req, res) => res.render("home"));
app.get("*", (req, res) => res.redirect("/"));

const handleListen = () => console.log('listening on http://localhost:3000');

const server = http.createServer(app);
const wss = new WebSocket.Server({server}); // ws와 http서버를 3000포트에 둘 다 생성

wss.on("connection", (socket) => { //익명함수 활용
    console.log("connected to Browser ✅");
    socket.on("close", () => console.log("DisConnected from the Browser ❌"));
    socket.on("message", (message) =>{
        console.log(message.toString('utf8'));
    })
    socket.send("hello!!!!");
})

server.listen(3000,handleListen);