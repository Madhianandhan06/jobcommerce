import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import api from '../../api/axios'


function SearchBar({ value, onChange }){
  return(
    <div className='flex gap-2 p-2 justify-center items-center'>
      <label htmlFor="">Search your Jobs</label>
      <input className='px-2 py-1.5  shadow-lg rounded-lg ' type="text" placeholder='search by job...' value={value} onChange={onChange}/>
    </div>
  )
}

function JobPosterAvatar({ imageUrl }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (!imageUrl || imageFailed) {
    return (
      <div className='h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold border border-gray-200 shadow-sm'>
        U
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt="Job poster profile"
      className='h-10 w-10 rounded-full object-cover border border-gray-200'
      onError={() => setImageFailed(true)}
    />
  )
}

function FilteredJobs({ filteredJobs, formatRelativeTime }){
  return(
    <div>
          {filteredJobs.map(job => (
            <div key={job._id} className='bg-red-600 text-white my-2 p-2 rounded-lg'>
              <div className='flex items-center gap-3'>
                <JobPosterAvatar imageUrl={job.profileImageUrl} />
                <div>
                  <h2>{job.description}</h2>
                  <p className='text-xs'>{job.location}</p>
                  <p>{formatRelativeTime(job.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
    </div>
  )
}


const SearchJobs = () => {

  const [jobs, setJobs] = useState([])
  console.log(jobs);
  
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')


  useEffect(() => {
    async function searchJobs() {
      try {
        const res = await api.get(`/api/auth/search-jobs`)
        setJobs(res.data.jobs || [])
        console.log(jobs);
        
      } catch (error) {
        setJobs([])
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

const filteredJobs = jobs.filter(job => (
  job.description.toLowerCase().includes(search.toLowerCase())
))

  return (
    <div>
          <div>
            {!jobs || jobs.length === 0 ? (<p>No jobs has been listed</p>) 
              : <div>
                <SearchBar value={search} onChange={(e) => setSearch(e.target.value)}/>
                <FilteredJobs filteredJobs={filteredJobs} formatRelativeTime={formatRelativeTime}/>
              </div>
            }
        </div>
    </div>
  )
}

export default SearchJobs