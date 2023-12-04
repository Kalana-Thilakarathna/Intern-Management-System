import React from 'react'
import { useLocation,Navigate,Outlet } from 'react-router-dom'
import useAuth from './Hooks/useAuth'

const RequireAuth = () => {
    const {auth} = useAuth()
    
    
    const location = useLocation()

    return(
        auth?.token
        ? <Outlet/>
        : <Navigate to='/' state={{from:location}} replace/>
    )
}

export default RequireAuth


