import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex justify-center h-screen bg-slate-100 pt-4'>
            <Outlet/>
        </div>
    </div>
  )
}

export default RootLayout