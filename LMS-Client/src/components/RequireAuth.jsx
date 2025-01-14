import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function RequireAuth({ allowedRoles }) {

   let { isLoggedIn, role } = useSelector(state => state.authstate)




   return isLoggedIn && allowedRoles.find(myRole => myRole === role) ? (
      <Outlet />
   ) : isLoggedIn ? (<Navigate to={'/denied'} />) : (<Navigate to={'/login'} />)
}

export default RequireAuth;