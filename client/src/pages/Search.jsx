import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [sidebarData, setSidebarData] = useState({
        type: 'all',
        parking: false,
        furnished: false,
        sort: 'created_at',
        order: 'desc',
    });
    console.log(listings);

    {/* Set sidebar data acoording to changes in the URL */}
    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ){
            setSidebarData({
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setListings(data);
            setLoading(false);
        }
        fetchListings();
    }, [location.search]);

    {/* Function for handling change in the sidebar/filter */}
    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSidebarData({...sidebarData, type: e.target.id});
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished'){
            setSidebarData({...sidebarData, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false});
        }

        if (e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebarData({ ...sidebarData, sort, order });
        }
    };

    {/* Function for handling the submition of the form */}
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

  return (
    <div className='flex flex-col md:flex-row md:max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-3'>
        {/* Left section */}
        <div className='border-b-2 md:border-r-2 p-7 md:min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <h1 className='text-3xl font-semibold text-slate-800'>Filter</h1>
                <div className='flex flex-wrap gap-2 items-center'>
                    <label className='font-semibold'>Type:</label>
                    <div className='flex gap-2 '>
                        <input 
                            type='checkbox' 
                            id='all' 
                            className='w-5'
                            onChange={handleChange}
                            checked={sidebarData.type === 'all'}
                        />
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input 
                            type='checkbox' 
                            id='rent' 
                            className='w-5'
                            onChange={handleChange}
                            checked={sidebarData.type === 'rent'}
                        />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input 
                            type='checkbox' 
                            id='sale' 
                            className='w-5'
                            onChange={handleChange}
                            checked={sidebarData.type === 'sale'}
                        />
                        <span>For Sale</span>
                    </div>
                </div>

                <div className='flex flex-wrap gap-2 items-center'>
                    <label className='font-semibold'>Amenities:</label>
                    <div className='flex gap-2 '>
                        <input 
                            type='checkbox' 
                            id='parking' 
                            className='w-5'
                            onChange={handleChange}
                            checked={sidebarData.parking}
                        />
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input 
                            type='checkbox' 
                            id='furnished' 
                            className='w-5'
                            onChange={handleChange}
                            checked={sidebarData.furnished}
                        />
                        <span>Furnished</span>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Sort:</label>
                    <select 
                        id='sort_order' 
                        className='border rounded-lg p-1'
                        onChange={handleChange}
                        defaultValue={'created_at_desc'}
                    >
                        <option value='price_desc'>Price high to low</option>
                        <option value='price_asc'>Price low to high</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
                    </select>
                </div>
                <button className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-dark rounded-lg hover:opacity-95 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'>
                    Search
                </button>
            </form>
        </div>
        {/* Right section */}
        <div>
            <h1 className='text-3xl font-semibold border-b p-3 mt-5 text-slate-800'>Listing results:</h1>
        </div>
    </div>
  )
}
