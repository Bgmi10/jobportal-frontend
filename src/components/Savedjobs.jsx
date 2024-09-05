import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Jobcard } from './Jobcard'
import { removealljobs } from '../utils/Likedjobslice'

export const Savedjobs = () => {

    const likedjobs = useSelector(store => store.likedjobs)
    

    const dispatch = useDispatch()

    const handledeleteallsavedjobs  = () => {
        dispatch(removealljobs())
    }
  return (
    <>
       <div>

          {likedjobs.length > 0 &&  <div className='justify-center flex mt-10 '>
          <span className="text-4xl font-extrabold text-gray-800 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-800 to-black ">Saved Jobs</span>
               
            </div>}
            
            
            <div className='justify-center flex flex-wrap' >
                 {
                  likedjobs.length === 0 ?  <>
                   <div>
                  <img src="https://des.az.gov/sites/default/files/job-searching.png?time=1644301518" alt="" />
                  <div className='justify-center flex '>
                    <span onClick={() => window.location.href = '/jobs'} className='text-blue-400  cursor-pointer  underline'> no saved jobs, go and Find job</span></div>  </div></> :  

                    <Jobcard data={likedjobs}/>
                 }
                 
            </div>
            {
               likedjobs.length > 0 && <div>
                 <button className=' w-40 m-2 ml-2 font-normal justify-center flex text-white rounded-md p-2 bg-red-500' onClick={handledeleteallsavedjobs} >
                 delete all saved jobs
                </button>
                </div>
            }
       </div>
    </>
  )
}
