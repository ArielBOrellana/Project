import { Link } from 'react-router-dom';

export default function Header() {
  {/* Header with links to different pages */}
  return (
    <header className='bg-white shadow-md'>
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
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='max-sm:hidden sm_inline hover:underline'>Home</li>
          </Link>
          <Link to='/sign-in'>
            <li className='hover:underline'>Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
