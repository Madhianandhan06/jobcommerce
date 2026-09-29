import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import API_URL from '../config/api'

const RootLayout = () => {
  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {
    async function getProfileImage() {
      try {
        const response = await fetch(`${API_URL}/api/auth/images`, {
          credentials: 'include',
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch profile image')
        }

        setProfileImage(data.images?.[0] || null)
      } catch (error) {
        console.error(error.message)
      }
    }

    getProfileImage()
  }, [])

  return (
    <div>
        <Navbar profileImage={profileImage} onProfileImageError={() => setProfileImage(null)} />
        <div className='flex justify-center h-screen bg-slate-100 pt-4'>
            <Outlet context={{ setProfileImage }} />
        </div>
    </div>
  )
}

export default RootLayout