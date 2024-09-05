import { baseurl, companies, stateAbbrivations } from '../utils/constants'
import { useUser } from '@clerk/clerk-react'
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Jobcard } from './Jobcard'
import { Statedropdown } from './Statedropdown';

 const Jobs = () => {

       const navigate = useNavigate()
       const {user} = useUser()
       const [data , setData] = useState(null)
       const [userinput , setUserinput] = useState('')
       const [cacheresult , setcacheresult] = useState({})
       const [company , setCompany] = useState('')
       const [district , setDistrict] = useState('')
       const api_key = import.meta.env.VITE_STRAPI_API_KEY
       
       
  useEffect(() => {
    if(user?.unsafeMetadata?.role){
      navigate(user?.unsafeMetadata?.role === 'candidate' ? '/jobs' : '/postjob')
  }
  },[user])

  const fetch_search_jobs = async () => {

    
    try{
      const query = new URLSearchParams({
        'filters[title][$contains]': userinput  , // Filters jobs by title
      });

    const res = await fetch(baseurl+ `/api/postjobs?${query.toString()}` , {
      headers :{
        "Authorization" : `Bearer ${api_key}` 
      }
    })
    const json = await res.json()
    setData(json)
    setcacheresult({[userinput] : json})
  } 
  catch(err){
    console.log(err)
  }

  }

  useEffect(() => {
    const fetch_company = async () => {
      try{
        const query = new URLSearchParams({
          'filters[name][$contains]': company , // Filters jobs by title
        });
  
      const res = await fetch(baseurl+ `/api/postjobs?${query.toString()}` , {
        headers :{
          "Authorization" : `Bearer ${api_key}` 
        }
      })
      const json = await res.json()
      setData(json)

    } 
    catch(err){
      console.log(err)
    }

    
  }
  fetch_company()
   
  },[company])
  useEffect(() => {
    const fetch_company = async () => {
      try{
        const query = new URLSearchParams({
          'filters[state][$contains]': district , // Filters jobs by title
        });
  
      const res = await fetch(baseurl+ `/api/postjobs?${query.toString()}` , {
        headers :{
          "Authorization" : `Bearer ${api_key}` 
        }
      })
      const json = await res.json()
      setData(json)

    } 
    catch(err){
      console.log(err)
    }

    
  }
  fetch_company()
   
  },[district])

  useEffect(() => {
    
      const a = setTimeout(() => {
        fetch_search_jobs()       
      }, 200);
      return () => clearTimeout(a)
 
  },[userinput])

  
  var fetch_jobs = async () => {
    const res = await fetch(baseurl + '/api/postjobs' ,{
         headers : {
          "Authorization" : `Bearer ${api_key}` 
         }
    })
    const json = await res.json()
    
    setData(json)
  }

  useEffect(() => {
   fetch_jobs()
  },[])


  return (
    <div className='min-h-screen '>
    <div className="flex justify-center mt-10">
                <span className="text-4xl font-extrabold text-gray-800 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-800 to-black">
                    Jobs for you, {user?.username}
                </span>
            </div>
    <div className='mt-10 flex justify-center '>
         <input type='text' placeholder='search your dream job' className='w-1/2  p-2 border  outline-none  rounded-lg' onChange={(e) => setUserinput(e.target.value)}/>
         <Button variant="text" onClick={fetch_search_jobs}>Search Jobs</Button>
    </div>
    <div className='flex justify-center mt-5 space-x-4'>
         <Statedropdown district={district} setDistrict={setDistrict} title={'Filter job by location'}  stateAbbrivations={stateAbbrivations}/>
        <Statedropdown district={company} setDistrict={setCompany} title={'Filter job by company'}  stateAbbrivations={companies} />
      </div>
    
    <div>
      <Jobcard data={data?.data} />
    </div>
  </div>
  )
}


export default Jobs