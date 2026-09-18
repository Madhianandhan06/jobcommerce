import React, { useState } from 'react'

const PostJobs = () => {

  const [open, setOpen] = useState(false)
  const [requirements, setRequirements] = useState('')
  return (
    <div className='bg'>
      <h5>PostJobs</h5>

      <button onClick={() => setOpen(p => !p)} className='bg-green-600 p-2 rounded-lg'>
        +Create Job</button>

        {open && (
          <div>
            <div>
              <label htmlFor="">Job description</label>
              <input type="text" value={requirements} onChange={(e) => setRequirements(e.target.value)} />
            </div>
          </div>
        )}
    </div>
  )
}

export default PostJobs