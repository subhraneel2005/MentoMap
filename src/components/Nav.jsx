import React from 'react'


function Nav() {
  return (
    <div className='w-full px-7 py-3 bg-transparent flex justify-between top-0'>
        <h2 className='text-xl font-bold'>MentoMaps</h2>
        <button className='bg-gray-300 px-7 py-2 rounded-[24px] border-2 border-gray-700  text-black hover:bg-gray-400 duration-300'>Sign in</button>
    </div>
  )
}

export default Nav