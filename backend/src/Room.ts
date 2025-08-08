import { WebSocket } from "ws";
import { CHAT, JOIN_ROOM, LEAVE_ROOM, MESSAGE } from "./messages";
import { User } from "./type";

export class Room{
    private allSockets: WebSocket[]
    private allRooms: User[]

    constructor(){
        this.allSockets = []
        this.allRooms = []
    }

    addUser(socket: WebSocket){
        const existingSockets = this.allSockets.find(s => s === socket)

        if(!existingSockets){
            this.allSockets.push(socket)
            this.initHandlers(socket)
        }
    }

    removeUser(socket: WebSocket){
        const existingUser = this.allSockets.find(u => u === socket)

        if(existingUser){
            this.allSockets = this.allSockets.filter(u => u !== socket)
        }
    }

    initHandlers(socket: WebSocket){
        socket.on("message" , (data) =>{
            const message = JSON.parse(data.toString())

            if(message.type === JOIN_ROOM){
                const user = this.allSockets.find(u => u === socket)

                if(!user) return;

                this.allRooms.push({
                    socket,
                    username: message.payload.username,
                    roomId: message.payload.roomId
                })
            }


            if(message.type === CHAT){
                const user = this.allRooms.find(u => u.socket === socket);
                if(!user) return;

                const rooms = this.allRooms.filter(r => r.roomId === message.payload.roomId)

                rooms.forEach(r => r.socket.send(JSON.stringify({
                    type:MESSAGE,
                    from: user.username,    
                    message: message.payload.message
                })))
            }


            if(message.type === LEAVE_ROOM){
                this.allRooms = this.allRooms.filter(r => r.socket === socket)
                this.allSockets = this.allSockets.filter(u => u === socket) 
            }
        })
    }
} 