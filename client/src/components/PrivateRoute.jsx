import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'


{/* Making the profile page private and only for those signed in */}
export default function PrivateRoute() {
    const {currentUser} = useSelector((state) => state.user)
  return currentUser ? <Outlet /> : <Navigate to='sign-in' />
}
