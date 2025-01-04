import { useRef } from 'react';
import './App.css'
import { useSocket } from './hooks/useSocket'
import { useNavigate } from 'react-router-dom';

export function Join(){
    const navigate = useNavigate()
    const socket = useSocket();
    const usernameRef = useRef<HTMLInputElement | null>(null)
    const roomRef = useRef<HTMLInputElement | null>(null)
  
    function sendMessage(ev:React.FormEvent){
      ev.preventDefault()
      const username = usernameRef.current?.value;
      const roomId = roomRef.current?.value;
      if(!socket){
        console.log('socket failed');
        return;
      }
  
      socket.send(
        JSON.stringify({
          type:"join",
          payload:{
            username,
            roomId
          }
        })
      )
      if(!username){
        alert('Enter username')
      }else{
        localStorage.setItem('username', username)
      }

      navigate('/chat')
    }
  
    return  <>
    <form onSubmit={sendMessage} className='flex gap-2'>
      <input type="text" placeholder='Enter username' ref={usernameRef}/>
      <input type="text" placeholder='Enter roomId' ref={roomRef}/>
      <button type='submit'>JOIN</button>
      </form>
    </>
}