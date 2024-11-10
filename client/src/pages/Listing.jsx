import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking
} from 'react-icons/fa'
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const {currentUser} = useSelector((state) => state.user);

  {/* Fetching listing data */}
  useEffect(()=> {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);

  return (
    <div className="bg-white rounded-lg m-2">
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
      {listing && !loading && !error && 
      <div className='p-5'>
        <Swiper className="relative w-full max-w-md rounded-lg overflow-hidden"
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          >
          {listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <div className='flex justify-center items-center px-2'>
                <img className='h-auto max-w-lg rounded-lg w-full' src={url}/>
              </div>
            </SwiperSlide>
          ))}
          {/* Custom navigation buttons */}
          <div className="swiper-button-next absolute items-center transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-lg p-2 hover:bg-opacity-70 z-10"></div>
          <div className="swiper-button-prev absolute items-center transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-lg p-2 hover:bg-opacity-70 z-10"></div>
        </Swiper>

        <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
          <p className='text-2xl font-semibold'>
            {listing.name} - ${' '}
            {listing.price}
            {listing.type === 'rent' && ' / month'}
          </p>
          <hr/>
          <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
            <FaMapMarkerAlt className='text-green-700' />
            {listing.address}
          </p>

          <div>
            <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
              {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
            </p>
          </div>
          <hr/>
          <p className='text-gray-600'>{listing.description}</p>

          <ul className='flex flex-wrap items-center gap-4 sm:gap-6 text-green-900 font-semibold text-sm'>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaBed className='text-lg'/>
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : 
               `${listing.bedrooms} bed `}
            </li>

            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaBath className='text-lg'/>
              {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : 
               `${listing.bathrooms} bath `}
            </li>

            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaChair className='text-lg'/>
              {listing.furnished ? 'Furnished' : 'Not Furnished'}
            </li>

            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaParking className='text-lg'/>
              {listing.parking ? 'Parking' : 'No Parking'}
            </li>
          </ul>

          {currentUser && listing.userRef !== currentUser._id && (
            <Contact listing={listing} />
          )}
        </div>
      </div>}
    </div>
  )
}