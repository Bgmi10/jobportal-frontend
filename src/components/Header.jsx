import React, { useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { BusinessCenter, FormatLineSpacingRounded, Save } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { removealljobs } from '../utils/Likedjobslice';
import { Heart } from 'lucide-react';

export const Header = () => {
  const { user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(removealljobs());
    }
  }, [user, dispatch]);

  return (
    <div className='flex justify-between items-center p-4 '>
      {/* Logo and Title */}
      <div className='flex items-center'>
        <img 
          src='https://img.freepik.com/premium-vector/businessman-logo-with-bag-concept_11481-280.jpg?size=626&ext=jpg&ga=GA1.1.1168591914.1718009553&semt=ais_hybrid' 
          className='h-14 w-14 rounded-full object-cover ' 
          alt='Find Job Logo' 
        />
      <span className="ml-3 font-extrabold uppercase tracking-wide text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-black drop-shadow-lg">
  FindJob
</span>


      </div>

      {/* Right Section */}
      <div className='flex items-center justify-end flex-grow space-x-8'>
        {user?.unsafeMetadata?.role === 'recruiter' && (
          <span 
            className='cursor-pointer font-semibold text-gray-700 flex items-center transition-colors duration-300 hover:text-black'
            onClick={() => window.location.href = '/joblistrecriuter'}
          >
            <FormatLineSpacingRounded className='mr-2 mt-1 text-gray-500' />
            View Jobs
          </span>
        )}

        {user?.unsafeMetadata?.role === 'candidate' && (
          <>
            <span 
              className='cursor-pointer font-semibold text-gray-700 flex items-center transition-colors duration-300 hover:text-black'
              onClick={() => window.location.href = '/myjobs'}
            >
              <BusinessCenter className='mr-2 text-gray-500' />
              My Jobs
            </span>
            <span 
              className='relative cursor-pointer font-semibold text-gray-700 flex items-center transition-colors duration-300 hover:text-black'
              onClick={() => window.location.href = '/savedjobs'}
            >
              <div className='ml-1   text-white absolute text-xs rounded-full  px-2 py-1  top-[-10px] right-[-24px]'>
                <Heart  className='text-sm ' style={{fontSize : '2px'}} fill='red'/>
              
              </div>
              Saved Jobs
              
            </span>
          </>
        )}

        {/* User Authentication */}
        <div className='flex items-center'>
          <SignedOut>
            <button className='bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300'>
              <SignInButton />
            </button>
          </SignedOut>

          <SignedIn>
            <div className='py-2 px-4'>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
