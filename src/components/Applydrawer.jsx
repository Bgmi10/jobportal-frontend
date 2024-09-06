import { Close } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { baseurl } from '../utils/constants';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import checkimg from '../imgs/check.png'

export const Applydrawer = ({ isopen, data, setIsopen  , applicationsubmitted ,setApplicationsubmitted }) => {
    const [skills, setSkills] = useState('');
    const [result, setResult] = useState(null);
    const [skilllevel, setSkilllevel] = useState('');
    const [userskillpref, setUserskillpref] = useState([]);
    const [resumefile , setResumefile] = useState(null)
    const [experience , setExperience] = useState(0)

    const apikey = import.meta.env.VITE_STRAPI_API_KEY

    const {user} = useUser()


    const uploadResume = async (file) => {
        const formData = new FormData();
        formData.append('files', file);

        if(!file){
           return;
        }
    
        try {
            const response = await fetch( baseurl + '/api/upload/', { // Replace with your Strapi URL
                method : "POST",
                body : formData,
                headers : {
                    'Authorization': `Bearer ${apikey}`
                }
            });
    
            const data = await response.json();
           return data?.[0].url; 
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };
    
   
    const fetch_skills = async () => {
        const apikey = import.meta.env.VITE_L_API_KEY
        const res = await fetch(`https://api.apilayer.com/skills?q=${skills}`, {

            method: "GET",
            headers: {
                "apikey": apikey,
            }
        });

        const json = await res.json();
        setResult(json);
    };

    useEffect(() => {
        const a = setTimeout(() => {
            if (skills) {
                fetch_skills();
            }
            
        }, 200);

        return () => clearTimeout(a);
    }, [skills]);

    const handleskillclick = (skill) => {
        setUserskillpref(prev => [...prev, skill]);
        setSkills('')
    };

    const handledeleteskill = (id) => {
        const updatedskill = userskillpref.filter((i, index) => index !== id);
        setUserskillpref(updatedskill);
    };

    const lev = ['Intermediate', 'Beginner','Advance'];

    

    const handleresume = (e) => {
        const a = e.target.files?.[0];
        setResumefile(a)
        
    };
    const handleform = async () => {
       

        if(experience === 0){
            window.alert('experience cannot be empty')
            return;
        }
        
        if(userskillpref.length === 0){
            window.alert('you need to add atleast one skill')
            return;
        }

        if(skilllevel === ''){
            window.alert('select the skill level')
            return;
            
        }

        if(!resumefile){
            window.alert('Upload your resume')
            return;

        }
        const resumeurl = await uploadResume(resumefile);
    
        const formData = {
            userid  : user?.id,
            jobtitle: data?.data?.attributes?.title,
            companyname: data?.data?.attributes?.name,
            yoe: parseInt(experience),
            skills: userskillpref,
            skilllevel: skilllevel,
            resume: resumeurl,
            img : data?.data?.attributes?.img,
            desc : data?.data?.attributes?.desc,
            username : user?.username || user?.fullName || user?.lastName || user?.phoneNumbers?.[0]?.phoneNumber,
            hasverifiedphonenumber : user?.hasVerifiedPhoneNumber   
        };
    
        try {
            const response = await fetch(baseurl + '/api/jobapplications', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apikey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data : formData}),
            });
    
            if (response.ok) {
                console.log('Application submitted successfully');
                setIsopen(false)
                setApplicationsubmitted(true)
                
             
            } else {
                const errorResponse = await response.json();
                console.log('Failed to submit application:', errorResponse.message);
                window.alert(errorResponse.message)
            }
        } catch (error) {
            console.error('Error submitting application:', error);
        }


    };

   
    return (
        <AnimatePresence>
            {isopen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={()=> setIsopen(false)}
                    />

                    <motion.div
                        className="fixed bottom-0 left-0 right-0 bg-white shadow-xl p-5 overflow-y-auto z-50 rounded-t-lg"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <div className="flex justify-between items-center mb-5">
                            <span className="font-extrabold text-slate-900 text-xl">
                                Apply for {data?.data?.attributes?.title} at {data?.data?.attributes?.name}
                            </span>
                            <Close className="cursor-pointer" onClick={() => setIsopen(false)} />
                        </div>
                        <span className="text-slate-400 font-medium mb-5 block">
                            * Complete the form to apply for this job
                        </span>

                        <div className="mb-5">
                            <input type="number" className="w-full outline-none border p-2 rounded-md" placeholder="Years of experience"  onChange={(e) => setExperience(e.target.value)}/>
                        </div>

                        <div className="mb-5">
                            <input type="text" className="w-full outline-none border p-3 rounded-md" value={skills} placeholder="Skills" onChange={(e) => setSkills(e.target.value)} />
                            <div className="flex flex-wrap mt-2">
                                {userskillpref.map((i, index) => (
                                    <div key={index} className="flex items-center bg-gray-100 p-2 m-2 rounded-md">
                                        <span>{i}</span>
                                        <Close className="ml-2 cursor-pointer" onClick={() => handledeleteskill(index)} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {skills && 
                            <div className="bg-white shadow-lg w-1/2 absolute border rounded-md p-2">
                                {
                                    !result && <BarLoader style={{ width: '50%' }} color='#87CEEB' />
                                }
                                {result?.length === 0 
                                    ? <p className="text-red-500">Oops, check the input</p> 
                                    : result?.map((i) => (
                                        <div key={i} className="p-1 m-1 hover:bg-gray-100 cursor-pointer" onClick={() => handleskillclick(i)}>
                                            <li className="list-none">{i}</li>
                                        </div>
                                    ))}
                            </div>
                        }

                        <div className="mb-5">
                            <select value={skilllevel} onChange={(e) => setSkilllevel(e.target.value)} className="w-full border p-2 rounded-md">
                                <option value="">Select skill level</option>
                                {lev.map((i) => <option key={i} >{i}</option>)}
                            </select>
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2">Resume:</label>
                            <input type="file" onChange={handleresume} className="w-full border p-2 rounded-md" />
                        </div>
                        <div>
                            <button className='bg-blue-500 hover:bg-blue-600 p-3 text-white rounded-md outline-none' onClick={handleform}>Submit Application</button> 
                        </div>
                    </motion.div>
                </>
            )}

{applicationsubmitted && (
    <>
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setApplicationsubmitted(false)}
        />
        <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
                
                <div className="flex flex-col items-center">
                    <img src={checkimg} className="w-16 h-16 mb-4" alt="Checkmark" />
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Application Submitted!</h2>
                    <p className="text-slate-600 text-center mb-4">
                        Your application has been submitted successfully. The recruiter will update you on your application status.
                    </p>
                    <button
                        onClick={() => setApplicationsubmitted(false)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
                    >
                        Close
                    </button>
                </div>
            </div>
        </motion.div>
    </>
)}

        </AnimatePresence>
    );
};
//aksda