import React, { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import API_URL from '../config/api'

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)

  const [uploadedImage, setUploadedImage] = useState(null)
  console.log(uploadedImage);
  
    useEffect(() => {
        getProfile()
    }, [])

    async function getProfile() {
        try {
            const response = await fetch(`${API_URL}/api/auth/images`, {
                method: 'GET',
                credentials: 'include',
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch')
            }

            setUploadedImage(data.images)
        } catch (error) {
           console.log(error.message);
           
        }
    }

  // Close the modal if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='flex justify-between items-center gap-4 p-4 bg-white shadow-sm relative'>
      <div className='font-bold text-xl'>logo</div>
      
      <ul className='flex items-center gap-6'>
        <NavLink to='/home' className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}>Home</NavLink>
        <NavLink to='/home/contact' className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}>Contact</NavLink>
        <NavLink to='/home/post-jobs' className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}>Post Jobs</NavLink>
        <NavLink to='/home/search-jobs' className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}>Search Jobs</NavLink>
        
        {/* Profile Icon Container */}
        <li className='relative' ref={modalRef}>
          <button 
            onClick={() => setIsModalOpen(!isModalOpen)}
            className='flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full'
          >
            {uploadedImage?.[0]?.imageUrl ? (
              <img 
                src={uploadedImage[0].imageUrl}
                alt="profile" 
                className='h-10 w-10 rounded-full object-cover border border-gray-200' 
                onError={() => setUploadedImage([])}
              />
            ) : (
              /* Fallback default avatar placeholder */
              <div className='h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold border border-gray-200 shadow-sm'>
                U
              </div>
            )}
          </button>

          {/* Dropdown Modal Navigation */}
          {isModalOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200'>
              <div className='px-4 py-2 text-xs font-semibold text-gray-400 border-b border-gray-100 mb-1'>
                Manage Account
              </div>
              
              <NavLink 
                to='/home/earnings' 
                onClick={() => setIsModalOpen(false)}
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
              >
                Dashboard / Earnings
              </NavLink>
              
              <NavLink 
                to='/home/edit-profile' 
                onClick={() => setIsModalOpen(false)}
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
              >
                Edit Profile
              </NavLink>
            </div>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Navbar
