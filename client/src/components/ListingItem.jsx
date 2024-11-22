import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaBath, FaBed } from 'react-icons/fa';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-beige-dark shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]'>
      {/* Link wraps the entire card to make it clickable */}
      <Link to={`/listing/${listing._id}`}>

        {/* Property image */}
        <img
          src={listing.imageUrls[0]} // First image in the listing's image array
          alt='Listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />

        {/* Card content container */}
        <div className='p-3 flex flex-col gap-2 w-full'>
          {/* Listing name, truncated if too long */}
          <p className='text-lg font-semibold text-slate-800 truncate'>
            {listing.name}
          </p>

          {/* Location section */}
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-light' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>

          {/* Description section with limited text lines */}
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>

          {/* Price section with formatting */}
          <p className='text-slate-500 font-semibold mt-2'>
            ${listing.price.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          
          {/* Property details: Bedrooms, Bathrooms, and Type */}
          <div className='text-slate-700 flex gap-8'>
            {/* Bedrooms count */}
            <div className='flex items-center gap-3 text-sm'>
              <FaBed className='text-lg text-green-light' />
              {listing.bedrooms}
            </div>
            {/* Bathrooms count */}
            <div className='flex items-center gap-3 text-sm'>
              <FaBath className='text-lg text-green-light' />
              {listing.bathrooms}
            </div>
            {/* Property type: Rent or Sale */}
            <p className='bg-green-light text-white rounded-xl px-2 items-center ml-auto'>
              {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
