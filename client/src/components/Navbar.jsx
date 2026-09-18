import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex justify-between gap-4 p-4'>
      <div>logo</div>
        <ul className='flex gap-4'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/contact'>Contact</NavLink>
            <NavLink to='/post-jobs'>Post Jobs</NavLink>
            <NavLink to='/search-jobs'>Search Jobs</NavLink>
            <NavLink to='/earnings'>Earnings</NavLink>
        </ul>
    </div>
  )
}

export default Navbar