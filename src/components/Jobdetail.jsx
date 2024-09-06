import { Dot, Home, MapPin, Timer } from 'lucide-react';
import { baseurl } from '../utils/constants';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { BarLoader } from 'react-spinners';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { Applydrawer } from './Applydrawer';
import { useUser } from '@clerk/clerk-react';
import { Flight } from '@mui/icons-material';

const Jobdetail = () => {
  const { user } = useUser();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isopen, setIsopen] = useState(false);
  const [jobapplicationsdata, setJobapplicationsdata] = useState(false);
  const [applicationsubmitted, setApplicationsubmitted] = useState(false);
  console.log(data)

  const apikey = import.meta.env.VITE_STRAPI_API_KEY;

  const handleopendrawer = () => {
    setIsopen(true);
  }; 

  const jobtitle = data?.data?.attributes?.title;

  // Fetch job application data when job title or user changes
  useEffect(() => {
    const fetch_jobs_application = async () => {
      if (jobtitle && user) {  // Ensure user is defined
        try {
          const res = await fetch(`${baseurl}/api/jobapplications?filters[jobtitle][$eq]=${jobtitle}&filters[userid][$eq]=${user?.id}`, {
            headers: {
              Authorization: `Bearer ${apikey}`,
            },
          });

          const json = await res.json();
          console.log(json)

          if (json?.data?.length === 0) {
            setJobapplicationsdata(true);
          } else {
            setJobapplicationsdata(false);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetch_jobs_application();
  }, [jobtitle, applicationsubmitted, user]);

  
  useEffect(() => {
    const fetch_data = async () => {
      try {
        const res = await fetch(`${baseurl}/api/postjobs/${id}`, {
          headers: {
            Authorization: `Bearer ${apikey}`,
          },
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.log(err);
      }
    };
    fetch_data();
  }, [id]);

  if (!data) {
    return (
      <div>
        <BarLoader style={{ width: 'full' }} color='#87CEEB' />
      </div>
    );
  }

  return (
    <>
      <div className='flex justify-between m-10'>
        <div className='text-4xl gradient-title text-slate-700 font-extrabold'>
          <span>{data?.data?.attributes?.title}</span>
        </div>
  
        <div>
          <img src={data?.data?.attributes?.img} className='w-16' />
        </div>
      </div>
  
      {/* Align Job Type and Job Time */}
      <div className='flex  m-10  text-slate-500'>
        <span className='text-md font-normal '> {data?.data?.attributes?.jobtype}</span>
         {data?.data?.attributes?.jobtype === 'remote' ? <Home className='ml-1'/> : <Flight  className='m-1'/> }
       {data?.data?.attributes?.jobtime && <Dot className='mt-1'/>}
        <span className='text-md font-normal '>{data?.data?.attributes?.jobtime} </span>
       {data?.data?.attributes?.jobtime &&  <Timer className='ml-1'/>}
      </div>
  
      <div className='flex m-10 justify-between'>
        <span className='flex font-sans text-md'>
          <MapPin /> {data?.data?.attributes?.state}
        </span>
        <span className='text-md'>
          <BusinessCenterIcon /> {data?.data?.attributes?.applications} applicants
        </span>
        <span>
          {data?.data?.attributes?.jobopen ? (
            <>
              <CorporateFareIcon /> <span>open</span>
            </>
          ) : (
            <>
              <DomainDisabledIcon /> <span>close</span>
            </>
          )}
        </span>
      </div>
  
      <div className='m-10'>
        <span className='text-2xl font-extrabold text-slate-500'>About The Job</span>
        <p className='font-normal text-md mt-5'>{data?.data?.attributes?.desc}</p>
      </div>
  
      <div className='m-10'>
        <span className='text-lg font-extrabold text-slate-500'>What we are looking for?</span>
        {data?.data?.attributes?.jobrequirements?.map((i, index) => (
          <li className='mt-5 font-normal text-md' key={index}>
            {i}
          </li>
        ))}
      </div>
  
      <div className='flex justify-center'>
        <button
          className={!jobapplicationsdata ? 'bg-gray-500 text-white hover:bg-gray-600 rounded-md w-5/6 p-3 m-2' : 'bg-blue-500 text-white hover:bg-blue-600 rounded-md w-5/6 p-3 m-2'}
          disabled={!jobapplicationsdata}
          onClick={handleopendrawer}
        >
          {!jobapplicationsdata ? 'Applied' : 'Apply'}
        </button>
      </div>
  
      <div>
        <Applydrawer data={data} isopen={isopen} setIsopen={setIsopen} setApplicationsubmitted={setApplicationsubmitted} applicationsubmitted={applicationsubmitted} />
      </div>
    </>
  );
  
};

export default Jobdetail;
