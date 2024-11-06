"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

export const SigninButton = () => {
    const {data: session} = useSession();
    console.log("this is session");
    console.log(session);
    if(session && session.user) {
        return (
            <div className="navbar-end">
                <h2 className="mx-2">Hey {session.user.email}!</h2>
                <button onClick={() => signOut}  className="bg-primary">Sign Out</button>
            </div>
        )
    }

  return (
    <div className="navbar-end">
        <h2 className="mx-2">Hey Customer!</h2>
        <a href='home/userType'  className="bg-primary">Sign in</a>
    </div>
  )
}
 