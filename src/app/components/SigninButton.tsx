"use client"

import React, { useEffect, useState } from 'react'
import LogoutButton from './LogoutButton'
import { useRouter } from "next/navigation";


export const SigninButton = () => {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();


    const handleSignIn = () => {
        router.push("/home/userType");
      };

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
                <button onClick={handleSignIn} className="btn btn-accent">Sign In</button>
            </div>
          )
    }
}
 