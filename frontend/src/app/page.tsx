'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/socket-provider";
import { JOIN_ROOM } from "@/messages/message";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const socket = useSocket()
  const router = useRouter();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomId.trim() || !username.trim() || !socket) return;

    if(socket.readyState === WebSocket.OPEN){
      socket.send(JSON.stringify({
        type: JOIN_ROOM,
        payload:{
          username,
          roomId
        }
    }))

    localStorage.setItem('username', username)
    }else{
      console.log("ws is not connected")
    }

    router.push(`/room/${roomId.trim()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-300 to-orange-400 px-4 text-black">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Join a Room</h1>
        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="John Doe"
              required
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="cool-chat-room"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold py-3 rounded-lg"
          >
            Create Room
          </button>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold py-3 rounded-lg"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}
