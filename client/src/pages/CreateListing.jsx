import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
    const { currentUser } = useSelector((state) => state.user); // Get the current user from Redux
    const navigate = useNavigate(); // Navigation utility from react-router-dom

    // Form state to manage listing details and other behaviors
    const [files, setFiles] = useState([]); // Temporarily holds selected image files for upload
    const [formData, setFormData] = useState({
        imageUrls: [], // Holds Firebase-hosted URLs after upload
        name: '', 
        description: '',
        address: '',
        type: 'rent', // Default to "rent"; can be switched with radio buttons
        furnished: false,
        parking: false,
        bedrooms: 1,
        bathrooms: 1,
        price: 100,
    });

    // State for tracking errors and UI feedback
    const [imageUploadError, setImageUploadError] = useState(false); 
    const [uploading, setUploading] = useState(false); // Indicates image upload progress
    const [error, setError] = useState(false); // Generic form submission errors
    const [loading, setLoading] = useState(false); // Indicates form submission progress

    // Handles image uploads and enforces the 10-image limit
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length <= 10) {
            setUploading(true);
            const promises = files.map(file => storeImage(file)); // Upload each file in parallel

            Promise.all(promises)
                .then((urls) => {
                    setFormData({ ...formData, imageUrls: [...formData.imageUrls, ...urls] }); // Append uploaded URLs
                    setUploading(false);
                })
                .catch(() => {
                    setImageUploadError('Image upload failed'); 
                    setUploading(false);
                });
        } else {
            setImageUploadError('You can only upload up to 10 images per listing'); 
        }
    };

    // Uploads a single image to Firebase Storage
    const storeImage = async (file) => {
        const storage = getStorage(app); 
        const fileName = new Date().getTime() + file.name; // Unique filename to avoid collisions
        const storageRef = ref(storage, fileName); 
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                null, 
                reject, // Rejects promise if there's an upload error
                () => getDownloadURL(uploadTask.snapshot.ref).then(resolve) // Resolves with the file's URL
            );
        });
    };

    // Deletes an image URL from the form data
    const handleDeleteImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    // Handles various input changes in the form
    const handleChange = (e) => {
        const { id, type, value, checked } = e.target;

        if (id === 'sell' || id === 'rent') {
            setFormData({ ...formData, type: id }); // Toggles between "sell" and "rent"
        } else if (type === 'checkbox') {
            setFormData({ ...formData, [id]: checked }); // Updates boolean fields
        } else {
            setFormData({ ...formData, [id]: value }); // Updates text and number fields
        }
    };

    // Submits the form data to the backend API
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.imageUrls.length < 1) return setError('You must upload at least one image');

        try {
            setLoading(true);
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, userRef: currentUser._id }), // Include user ID
            });
            const data = await res.json();
            setLoading(false);

            if (!data.success) return setError(data.message);
            navigate(`/listing/${data._id}`); // Redirects to the new listing
        } catch (err) {
            setError('Failed to create listing');
            setLoading(false);
        }
    };

  return (
    <div className="bg-white rounded-lg m-2">
        <h1 className="text-2xl font-bold mt-4 pt-3 text-black text-center">Create a listing</h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row mt-4 gap-4">

            {/* Left Column - Listing Details */}
            <div className="flex flex-col gap-4 p-3">
                 {/* Handles name/title input */}
                <label className="block mb-2 text-sm font-medium text-gray-600">
                    Name
                </label>
                <input 
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" 
                    type="text" 
                    id="name"
                    required
                    onChange={handleChange}
                    value={formData.name}
                />
                
                {/* Handles description input */}
                <label className="block mb-2 text-sm font-medium text-gray-600">
                    Description
                </label>
                <textarea 
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" 
                    type="text" 
                    id="description"
                    required
                    onChange={handleChange}
                    value={formData.description}
                />
                
                {/* Handles address input */}
                <label className="block mb-2 text-sm font-medium text-gray-600">
                    Address
                </label>
                <input 
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" 
                    type="text" 
                    id="address"
                    required
                    onChange={handleChange}
                    value={formData.address}
                />
                    
                {/* Handles type input for 'sell' */}
                <div className="flex items-center ps-4 border border-gray-200 rounded">
                    <input 
                        id="sell" 
                        type="radio" 
                        name="type" 
                        className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        onChange={handleChange}
                        checked={formData.type === 'sell'}
                    />
                    <label htmlFor="sell" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Sell</label>
                </div>
                {/* Handles type input for 'rent' */}
                <div className="flex items-center ps-4 border border-gray-200 rounded">
                    <input 
                        id="rent" 
                        type="radio" 
                        name="type" 
                        className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        onChange={handleChange}
                        checked={formData.type === 'rent'}
                    />
                    <label htmlFor="rent" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Rent</label>
                </div>

            {/* Handles checkbox inputs for 'furnished' and 'parking' */}
                <div className="flex gap-6 flew-wrap">
                    <div className="flex gap-2">
                        <input 
                            type="checkbox" 
                            id="furnished" 
                            className="w-5" 
                            onChange={handleChange}
                            checked={formData.furnished}
                        />
                        <span>Furnished</span>
                    </div>

                    <div className="flex gap-2">
                        <input 
                            type="checkbox" 
                            id="parking" 
                            className="w-5" 
                            onChange={handleChange}
                            checked={formData.parking}
                        />
                        <span>Parking spot</span>
                    </div>
                </div>

            {/* Handles number inputs for bedrooms, bathrooms and price */}
                <div className='flex flex-wrap gap-6'>
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            id="bedrooms" 
                            min="1" 
                            max="10" 
                            required 
                            className="p-3 border rounded-lg" 
                            onChange={handleChange}
                            value={formData.bedrooms}
                        />
                        <span>Bedrooms</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            id="bathrooms" 
                            min="1" 
                            max="10" 
                            required 
                            className="p-3 border rounded-lg" 
                            onChange={handleChange}
                            value={formData.bathrooms}
                        />
                        <span>Bathrooms</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            id="price" 
                            min="100" 
                            max='10000000' 
                            required 
                            className="p-3 border rounded-lg" 
                            onChange={handleChange}
                            value={formData.price}
                        />
                        <div className='flex flex-col items-center'>
                            <p>Price</p>
                            {formData.type === 'rent' && (
                                <span className='text-xs'>($ / month)</span> //Adds per month if type = rent
                            )}
                        </div>
                    </div>
                </div>
            </div>

             {/* Right Column - Image Upload and Submission */}
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
                {/* Displays uploaded images */}
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <div key={url} className='flex justify-between p-3 border items-center'>
                            <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                            <button type='button' onClick={() => handleDeleteImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                        </div>
                    ))
                }
                <button disabled={loading || uploading} className='p-3 my-4 text-white uppercase transition-colors duration-300 transform bg-green-900 rounded-lg hover:bg-green-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'>
                    {loading ? 'Creating...' : 'Create listing'}
                </button>
                {error && <p className='text-red-700 text-sm'>{error}</p>}
            </div>
        </form>
    </div>
  )
}
