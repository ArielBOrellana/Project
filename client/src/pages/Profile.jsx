import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  {/* onClick function for deleting user with dispatch and navigate */}
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/sign-in');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  {/* onClick function for signing out user with dispatch and navigate */}
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigate('sign-in');
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  }

  {/* Function to show the users listings */}
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false){
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }

  {/* Function to delete user listing */}
  const handleDeleteListing = async (listingID) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingID}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success === false){
        console.log(data.message);
        return;
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== listingID));
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
  <div className="flex flex-col md:flex-row md:max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-3">
    {/* Left Section*/}
    <div className="bg-slate-400 p-6 flex flex-col items-center justify-center text-center text-white md:w-1/3 rounded-lg">
      <img src={currentUser.avatar} alt="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
      className="w-24 h-24 rounded-full border-2 border-black"/>
      <h2 className="text-2xl font-bold mt-4 text-black">Profile</h2>
    </div>
    {/* Right Section*/}
    <div className="p-6 md:w-2/3">
      <h3 className="text-xl font-semibold mb-4">Information</h3>
      <div className="mb-4">
        <h4 className="text-md font-medium">Username</h4>
        <p className="text-gray-600">{currentUser.username.slice(0, -4)}</p>

        <h4 className="text-md font-medium pt-7">Email</h4>
        <p className="text-gray-600 pb-5">{currentUser.email}</p>
      </div>
      <hr className='pb-4'></hr>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 pb-4">
        <button onClick={handleSignOut} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
          sign out
        </button>

        <button onClick={handleDeleteUser} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-500 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
          delete account
        </button>
      </div>
      <Link to='/create-listing'>
        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-900 rounded-lg hover:bg-green-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
          create listing
        </button>
      </Link>

      <button onClick={handleShowListings} className='w-full'>Show listings</button>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listing' : ''}
      </p>

      {userListings && userListings.length > 0 && 
      <div className='flex flex-col gap-4'>
        <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
        {userListings.map((listing) => (
        <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-3'>
          <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} 
              alt="Cover image" 
              className='h-16 w-16 object-contain'
            />
          </Link>
          <Link className='flex-1 text-gray-600 font-semibold hover:underline truncate' 
            to={`/listing/${listing._id}`}>
          <p>{listing.name}</p>
          </Link>

          <button onClick={()=>handleDeleteListing(listing._id)} className='text-red-700 uppercase items-center'>Delete</button>
        </div>
        ))}
      </div>}
    </div>
  </div>
  )
} 