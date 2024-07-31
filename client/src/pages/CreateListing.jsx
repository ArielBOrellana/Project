import React from 'react'

export default function CreateListing() {
  return (
    <div className="bg-white rounded-lg m-2">
        <h1 className="text-2xl font-bold mt-4 pt-3 text-black text-center">Create a listing</h1>
        <form className="flex flex-col sm:flex-row mt-4">
            <div className="flex flex-col gap-4 p-3">
                <label className="block mb-2 text-sm font-medium text-gray-600">
                    Name
                </label>
                <input 
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" 
                    type="text" 
                    id="name"/>
                
                <label className="block mb-2 text-sm font-medium text-gray-600">
                    Description
                </label>
                <textarea 
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" 
                    type="text" 
                    id="description"/>
                
                <label className="block mb-2 text-sm font-medium text-gray-600">
                    Address
                </label>
                <input 
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" 
                    type="text" 
                    id="address"/>
            </div>

            <ul class="flex flex-col gap-4 grid-flow-col">
                <li>
                    <input type="radio" id="sell" name="type" className="hidden peer" />
                    <label for="sell" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                        Sell
                    </label>
                </li>
                <li>
                    <input type="radio" id="rent" name="type" className="hidden peer" />
                    <label for="rent" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                        Rent
                    </label>
                </li>
            </ul>
        </form>
    </div>
  )
}
