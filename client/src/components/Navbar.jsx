import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex justify-between gap-4 p-4'>
      <div>logo</div>
        <ul className='flex gap-4'>
          {/* These pages are nested under /home, which is protected by ProtectedRoute. */}
          <NavLink to='/home'>Home</NavLink>
          <NavLink to='/home/contact'>Contact</NavLink>
          <NavLink to='/home/post-jobs'>Post Jobs</NavLink>
          <NavLink to='/home/search-jobs'>Search Jobs</NavLink>
          <NavLink to='/home/earnings'>Earnings</NavLink>
        </ul>
    </div>
  )
}

export default Navbar