import React from 'react'
import { useState } from 'react'
import API_URL from '../config/api'
import { useEffect } from 'react'

const EditProfile = () => {

    const [image, setImage] = useState(null)
    const [uploadedImage, setUploadedImage] = useState(null)
    const [uploadError, setUploadError] = useState('')

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
            setImage(null)
            setUploadError('')
        } catch (error) {
            setUploadError(error.message || 'Image upload failed')
        }
    }
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

            setUploadedImage((images) => [data.image, ...(images || [])])
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

        <div>
            <button className='bg-red-600 p-2 rounded-lg' onClick={getProfile}>Get profile</button>
        </div>

        {image && <button className='bg-red-600 p-2 rounded-lg' onClick={uploadProfile}>Upload image</button>}
        {uploadError && <p role="alert">{uploadError}</p>}

        {uploadedImage && (
            uploadedImage.map(img => (
                <div key={img._id}>
                    <img src={img.imageUrl} alt="profile" />
                </div>
            ))
        )}
    </div>
  )
}

export default EditProfile