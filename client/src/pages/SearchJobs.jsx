import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const SearchJobs = () => {

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function searchJobs() {
      try {
        const res = await fetch(`http://localhost:3000/api/auth/search-jobs`, {
          method: 'GET',
          credentials: 'include'
        })

        const data = await res.json()
        setJobs(data.jobs || [])
        setLoading(false)
        } catch (error) {
          setLoading(false)
        } finally{
          setLoading(false)
        }
    }
    searchJobs()
  },[])

  if(loading){
    return <p>Loading Jobs</p>
  }
const formatRelativeTime = (dateString) => {
  const createdDate = new Date(dateString);
  const now = new Date();
  
  // Calculate difference in milliseconds
  const diffMs = now - createdDate;
  
  // Convert milliseconds to minutes, hours, and days
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  // 1. Under 1 hour -> Show minutes
  if (diffMinutes < 60) {
    if (diffMinutes <= 0) return "Just now";
    return rtf.format(-diffMinutes, 'minute');
  } 
  // 2. Under 24 hours -> Show hours
  else if (diffHours < 24) {
    return rtf.format(-diffHours, 'hour');
  } 
  // 3. Over 24 hours -> Show days
  else {
    return rtf.format(-diffDays, 'day');
  }
};



  return (
    <div>
      {!jobs || jobs.length === 0 ? (<p>No jobs has been listed</p>) 
        : (jobs.map((job) => (
          <div key={job._id} className='bg-orange-600 my-2 p-2 rounded-lg'>
            <h2>{job.description}</h2>
            <p className='text-xs'>{job.location}</p>
            <p>{formatRelativeTime(job.createdAt)}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default SearchJobs