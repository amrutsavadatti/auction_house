"use client"

import React from 'react'
import { useRouter } from "next/navigation";


export const HomeButton = () => {
    const router = useRouter();


    const handleHome = () => {
        router.push("/home");
      };


      return (
        <div className="navbar-end">
            <button onClick={handleHome} className="btn">Fortran Auction 🏠</button>
        </div>
      )

}
 