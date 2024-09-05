import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

 const Onboard = () => {
     const navigate = useNavigate()
    const {user} = useUser()
     const handlecheckuserpref = async (role) => {
      const res =  await user.update({
          unsafeMetadata : {role}
       })

       try{
         navigate(res?.unsafeMetadata?.role === 'candidate' ? '/jobs' : '/postjob')

       }
       catch(err){
          console.log(err)
       }
     } 

     useEffect(() => {
          if( user?.unsafeMetadata?.role ){

          navigate(user?.unsafeMetadata?.role  === 'candidate' ? '/jobs' : '/postjob')
     }
     },[user])
  return (
    <>
       <div>
            <div className='justify-center flex mt-32'>
                 <span className='font-semibold  text-5xl'>I`m a... </span>
            </div>
            <div className='justify-center flex mt-8 '>
                 <button  className='bg-blue-400 transition-transform hover:bg-blue-500 rounded-md p-5  w-60 text-lg text-white' onClick={() => handlecheckuserpref('candidate')}>
                         Candidate
                 </button>
                 <button  className='bg-amber-400  hover:bg-amber-500 rounded-md p-5 ml-3 w-60  text-lg' onClick={() => handlecheckuserpref('recruiter')}>
                         Recruiter
                 </button>
            </div>
       </div>
    </> 
  )
}


export default Onboard