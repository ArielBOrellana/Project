import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-indigo-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <ul className='flex gap-4'>
          <li className='hover:underline'>Buy</li>
          <li className='hover:underline'>Rent</li>
        </ul>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hover:underline'>Home</li>
          </Link>
          <Link to='/sign-in'>
            <li className='hover:underline'>Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
