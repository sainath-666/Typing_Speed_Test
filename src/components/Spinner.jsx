import React from 'react'

function Spinner() {
  return (
    <div className='flex justify-center items-center'>
        <div className='w-12 h-12 border-4 border-t-4 border-slate-600 border-t-cyan-400 rounded-full animate-spin' ></div>
        <p className='ml-4 text-slate-400'>Fetching new text...</p>
    </div>
  )
}

export default Spinner