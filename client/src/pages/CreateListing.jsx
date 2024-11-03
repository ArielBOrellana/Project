import React from 'react'

export default function CreateListing() {
  return (
    <div className="bg-white rounded-lg m-2">
        <h1 className="text-2xl font-bold mt-4 pt-3 text-black text-center">Create a listing</h1>
        <form className="flex flex-col sm:flex-row mt-4 gap-4">
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
                    
                
                <div class="flex items-center ps-4 border border-gray-200 rounded">
                    <input id="sell" type="radio" name="type" className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"/>
                    <label for="sell" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Sell</label>
                </div>
                <div class="flex items-center ps-4 border border-gray-200 rounded">
                    <input id="rent" type="radio" name="type" className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"/>
                    <label for="rent" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Rent</label>
                </div>

                <div className="flex gap-6 flew-wrap">
                    <div className="flex gap-2">
                        <input type="checkbox" id="furnished" className="w-5" />
                        <span>Furnished</span>
                    </div>

                    <div className="flex gap-2">
                        <input type="checkbox" id="parking" className="w-5" />
                        <span>Parking spot</span>
                    </div>
                </div>

                <div className='flex flex-wrap gap-6'>
                    <div className="flex items-center gap-2">
                        <input type="number" id="bedrooms" min="1" max="10" required 
                        className="p-3 border rounded-lg" />
                        <span>Bedrooms</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="number" id="bathrooms" min="1" max="10" required 
                        className="p-3 border rounded-lg" />
                        <span>Bathrooms</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="number" id="price" min="1" max="10" required 
                        className="p-3 border rounded-lg" />
                        <div className='flex flex-col items-center'>
                            <p>Price</p>
                            <span className='text-xs'>($ /month)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col flex-1 p-2 gap-2'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>First image will be the cover</span>        
                </p>
                <div className='flex gap-4'>
                    <input className="p-3 border border-gray-300 rounded w-full" type="file" id='images' accept='image/*' multiple />
                    <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>

                <button className='p-3 my-4 text-white uppercase transition-colors duration-300 transform bg-green-900 rounded-lg hover:bg-green-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'>Create listing</button>
            </div>
        </form>
    </div>
  )
}
