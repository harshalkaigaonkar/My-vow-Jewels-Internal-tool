import React from 'react'


const NotFound = () => {
 document.title = "404 Not Found"
 return (
  <div className='flex flex-col items-center justify-center gap-6 w-sreen h-screen'>
   <h1 className='font-bold text-2xl'>404 Not Found</h1>
   <h2 className='font-semibold text-xl'>There isn't any page there..</h2>
   <button className='p-2 w-60 font-bold bg-dark_primary text-black rounded-xl' onClick={() => window.location = '/signin'}>Go to Sign in</button>
  </div>
 )
}

export default NotFound
