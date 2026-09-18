import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const SearchJobs = () => {

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    async function searchJobs(params) {
      const res = await fetch(`http://localhost:3000/api/auth/search-jobs`,{
        method: 'GET'
      })

      const data = await res.json()
      // console.log(data);
      setJobs(data.jobs)
      console.log(data);
    }
    searchJobs()
  },[])

  return (
    <div>
      {jobs.map((job) => (
        <div key={job._id} className='bg-orange-600 my-2 p-2 rounded-lg'>
          <h2>{job.description}</h2>
          <p className='text-xs'>{job.location}</p>
        </div>
      ))}
    </div>
  )
}

export default SearchJobs