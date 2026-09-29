import React from 'react'
import { useState } from 'react'
import API_URL from '../config/api'
import { useOutletContext } from 'react-router-dom'

const EditProfile = () => {
    const { setProfileImage } = useOutletContext()

    const [image, setImage] = useState(null)
    const [uploadError, setUploadError] = useState('')

    async function uploadProfile() {
        if (!image) return

        const formData = new FormData()
        formData.append('image', image)

        try {
            const response = await fetch(`${API_URL}/api/auth/upload`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Image upload failed')
            }

            setProfileImage(data.image)
            setImage(null)
            setUploadError('')
        } catch (error) {
            setUploadError(error.message || 'Image upload failed')
        }
    }
  return (
    <div>
        <h2>Edit Profile</h2>

        <div>
            <input 
                type="file" 
                accept='image/*' 
                onChange={(e) => {
                    setImage(e.target.files[0])
                    setUploadError('')
                }}
            />
        </div>

        {image && <button className='bg-red-600 p-2 rounded-lg' onClick={uploadProfile}>Upload Profile</button>}
        {uploadError && <p role="alert">{uploadError}</p>}
    </div>
  )
}

export default EditProfile