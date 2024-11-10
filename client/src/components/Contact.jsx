import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';

export default function Contact({ listing }) {
    const [landlord, setLandlord] = useState(null);

    {/* Fetching the data of the landlord to easy access the email */}
    useEffect(() => {
        const fetchLandlord = async () => {
          try {
            const res = await fetch(`/api/user/${listing.userRef}`);
            const data = await res.json();
            setLandlord(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchLandlord();
      }, [listing.userRef]);

{/* Button for contacting landlord - email popup */}
  return (
    <div className='flex'>
        <Link
        to={landlord ? `mailto:${landlord.email}?subject=Regarding ${listing.name}` : '#'} //Setting 'to' and 'subject' for mail
        className='w-full px-6 py-3 mt-3 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 text-center'
        >
            Contact landlord
        </Link>
    </div>
  )
}
