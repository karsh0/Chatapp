import { useRef, useState } from 'react';
import './App.css'
import { useSocket } from './hooks/useSocket'

export function Chat(){
    const socket = useSocket();
    const messageRef = useRef<HTMLInputElement | null>(null)
    const [messages, setMessages] = useState([])
  
    function sendMessage(ev:React.FormEvent){
      ev.preventDefault()
      const message = messageRef.current?.value;
      if(!socket){
        console.log('socket failed');
        return;
      }
  
      socket.send(
        JSON.stringify({
          type:"chat",
          payload:{
            message
          }
        })
      )
      socket.onmessage = (ev) =>{
        setMessages([...messages, ev.data])
      }
    }

    const username = localStorage.getItem('username');
  
    return  <div className='b'>
        <div>
            {messages.map((x)=>{
                return <div>{x} from {username}</div>
            })}
        </div>
        <div>
    <form onSubmit={sendMessage} className='flex gap-2'>
      <input className='px-5 py-3' type="text" placeholder='Enter message' ref={messageRef}/>
      <button type='submit'>SEND</button>
      </form>
    </div>
    </div>
}