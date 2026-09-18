import React, { useEffect, useState } from 'react'

const PostJobs = () => {

  const [open, setOpen] = useState(false)
  const [description, setRequirements] = useState('')
  const [location] = useState('anna nagar, wall street, chennai')

  const [toast, setToast] = useState(null)

  useEffect(() => {
    if(!toast) return

    const timer = setTimeout(() => {
      setToast(null)
    }, 3000);

    return () => clearTimeout(timer)
  }, [toast])
  // console.log(typeof(location));
  
  function getLocation (){
      if(!navigator.geolocation){
        alert('Geolocation is not supported')
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords ={
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          setLocation(coords)
        },
        (error) => {
          alert('Location permission denied')
          console.log(error); 
        }
      );
  }

  async function createJobPost(){
    console.log(description);
    console.log(location);

    try {
      const res = await fetch(`http://localhost:3000/api/auth/post-jobs`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({description, location})
      })

      if(!res.ok){
        throw new Error(`Something went wrong`)
      }
      const data = await res.json()
      console.log(data.message);
      setToast(data.message)
  
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
              <input className='p-1.5 rounded-lg' type="text" />
            </div>

            <p>{location?.lat}</p>
            <p>{location?.lng}</p>


            <div className='flex '>
              <button onClick={getLocation} className='bg-green-600 flex-1 rounded-lg'>Current location</button>
            </div>

            <div className='flex gap-2 my-2'>
              <button className='bg-orange-400 rounded-lg flex-1'>Cancel</button>
              <button onClick={createJobPost} className='bg-blue-400 rounded-lg flex-1'>Post</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default PostJobs