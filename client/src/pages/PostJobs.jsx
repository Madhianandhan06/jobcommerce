import React, { useEffect, useState } from 'react'
import API_URL from '../config/api'

const PostJobs = () => {

  const [open, setOpen] = useState(false)
  const [description, setRequirements] = useState('')
  const [location, setLocation] = useState('anna nagar, wall street, chennai')
  const [myJobs, setMyJobs] = useState([])

  const [toast, setToast] = useState(null)

  useEffect(() => {
    if(!toast) return

    const timer = setTimeout(() => {
      setToast(null)
    }, 3000);

    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    async function fetchMyJobs() {
      try {
        const res = await fetch(`${API_URL}/api/auth/my-jobs`, {
          method: 'GET',
          credentials: 'include'
        })

        const data = await res.json()
        if (res.ok) {
          setMyJobs(data.jobs || [])
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchMyJobs()
  }, [])

  async function createJobPost(){
    try {
      const res = await fetch(`${API_URL}/api/auth/post-jobs`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({ description, location })
      })

      const data = await res.json()

      if(!res.ok){
        throw new Error(data.message || 'Something went wrong')
      }

      setToast(data.message)
      setRequirements('')
      setLocation('anna nagar, wall street, chennai')

      const myJobsResponse = await fetch(`${API_URL}/api/auth/my-jobs`, {
        method: 'GET',
        credentials: 'include'
      })

      const myJobsData = await myJobsResponse.json()
      if (myJobsResponse.ok) {
        setMyJobs(myJobsData.jobs || [])
      }
  
    } catch (error) {
      setToast(error.message)
    }
  }
  return (
    <div className='flex flex-col items-center '>
      {toast && <span>{toast}</span>}
      <button onClick={() => setOpen(p => !p)} className='bg-green-600 p-2 rounded-lg'>
        +Create Job</button>

        {open && (
          <div className='flex flex-col w-full m-4 p-4 rounded-lg border-2 border-900-blue space-y-2'>
            <div  className='flex flex-col'>
              <label htmlFor="">Job description*</label>
              <input className='p-1.5 rounded-lg' type="text" value={description} onChange={(e) => setRequirements(e.target.value)} />
            </div>

            <div  className='flex flex-col'>
              <label htmlFor="">location*</label>
              <input className='p-1.5 rounded-lg' type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            <div className='flex gap-2 my-2'>
              <button className='bg-orange-400 rounded-lg flex-1'>Cancel</button>
              <button onClick={createJobPost} className='bg-blue-400 rounded-lg flex-1'>Post</button>
            </div>
          </div>
        )}

        <div className='w-full mt-6'>
          <h3 className='font-bold mb-2'>Your jobs</h3>
          {!myJobs || myJobs.length === 0 ? (
            <p>No jobs posted yet.</p>
          ) : (
            myJobs.map((job) => (
              <div key={job._id} className='bg-orange-600 my-2 p-2 rounded-lg'>
                <h2>{job.description}</h2>
                <p className='text-xs'>{job.location}</p>
              </div>
            ))
          )}
        </div>
    </div>
  )
}

export default PostJobs