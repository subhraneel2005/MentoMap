'use client'

import React from 'react'

import {getSession, useSession, signIn, signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation';

function Nav() {
  
  const session = useSession();
  const user = session?.data?.user;
  const router = useRouter();

  const logOut = () => {
    signOut();
  }

  return (
    <div className='w-full px-7 py-3 bg-transparent flex justify-between top-0'>
        <h2 className='text-xl font-bold'>MentoMaps</h2>
        {user ? 
          <div className='flex gap-2'>
            <img src={user?.image || '/userLogo.jpg'} alt={user?.name} className='h-10 w-10 rounded-full shadow-xl'/>
            <p className='text-gray-600 text-[15px]'>{user?.name}</p>
          </div> 
        : 
          <button onClick={() => router.push('/api/auth/signin')} className='bg-gray-300 px-7 py-2 rounded-[24px] border-2 border-gray-700  text-black hover:bg-gray-400 duration-300'>Sign in</button>}

        {user && <button onClick={logOut} className='bg-red-300 px-7 py-2 rounded-[24px] border-2 border-red-700  text-black hover:bg-red-400 duration-300'>Sign out</button>}
    </div>
  )
}

export default Nav