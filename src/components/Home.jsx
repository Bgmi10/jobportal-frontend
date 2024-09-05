import React, { useEffect } from 'react'
import {  Slider_company_img } from './Slider_company_img'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {


  const {user} = useUser()
  
  const navigate = useNavigate()

  const handlefindjob = () => {
    window.location.href = 'https://superb-frog-63.accounts.dev/sign-up?redirect_url=http%3A%2F%2Flocalhost%3A5173%2F'

  }
  
  useEffect(() => {
     
      if(user?.unsafeMetadata?.role === 'candiate'){
        return navigate('/jobs')
      }
      
      if(user?.unsafeMetadata?.role === 'recruiter'){
       return navigate('/postjob')
      }
      if(user?.unsafeMetadata){
        return navigate('/onboarding')
      }
     
  },[user])
  return (
    <>
    <div className='mt-20 justify-center flex'> 
         <span className='sm: text-[32px] lg:text-5xl  text-slate-900 font-bold  tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-800 to-black'>
               Find Your Dream Job 
         </span>
       
    </div>
    <div className='m-10 justify-center flex'> 
         <span className='sm: text-xs lg:text-lg  text-gray-700 font-semibold'>
         "Unlock your potential with a career that inspires"
         </span>
           
    </div>
    <div className='justify-center flex mt-4  '>
      <button className='bg-blue-400 p-2 rounded-md  outline-none text-white font-serif lg:w-40 sm: w-24 hover:bg-blue-500' onClick={handlefindjob}>Find Job  </button>
      <button className='ml-2 bg-amber-400 outline-none hover:bg-amber-500 font-serif  p-2 rounded-md  lg:w-40 sm: w-24 hover:scale-1
      05 ' onClick={handlefindjob}>Post Job</button>
    </div>
     
     <div>
          <Slider_company_img />
     </div>
     <div className='flex flex-col md:flex-row mt-10 mx-10  p-6 '>
  {/* Image Section */}
  <div className='md:w-1/2 flex justify-start'>
    <img 
      src='https://img.freepik.com/premium-photo/woman-yellow-suit-is-holding-folder-with-word-la-it_1197721-88618.jpg?size=626&ext=jpg&ga=GA1.1.1168591914.1718009553&semt=ais_hybrid' 
      className='h-60 w-60 object-cover '
      alt='Job Seeker Image'
    />
  </div>

  {/* Content Section */}
  <div className='md:w-1/2 flex flex-col justify- space-y-6 p-2'>
    {/* For Job Seekers */}
    <div className='text-center md:text-left'>
      <h2 className='font-bold text-3xl text-gray-800'>For Job Seekers</h2>
      <p className='text-md text-gray-600 mt-2'>
        Search and apply for jobs, track your applications, and find your dream role effortlessly.
      </p>
    </div>

    {/* For Employers */}
    <div className='text-center md:text-left'>
      <h2 className='font-bold text-3xl text-gray-800'>For Employers</h2>
      <p className='text-md text-gray-600 mt-2'>
        Post job listings, manage applications, and discover the perfect candidate for your company.
      </p>
    </div>
  </div>
</div>

     
    </>

  )
}
 