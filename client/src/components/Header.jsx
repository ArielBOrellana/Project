import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Header() {
  // Access the current user's information from the Redux store
  const { currentUser } = useSelector((state) => state.user);

  // State to manage the search term entered in the search bar
  const [searchTerm, setSearchTerm] = useState('');

  // Navigation hook to programmatically navigate between routes
  const navigate = useNavigate();

  /**
   * Handle search form submission:
   * - Prevents default form behavior.
   * - Updates the URL with the entered search term as a query parameter.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search); // Manage URL query parameters
    urlParams.set('searchTerm', searchTerm); // Set the search term in the query params
    const searchQuery = urlParams.toString(); // Convert params to a query string
    navigate(`/search?${searchQuery}`); // Navigate to the search page with the query string
  };

  /**
   * Populate the search bar with the search term from the URL:
   * - Extracts the `searchTerm` parameter from the URL.
   * - Updates the search bar input to reflect the term in the URL.
   */
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); // Access current URL query parameters
    const searchTermFromUrl = urlParams.get('searchTerm'); // Get the `searchTerm` parameter
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl); // Update state with the extracted term
    }
  }, [location.search]); // Runs when the `location.search` changes

  /**
   * Render the header:
   * - Contains navigation links, a search bar, and user profile/sign-in options.
   */
  return (
    <header className='bg-white shadow-md border'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        {/* Navigation links */}
        <ul className='flex gap-4'>
          <Link to='/'>
            <li>
              {/* Logo linking to the homepage */}
              <img
                className='w-8 h-auto'
                src='https://logowik.com/content/uploads/images/geometric-buildings5691.logowik.com.webp'
                alt='logo'
              />
            </li>
          </Link>

          {/* Links for buying and renting properties */}
          <Link to={'/search?type=sell'}>
            <li className='max-sm:hidden sm_inline hover:underline'>Buy</li>
          </Link>
          <Link to={'/search?type=rent'}>
            <li className='max-sm:hidden sm_inline hover:underline'>Rent</li>
          </Link>
        </ul>

        {/* Search bar with a form to submit queries */}
        <form
          onSubmit={handleSubmit}
          className='border rounded-3xl p-2 pl-3 flex items-center shadow-lg'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm} // Controlled input bound to the search term state
            onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
          />
          <div className="flex items-center justify-center rounded-full bg-green-dark p-2">
            <button>
              {/* Search icon inside a button */}
              <FaSearch className='w-3 h-3 text-white' />
            </button>
          </div>
        </form>

        {/* Links for user profile and home page */}
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='max-sm:hidden sm_inline hover:underline'>Home</li>
          </Link>
          {/* Conditionally render profile picture if the user is logged in, otherwise show "Sign In" */}
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar} // User's avatar image
                alt='profile'
              />
            ) : (
              <li className='hover:underline'>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
