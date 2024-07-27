import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  {/* Functionality to handle form data and eventual errors */}
  const [formData, setFormData] = useState ({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate(); {/* Navigate to sign in page after registration */}
  const dispacth = useDispatch(); {/* Dispatch to use the created reducers in the userSlice */}
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
  };

  {/* Method to handle submition of form and error checking */}
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispacth(signInStart());
      const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        if(data.success === false) {
          dispacth(signInFailure(data.message));
          return;
        }
        dispacth(signInSuccess(data));
        navigate('/');
    } catch (error) {
      dispacth(signInFailure(error.message));
    }
   
  };

  return (
    <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
      {/* Image next to sign in only for big screens */}
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1721294104781-4f00f6ffef99?q=80&w=2786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-7 sm:h-8" src="https://logowik.com/content/uploads/images/geometric-buildings5691.logowik.com.webp" alt="Logo" />
        </div>

        <p className="mt-3 text-xl text-center text-gray-600">
          Welcome back!
        </p>

        <form className="mt-4" onSubmit={handleSubmit}>

          {/* Google Auth */}
          <OAuth/>

          <div className="flex items-center justify-between mt-4 pb-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>

            <label className="text-xs text-center text-gray-500 uppercase">
              or login with email
            </label>

            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>

            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              id="email"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              onChange={handleChange}
            />

            <label className="block mb-2 text-sm font-medium text-gray-600 pt-2">
              Password
            </label>

            <input
              id="password"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              onChange={handleChange}
            />

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                {loading ? 'Loading...' : 'Sign In'} {/* Change text when loading */}
              </button>
            </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b md:w-1/4"></span>
          <Link to='/sign-up'>
            <a href="#" className="text-xs text-gray-500 uppercase hover:underline">
            or sign up
            </a>
          </Link>

          <span className="w-1/5 border-b md:w-1/4"></span>
        </div>
        {/* Text to show error to user */}
        {error && <p className='text-red-500 - mt-5'>{error}</p>}
      </div>
    </div>
  )
}
