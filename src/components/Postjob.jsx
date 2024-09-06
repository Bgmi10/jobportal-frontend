import React, { useEffect, useState } from 'react';
import { baseurl, stateAbbrivations } from '../utils/constants';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';

const Postjob = () => {
  const [district, setDistrict] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState(null);
  const [companyname, setCompanyname] = useState('');
  const { user } = useUser();
  const navigate = useNavigate();
  const [pointinput, setPointinput] = useState(false);
  const [pointtext, setPointtext] = useState('');
  const [requirementarr, setRequirementarr] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [jobtype , setJobtype] = useState('')
  const [jobtime , setJobtime] = useState('')

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
    if (!title || !desc || !img || !district || !companyname || !jobtime || !jobtype || requirementarr.length === 0 ) {
      window.alert('Please fill all the required fields');
      return;
    }

    const jobid = Math.floor(Math.random() * 10000);

    const data = {
      title,
      desc,
      name: companyname,
      state: district,
      img,
      recruiterid: user.id,
      jobid,
      jobtime,
      jobtype,
      jobrequirements : requirementarr
      
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
        navigate('/joblistrecriuter');
      } else {
        window.alert('Failed to post job');
      }
    } catch (err) {
      console.log('Error posting job:', err);
      window.alert('An error occurred while posting the job');
    }
  };

  const handleaddpoint = () => {
    setPointinput(true);
    setEditingIndex(null); // Reset editing mode
    setPointtext(''); // Clear input
  };

  const handlepointchange = (e) => {
    setPointtext(e.target.value);
  };

  const handlecompleteaddpoint = () => {
    if (pointtext === '') {
      alert('Text field cannot be empty');
      return;
    }

    if (editingIndex !== null) {
      // Editing an existing point
      const updatedRequirements = [...requirementarr];
      updatedRequirements[editingIndex] = pointtext;
      setRequirementarr(updatedRequirements);
    } else {
      // Adding a new point
      setRequirementarr((prev) => [...prev, pointtext]);
    }

    setPointinput(false);
    setPointtext('');
    setEditingIndex(null); // Reset editing mode
  };

  const handledeleterequirement = (itemid) => {
    const deleteditem = requirementarr.filter((_, index) => index !== itemid);
    setRequirementarr(deleteditem);
  };

  const handleeditrequirement = (index) => {
    setPointinput(true);
    setPointtext(requirementarr[index]); // Load the point into the input field
    setEditingIndex(index); // Set the current index being edited
  };
  
  const handlejobtypechange  = (e) => {
    const val = e.target.value
    setJobtype(val)

  }

  const handlejobtimechange  = (e) => {
     
    const val = e.target.value
    setJobtime(val)


  }

  return (
    <>
      <div className='flex justify-center mt-16'>
        <span className="text-4xl font-extrabold text-gray-800 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-800 to-black">
          Post Job
        </span>
      </div>
      <div className='flex flex-col mt-8 mx-4 md:mx-32 lg:mx-64 bg-white shadow-lg p-8 rounded-lg'>
        <input
          type='text'
          className='border m-3 rounded-md outline-none p-3 focus:ring-2 focus:ring-blue-400 transition-all duration-300'
          placeholder='Job Title*'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          className='m-3 rounded-md outline-none p-3 border h-40 resize-none focus:ring-2 focus:ring-blue-400 transition-all duration-300'
          placeholder='Job Description*'
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
            placeholder='Company Name*'
            onChange={(e) => setCompanyname(e.target.value)}
            value={companyname}
          />
        </div>
        <div className='m-3'>
          <label className='block text-gray-700 mb-2'>Company Logo*</label>
          <input
            type='file'
            className='block w-full text-sm cursor-pointer text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
            onChange={handlelogochange}
          />
        </div>
        <div className='m-3'>
          <div className='text-gray-700 mb-2'>
            <span>Job Requirement</span>
            <span className='text-sm font-normal m-3 text-gray-400'> * please note add the requirement points one by one</span>
          </div>
          <button className='p-2 border bg-blue-400 text-white rounded-md font-bold' onClick={handleaddpoint}>
            Add Point
          </button>
          <div>
            {requirementarr.map((i, index) => (
              <div key={index} className='flex m-1'>
                <li className='font-normal m-1 truncate'>
                  {i}
                </li>
                <button>
                  <Trash2 style={{ fontSize: '8px' }} color='red' onClick={() => handledeleterequirement(index)} />
                </button>
                <button className='ml-2'>
                  <Edit2 style={{ fontSize: '8px' }} color='black' onClick={() => handleeditrequirement(index)} />
                </button>
              </div>
            ))}
          </div>
          {pointinput && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPointinput(false)}
              />
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-50"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
                  <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                      {editingIndex !== null ? 'Edit your point!' : 'Write your point!'}
                    </h2>
                    <textarea
                      className='m-3 w-full outline-none rounded-md border h-20 resize-none p-3 focus:ring-2 focus:ring-blue-400 transition-all duration-300'
                      placeholder='e.g. We need a React Developer!'
                      value={pointtext}
                      onChange={handlepointchange}
                    />
                    <div>
                    <button
                      onClick={handlecompleteaddpoint}
                      className='bg-blue-500 text-white rounded-lg px-4 py-2 mt-2 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition-all duration-300'
                    >
                      {editingIndex !== null ? 'Edit' : 'Add'}
                    </button>
                    <button
                      onClick={()=> setPointinput(false)}
                      className='bg-red-500 ml-2 text-white rounded-lg px-4 py-2 mt-2 hover:bg-red-600 focus:ring-2 focus:ring-blue-300 transition-all duration-300'
                    >
                     close
                    </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
        <div className='m-3 flex'>
           <select className='outline-none border p-2 m-2 rounded-md bg-gray-200 cursor-pointer' value={jobtype} onChange={handlejobtypechange} >
             <option disabled value={''}>job type</option>
             <option value={'remote'}>Remote</option>
             <option value={'hybrid'}>Hybrid</option>
           </select>
           <select className='outline-none border p-2 m-2 rounded-md bg-gray-200 cursor-pointer' value={jobtime} onChange={handlejobtimechange}>
             <option disabled value={''}>Job-time</option>
             <option value={'parttime'}>part-time</option>
             <option value={'fulltime'}>full-time</option>
           </select>
        </div>
        <div className='w-full m-3'>
          <button
            className='rounded-md text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 w-full transition-all duration-300 font-bold'
            onClick={handleformsubmit}
          >
            Post job
          </button>
        </div>
      </div>
    </>
  );
};

export default Postjob;
