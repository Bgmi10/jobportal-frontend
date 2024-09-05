import { stateAbbrivations } from '../utils/constants';
import React from 'react';

export const Statedropdown = ({ setDistrict, district, title , stateAbbrivations }) => {



    return (
        <div className='lg:w-full lg:max-w-sm sm: max-w-40 '>
            <select
                onChange={(e) => setDistrict(e.target.value)}
                className='w-full outline-none rounded-md border p-3 m-3 focus:ring-2 focus:ring-blue-400 transition-all duration-300'
                aria-label='select'
                value={district}
            >
                <option disabled value={''}>{title}</option>
                {stateAbbrivations.map((i, index) => (
                    <option key={index} value={i}>{i}</option>
                ))}
            </select>
        </div>
    );
};
