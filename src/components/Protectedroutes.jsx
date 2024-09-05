import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

export const Protectedroutes = () => {
    const {isLoaded , isSignedIn   , user}  = useUser()
    
   
    if(!isLoaded) {
      return <div><BarLoader color='#87CEEB' style={{width : 'full'}}/></div>
    }
    return isSignedIn ? <Outlet /> : <Navigate to={'/' } />
}
