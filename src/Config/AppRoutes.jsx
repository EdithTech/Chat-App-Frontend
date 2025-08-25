import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from '../App'
import JoinRoom from '../pages/room/JoinRoom'
import CreateRoom from '../pages/room/CreateRoom'

const AppRoutes = () => {
  return (
   <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='room'>
                <Route path='join' element={<JoinRoom />} />
                <Route path='create' element={<CreateRoom />} />
            </Route>
        </Routes>
   </BrowserRouter>
  )
}

export default AppRoutes
