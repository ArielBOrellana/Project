import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

{/* 
This component ensures that the profile page is only accessible to users who are signed in. 
If the user is not signed in, they will be redirected to the sign-in page.
*/}
export default function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user); // Get currentUser from Redux state

    // If the user is signed in, render the nested route (Outlet), otherwise redirect to the sign-in page
    return currentUser ? <Outlet /> : <Navigate to='sign-in' />; 
}
