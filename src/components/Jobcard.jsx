import { addlikedjobs, removejob } from '../utils/Likedjobslice';
import { useUser } from '@clerk/clerk-react';
import { Heart, MapPin } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';

export const Jobcard = ({ data }) => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const likedjobs = useSelector(store => store.likedjobs);

  const handleClick = (id) => {
    window.location.href = `/jobs/${id}`;
  };

  const handleSaveJob = (job) => {
    const isJobLiked = likedjobs.some(item => item.id === job.id);

    if (isJobLiked) {
      dispatch(removejob(job));
    }
    else{
      dispatch(addlikedjobs(job));
    }
  };

  return (
    <div className='mt-7 flex flex-wrap justify-center rounded-lg '>
      {data?.data?.length === 0 || data?.length === 0  && <span className='text-red-600'>No jobs found</span>}
      {!data ? <BarLoader style={{ width: 'full' }} color='#87CEEB' /> :  data?.map((job) => (
        <div key={job.id} className='border w-96 m-4 h-auto p-4 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl bg-gray-50 transform hover:scale-105'>
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
            <div className='ml-3 cursor-pointer transition-transform duration-300 hover:scale-110'>
              <Heart
                fill={likedjobs.some(item => item.id === job.id) ? 'red' : 'none'}
                color='red'
                onClick={() => handleSaveJob(job)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
