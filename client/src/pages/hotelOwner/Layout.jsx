import React from 'react'
import Navber from '../../compontes/hotelOwner/Navber'
import Sidebar from '../../compontes/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col h-screen'>
        <Navber/>
        <div className="flex h-full">
            <Sidebar/>
            <div className="flex-1 p-4 pt-10 md:px-10 h-full">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Layout