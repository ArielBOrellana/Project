import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  {/* Function for handling the submition in the search bar */}
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search); //Getting the URL with the built in method
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString(); 
    navigate(`/search?${searchQuery}`);
  };

  {/* Getting the searchTerm from the URL and setting it in the search bar */}
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  {/* Header with links to different pages and search bar */}
  return (
    <header className='bg-white shadow-md border'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <ul className='flex gap-4'> {/* Different lists to seperate */}
          <Link to='/'>
            <li>
              <img className='w-8 h-auto' src='https://logowik.com/content/uploads/images/geometric-buildings5691.logowik.com.webp' alt='logo'/>
            </li>
          </Link>
          <li className='hover:underline'>Buy</li>
          <li className='hover:underline'>Rent</li>
        </ul>

        <form onSubmit={handleSubmit} className='border rounded-3xl p-2 pl-3 flex items-center shadow-lg'>
          <input 
            type='text' 
            placeholder='Search...' 
            className='bg-transparent focus: outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center justify-center rounded-full bg-green-dark p-2">
            <button>
              <FaSearch className='w-3 h-3 text-white' />
            </button>
          </div>
        </form>

        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='max-sm:hidden sm_inline hover:underline'>Home</li>
          </Link>
          {/* If signed in, show profile pic or else show sign in */}
          <Link to='/profile'>
          {currentUser ? (
            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>
          ): (<li className='hover:underline'>Sign In</li>)}
        </Link>
        </ul>
      </div>
    </header>
  );
}
