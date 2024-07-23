import React from 'react';

export default function SignUp() {
  return (
    <body className="bg-white">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
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
          Sign Up!
        </p>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="LoggingEmailAddress">
            Username
          </label>
          <input
            id="username"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:text-gray-300 focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            type="username"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="LoggingEmailAddress">
            Email Address
          </label>
          <input
            id="emailAddress"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:text-gray-300 focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            type="email"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="LoggingEmailAddress">
            Password
          </label>
          <input
            id="password"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:text-gray-300 focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            type="password"
          />
        </div>

        <div className="mt-6">
          <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
            Sign Up
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b md:w-1/4"></span>

          <a href="#" className="text-xs text-gray-500 uppercase hover:underline">
            or sign in
          </a>

          <span className="w-1/5 border-b md:w-1/4"></span>
        </div>
      </div>
    </div>
    </body>
  );
}
