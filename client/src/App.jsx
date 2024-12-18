import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';

export default function App() {
  return (
    <BrowserRouter>
    <Header/> {/* Header is rendered on all pages */}
    <Routes>
      <Route path="/" element={<Home />} />

       {/* Routes protected by PrivateRoute (requires authentication) */}
      <Route element={<PrivateRoute />} >
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing />} />
      </Route>

      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/search" element={<Search />} />
      <Route path="/listing/:listingId" element={<Listing />} /> {/* Route for individual listing details */}
    </Routes>
    </BrowserRouter>
  );
}
