"use client"
import { createContext, useContext, useEffect, useState } from "react";

export const SocketContext = createContext<WebSocket | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        setSocket(ws)

        return () => {
            ws.close();
        };
    }, [])

    return <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
}

export const useSocket = () =>{
    const context = useContext(SocketContext);
    return context
}