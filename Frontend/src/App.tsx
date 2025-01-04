import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Join } from './Join'
import { Chat } from './Chat'

function App() {
  return (
   
     <BrowserRouter>
     <Routes>
       <Route path='/join' element={<Join/>}/>
       <Route path='/chat' element={<Chat/>}/>
     </Routes>
     </BrowserRouter>
  )
}

export default App
