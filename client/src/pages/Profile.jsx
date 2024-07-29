import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  return (
  <div className="flex flex-col md:flex-row md:max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    {/* Left Section*/}
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 flex flex-col items-center justify-center text-center text-white md:w-1/3">
      <img src={currentUser.avatar} alt="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
      className="w-24 h-24 rounded-full border-2 border-black"/>
      <h2 className="text-2xl font-bold mt-4">Profile</h2>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
          sign out
        </button>

        <button onClick={handleDeleteUser} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-500 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
          delete account
        </button>
      </div>
    </div>
  </div>
  )
} 