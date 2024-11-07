"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import LogoutButton from './LogoutButton'

export const SigninButton = () => {
    if (localStorage.getItem("token")) {
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
 