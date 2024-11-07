"use client"

import React, { useEffect, useState } from 'react'
import LogoutButton from './LogoutButton'

export const SigninButton = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
      }, []);
       
    if (token) {
        return (
            <div className="navbar-end">
                <h2 className="mx-2">Hey {localStorage.getItem("token")}!</h2>
                <LogoutButton />
            </div>
        )
    } else {
        return (
            <div className="navbar-end">
                <h2 className="mx-2">Hey Customer!</h2>
                <a href='home/userType'  className="bg-primary">Sign in</a>
            </div>
          )
    }
}
 