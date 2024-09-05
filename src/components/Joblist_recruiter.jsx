import { baseurl } from '../utils/constants'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { MapPin, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const Joblist_recruiter = () => {
  const {user} = useUser()
  const apikey1 = import.meta.env.VITE_STRAPI_API_KEY;
  const [data , setData]= useState(null)
  const navigate = useNavigate()


  useEffect(() => {
   
    const Fetch_data = async () => {
      try{
        const res = await fetch(baseurl + `/api/postjobs?filters[recruiterid]=${user.id}` , {
          method : 'GET',
          headers : {
            "Authorization" : `Bearer ${apikey1}`
          }
        })
        if(res.ok){
          const json = await res.json()
          setData(json)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    Fetch_data()

  },[user?.id])


  // useEffect(() => {
  //   return user?.unsafeMetadata?.role === 'candidate' ?   navigate('/jobs') : navigate('/postjob')
  // }, [])
  const handledeletejob = (id) => {
       const d = async () => {
        try{
              const res = await fetch(baseurl  + `/api/postjobs/${id}`,{
                method : "DELETE",
                headers : {
                  "Authorization" : `Bearer ${apikey1}`
                }
              })

              if(res.ok){
                const dat = await res.json()
                
              }
        }
        catch(e){ 
          console.log(e)
        }
       }

       d()
     
  }

  const handleClick = (id) => {
    window.location.href = `/joblistrecruiterdetail/${id}`
  }
  return (
  <>
  {data?.data?.length > 0 && <div className="flex justify-center mt-10 ">
                <span className="text-4xl font-extrabold text-gray-800 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-800 to-black">
                   Your Jobs list 
                </span>
            </div>}
    <div className='justify-center flex'>
          {
            data?.data?.length === 0 ? 
            <>
            <div className='justify-center flex-col mt-48'>
            <span>Your job list was empty </span>
            <p className='text-blue-400 ml-5 mt-3 underline cursor-pointer' onClick={() => window.location.href = '/postjob'}>go to Post jobs</p>
            </div>
            </> : data?.data?.map((job) => (
              
              <div key={job.id} className='border w-96 m-4 mt-16  h-auto p-4 rounded-lg shadow-lg transition-shadow cursor-pointer duration-300 hover:shadow-2xl bg-gray-50'>
                 <div className='flex  justify-end'>
                 <span className='text-3xl font-semibold text-red-600  truncate absolute'><Trash  onClick={()=> handledeletejob(job.id)}  className='cursor-pointer'/></span>
               
              </div>
              <div className='flex flex-col justify-start'>
                <span className='text-3xl font-semibold text-gray-800 mb-4 truncate'>{job.attributes.title}</span>
                <img src={job.attributes.img} alt={job.attributes.name} className='w-20 mb-4 border-gray-200' />
              </div>
             
              
              <div className='flex justify-end items-center text-gray-600 -mt-10'>
                <MapPin className='mr-2' />
                <span>{job.attributes.state}</span>
              </div>
              <div className='text-gray-700 mb-4 mt-6 h-16 overflow-hidden'>
                <p className='text-ellipsis'>{job.attributes.desc}</p>
              </div>
              <div className='flex items-center'>
                <button className='p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 w-80' onClick={() => handleClick(job.id)}>
                  Show more
                </button>
              </div>
            </div>
            ))
          }
    </div>
    </>
  )
}
 