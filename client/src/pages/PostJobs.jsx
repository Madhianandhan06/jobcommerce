import React, { useEffect, useState } from 'react'
import api from '../../api/axios'

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
          const response = await api.get('/api/auth/my-jobs')
          setMyJobs(response.data.jobs || [])
        } catch (error) {
          setMyJobs([])
        }
    }

    fetchMyJobs()
  }, [])

  async function createJobPost(){
    try {
      const response = await api.post('/api/auth/post-jobs', {
        description,
        location,
      })

      setToast(response.data.message)
      setRequirements('')
      setLocation('anna nagar, wall street, chennai')

      const myJobsResponse = await api.get('/api/auth/my-jobs')
      setMyJobs(myJobsResponse.data.jobs || [])
  
    } catch (error) {
      setToast(error.response?.data?.message || error.message)
    }
  }
  return (
    <div className='mx-auto flex w-full max-w-6xl flex-col items-center px-4'>
      {toast && <span>{toast}</span>}
      <button onClick={() => setOpen(p => !p)} className='bg-green-600 p-2 rounded-lg'>
        +Create Job</button>

        {open && (
          <div className='mt-4 flex w-full max-w-2xl flex-col space-y-2 rounded-lg border-2 border-900-blue p-4'>
            <div  className='flex flex-col'>
              <label htmlFor="">Job description*</label>
              <input className='p-1.5 rounded-lg' type="text" value={description} onChange={(e) => setRequirements(e.target.value)} />
            </div>

            <div  className='flex flex-col'>
              <label htmlFor="">location*</label>
              <input className='p-1.5 rounded-lg' type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            <div className='flex gap-2 my-2'>
              <button onClick={() => setOpen(false)} className='bg-orange-400 rounded-lg flex-1'>Cancel</button>
              <button onClick={createJobPost} className='bg-blue-400 rounded-lg flex-1'>Post</button>
            </div>
          </div>
        )}

        <div className='mt-6 w-full'>
          <h3 className='mb-4 font-bold'>Your jobs</h3>
          {!myJobs || myJobs.length === 0 ? (
            <p>No jobs posted yet.</p>
          ) : (
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {myJobs.map((job) => (
              <div key={job._id} className='min-h-28 rounded-lg bg-orange-600 p-4'>
                <h2>{job.description}</h2>
                <p className='text-xs'>{job.location}</p>
              </div>
              ))}
            </div>
          )}
        </div>
    </div>
  )
}

export default PostJobs