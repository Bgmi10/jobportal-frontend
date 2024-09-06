import { CheckCircle, Download, MapPin } from 'lucide-react';
import { baseurl } from '../utils/constants';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BusinessCenter, CorporateFare, DomainDisabled, LockClock } from '@mui/icons-material';

const Joblistrecruiterdetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [hiringstatus, setHiringstatus] = useState('');
  const apikey = import.meta.env.VITE_STRAPI_API_KEY;
  const [status , setStatus] = useState('')
  const [applicantdata,setApplicantdata] = useState(null)
  
   useEffect(() => {
    const fetch_jobs_application = async () => {
      
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

    fetch_jobs_application();
  }, [id]);

  useEffect(() => {
     const title = data?.data?.attributes?.title
    const jobs_applicant = async () => {
      
      try {
        const res = await fetch(`${baseurl}/api/jobapplications?filters[jobtitle][$eq]=${title}`, {
          headers: {
            Authorization: `Bearer ${apikey}`,
          },
        });

      const json = await res.json();
        setApplicantdata(json);
      } catch (err) { 
        console.log(err);
      }
    };

    jobs_applicant();
  }, [data]);

  const handlehiring = async (e) => {
    const newHiringStatus = e.target.value === 'true'; 
    setHiringstatus(e.target.value);

    try {
      const res = await fetch(`${baseurl}/api/postjobs/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${apikey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            jobopen: newHiringStatus,
          },
        }),
      });

      if (res.ok) {
        
        setData((prev) => ({
          ...prev,
          data: {
            ...prev.data,
            attributes: {
              ...prev.data.attributes,
              jobopen: newHiringStatus,
            },
          },
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlechangestatus = async (e, jobId) => {
    const newStatus = e.target.value;
  
    // Update the status in the local state first
    setApplicantdata((prevApplicantData) => {
      return {
        ...prevApplicantData,
        data: prevApplicantData.data.map((job) =>
          job.id === jobId
            ? { ...job, attributes: { ...job.attributes, status: newStatus } }
            : job
        ),
      };
    });
  
    // Then update the status on the server
    try {
      const res = await fetch(baseurl + `/api/jobapplications/${jobId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${apikey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            status: newStatus,
          },
        }),
      });
      if(res.ok){
         alert('application status changed')
      }
  
      if (!res.ok) {
        throw new Error('Failed to update status on server');
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const handledownloadresume  = (job) => {
  const url  = job?.attributes?.resume
  const finalurl = baseurl + url
  window.location.href = finalurl

  }
  

  return (
    <div>
      <div className='flex justify-between m-10'>
        <div className='text-4xl gradient-title text-slate-700 font-extrabold'>
          <span>{data?.data?.attributes?.title}</span>
        </div>
        <div>
          <img src={data?.data?.attributes?.img} className='w-16' />
        </div>
      </div>
      <div className='flex m-10 justify-between'>
        <span className='flex font-sans text-md'>
          <MapPin /> {data?.data?.attributes?.state}
        </span>
        <span className='text-md'>
          <BusinessCenter />{applicantdata?.data?.length} applicants
        </span>
        <span>
          {data?.data?.attributes?.jobopen ? (
            <>
              <CorporateFare /> <span>open</span>
            </>
          ) : (
            <>
              <DomainDisabled /> <span>close</span>
            </>
          )}
        </span>
      </div>
      <div className='m-10 '>
        <select
          className='p-2 border-2 rounded-md font-bold text-slate-600 outline-none cursor-pointer'
          value={hiringstatus}
          onChange={handlehiring}
        >
          <option disabled value={''}>
            hiring status
          </option>
          <option value={'true'}>Open</option>
          <option value={'false'}>Close</option>
        </select>
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
      <div className='m-10 justify-center flex'>
        <span className='text-3xl font-extrabold text-slate-600'>Applications</span>
      </div>
      <div className='justify-center flex'>
      {applicantdata?.data.length === 0 ? <span className='text-md font-light mb-10 text-red-600'>no applicants found</span> : applicantdata?.data?.map((job) => (
                    <div key={job.id} className="border w-full m-10  p-4 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl bg-gray-50">
                        <div className="flex flex-col justify-start">
                            <span className="text-3xl font-semibold text-gray-800 mb-4 truncate">{job?.attributes?.username || job?.attributes?.jobtitle}</span>
                            <img src={job.attributes.img} alt={job.attributes.companyname} className="w-20 mb-4 border-gray-200" />
                        </div>
                        <div className="flex justify-end items-center text-gray-600">
                            <span className="mt-[-130px] cursor-pointer">
                                <Download onClick={() => handledownloadresume(job)} />
                            </span>
                        </div>
                        <div className="flex justify-end items-center text-gray-600 -mt-10">
                            <span>{job.attributes.companyname}</span>
                        </div>
                        <div className="text-gray-700 mb-4 mt-6 h-16 overflow-hidden">
                            <p className="text-ellipsis">{job.attributes.desc}</p>
                        </div>
                        <div className="text-gray-700 mb-4 overflow-hidden">
                            <p className="text-ellipsis text-slate-700 text-sm">
                                <BusinessCenter className="mt-[-6px] mr-1" fontSize="small" />
                                {job.attributes.yoe} Years of Experience
                            </p>
                        </div>
                        <div className="text-gray-700 mb-4 overflow-hidden">
                            <p className="text-ellipsis text-slate-700 text-sm">
                                <LockClock className="mt-[-6px] mr-1 text-sm" fontSize="small" />
                                {new Date(job.attributes.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="text-gray-700 flex flex-wrap items-center mt-4">
                            <span className="text-xs font-semibold mr-2">Skills:</span>
                            <div className="flex flex-wrap gap-2">
                                {job.attributes.skills.map((skill, index) => (
                                    <div key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-xs font-medium text-gray-800">
                                        <CheckCircle className="mr-1" fontSize="small" />
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='justify-end flex'>
                            <span className=' font-medium text-sm  mt-5'>Status : </span> 
                            <select onChange={(e)=> handlechangestatus(e, job.id)}  className='cursor-pointer p-2 m-2 outline-none  border-2 rounded-md ' value={status}>

                              <option disabled value={''}>{job?.attributes?.status}</option>
                              <option  value={'Interviewing'}>Interviewing</option>
                              <option value={'Applied'}>Applied</option>
                              <option value={'Rejected'}>Rejected</option>
                              <option value={'Shortlisted'}>Shortlisted</option>
                            </select>
                        </div>
                    </div>
                ))}
      </div> 
    </div>
  );
};

export default Joblistrecruiterdetail;
