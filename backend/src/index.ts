import { WebSocket, WebSocketServer } from "ws";
import { Room } from "./Room";
import { User } from "./type";

const wss = new WebSocketServer({port:8080});
const RoomManager = new Room


wss.on("connection", (socket)=>{
    RoomManager.addUser(socket)

    socket.on("close", ()=>{
        RoomManager.removeUser(socket)
    })
})
