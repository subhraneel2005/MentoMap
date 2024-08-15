'use client'
 
import { useRouter } from 'next/navigation'




function LandingPage() {

  const router = useRouter();

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
        <div className='-mt-28 text-center'>
          <h1 className='text-4xl md:text-[4vw] font-extrabold'>Master <span className='text-green-600'>Skills</span></h1>
          <h1 className='text-4xl md:text-[4vw] font-extrabold mt-7'>Map Your Journey</h1>
          <p className='text-[17px] text-gray-700 mt-10'>Explore Roadmaps of your favorite skill.</p>
          <p className='text-[17px] text-gray-700'>Build projects and earn badges while you learn.</p>
          <p className='text-[17px] text-gray-700'>Showcase your work to recruiters and Stand out from everyone!</p>
        </div>

        <div className='flex gap-6'>
          <button onClick={() => router.push('/student/roadmap')} className='px-4 py-2 rounded-[24px] mt-16 text-white bg-green-700 border-2 border-green-950 hover:bg-green-800 duration-300  text-[16px]'>Im a student</button>
          
          <button className='px-4 py-2   text-[16px] rounded-[24px] mt-16 text-black bg-sky-300 border-2 border-sky-900 hover:bg-sky-400 duration-300'>Im a Mentor</button>
        </div>
    </div>
  )
}

export default LandingPage