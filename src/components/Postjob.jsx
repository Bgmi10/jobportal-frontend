import React, { useEffect, useState } from 'react';
import { baseurl, stateAbbrivations } from '../utils/constants';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Postjob = () => {
  const [district, setDistrict] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState(null);
  const [companyname, setCompanyname] = useState('');
  const { user } = useUser();
  const navigate = useNavigate();


  // Role-based access control
  useEffect(() => {
    if (user?.unsafeMetadata?.role === 'candidate') {
      navigate('/jobs');
    }
  }, [user, navigate]);

  const handlelogochange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const api_key = import.meta.env.VITE_STRAPI_API_KEY;

  const handleformsubmit = async () => {
    // Basic validation
    if (!title) {
      window.alert('Please provide a job title');
      return;
    }
    if (!desc) {
      window.alert('Please provide a job description');
      return;
    }
    if (!img) {
      window.alert('Please select a company logo');
      return;
    }
    if (!district) {
      window.alert('Please select a district');
      return;
    }
    if (!companyname) {
      window.alert('Please provide a company name');
      return;
    }
    const jobid = Math.floor(Math.random() * 10000);

    const data = {
      title : title,
      desc : desc,
      name: companyname,
      state: district,
      img : img,
      recruiterid: user.id,
      jobid : jobid
    };

    try {
      const res = await fetch(baseurl + `/api/postjobs`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${api_key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      if (res.ok) {
        setCompanyname('');
        setDesc('');
        setDistrict('');
        setImg(null);
        setTitle('');
        window.alert('Job posted successfully');
        navigate('/joblistrecriuter'); // Redirect to jobs page after successful submission
      } else {
        window.alert('Failed to post job');
      }
    } catch (err) {
      console.log('Error posting job:', err);
      window.alert('An error occurred while posting the job');
    }
  };

  return (
    <>
      <div className='flex justify-center mt-16'>
        <span className='text-5xl font-semibold text-gray-900'>Post a Job</span>
      </div>
      <div className='flex flex-col mt-8 mx-4 md:mx-32 lg:mx-64 bg-white shadow-lg p-8 rounded-lg'>
        <input
          type='text'
          className='border m-3 rounded-md outline-none p-3 focus:ring-2 focus:ring-blue-400 transition-all duration-300'
          placeholder='Job Title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          className='m-3 rounded-md outline-none p-3 border h-40 resize-none focus:ring-2 focus:ring-blue-400 transition-all duration-300'
          placeholder='Job Description'
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <div className='flex flex-col md:flex-row'>
          <select
            onChange={(e) => setDistrict(e.target.value)}
            className='md:w-1/2 w-full outline-none rounded-md border p-3 m-3 focus:ring-2 focus:ring-blue-400 transition-all duration-300'
            aria-label='select'
            value={district}
          >
            <option value='' disabled>Select a District</option>
            {stateAbbrivations.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <input
            type='text'
            className='md:w-1/2 w-full border p-3 m-3 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300'
            placeholder='Company Name'
            onChange={(e) => setCompanyname(e.target.value)}
            value={companyname}
          />
        </div>
        <div className='m-3'>
          <label className='block text-gray-700 mb-2'>Company Logo</label>
          <input
            type='file'
            className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
            onChange={handlelogochange}
          />
        </div>
        <div className='flex justify-center m-10'>
          <button
            className='bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-md w-1/2 p-3 text-white font-medium shadow-md'
            onClick={handleformsubmit}
          >
            Post Job
          </button>
        </div>
      </div>
    </>
  );
};

export default Postjob;
