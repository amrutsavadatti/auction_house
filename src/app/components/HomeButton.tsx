"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";


export const HomeButton = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);


  const handleHome = () => {
    if(token) {
      router.push("/seller/home");
    } else {
      router.push("/home");
    }
  }


    return (
      <div className="navbar-end">
          <button onClick={handleHome} className="btn">Fortran Auction 🏠</button>
      </div>
    )

}
 