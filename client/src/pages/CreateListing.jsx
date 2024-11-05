import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

export default function CreateListing() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    console.log(formData);
    {/*Function for submitting images to the listing */}
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 10) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)});
                setImageUploadError(false);
                setUploading(false);
            })
            .catch((err) => {
                setImageUploadError('Image upload failed');
                setUploading(false);
            })
        } else {
            setImageUploadError('You can only upload 10 images per listing');
            setUploading(false);
        }
    };

    {/*Function to store image in Firebase */}
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                } 
            )
        })
    }

    const handleDeleteImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    }

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
                    
                
                <div className="flex items-center ps-4 border border-gray-200 rounded">
                    <input id="sell" type="radio" name="type" className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"/>
                    <label htmlFor="sell" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Sell</label>
                </div>
                <div className="flex items-center ps-4 border border-gray-200 rounded">
                    <input id="rent" type="radio" name="type" className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"/>
                    <label htmlFor="rent" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Rent</label>
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
                <span className='font-normal text-gray-600 ml-2'>First image will be the cover (max 10)</span>        
                </p>
                <div className='flex gap-4'>
                    <input onChange={(e)=>setFiles(e.target.files)} 
                        className="p-3 border border-gray-300 rounded w-full" 
                        type="file" 
                        id='images' 
                        accept='image/*' 
                        multiple 
                    />
                    <button 
                        disabled={uploading}
                        type="button" 
                        onClick={handleImageSubmit} 
                        className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                        >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
                <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <div key={url} className='flex justify-between p-3 border items-center'>
                            <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                            <button type='button' onClick={() => handleDeleteImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                        </div>
                    ))
                }
                <button className='p-3 my-4 text-white uppercase transition-colors duration-300 transform bg-green-900 rounded-lg hover:bg-green-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'>Create listing</button>
            </div>
        </form>
    </div>
  )
}
