import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { baseurl } from '../utils/constants';
import { CheckCircle, Download, Star } from 'lucide-react';
import { BusinessCenter, LockClock, Build } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addjobs } from '../utils/Myjobsslice';

const Myjobs = () => {
    const { user } = useUser();
    const apikey = import.meta.env.VITE_STRAPI_API_KEY;
    const [data, setData] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchMyJobs = async () => {
            try {
                if (user?.id) {
                    const res = await fetch(`${baseurl}/api/jobapplications?filters[userid][$eq]=${user.id}`, {
                        headers: {
                            Authorization: `Bearer ${apikey}`,
                        },
                    });

                    if (res.ok) {
                        const json = await res.json();
                        setData(json);
                        dispatch(addjobs(json.data))

                    }
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchMyJobs();
    }, []);

    const handledownloadresume = (job) => {
        const downloadUrl = baseurl + job.attributes.resume;
        window.location.href = downloadUrl;
    };

    return (
        <>
            <div className="flex justify-center mt-10">
                <span className="text-4xl font-extrabold text-gray-800 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-800 to-black">
                    Applied Jobs
                </span>
            </div>
            <div className="mt-7 flex flex-wrap justify-center rounded-lg">
                {data?.data?.length === 0 ? <span className='text-red-600 font-normal text-lg'>No jobs found</span> : data?.data?.map((job) => (
                    <div key={job.id} className="border w-full m-4 h-auto p-8 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl bg-gray-50">
                        <div className="flex flex-col justify-start">
                            <span className="text-3xl font-semibold text-gray-800 mb-4 truncate">{job.attributes.jobtitle}</span>
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
                        <div className='justify-end flex '>
                            <span className='mt-[-33px] font-medium text-sm '>Status : {job?.attributes?.status}</span> 
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Myjobs;
