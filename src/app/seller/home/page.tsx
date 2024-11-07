"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "../../components/LogoutButton";

export default function SellerHomePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/seller/signin");
        } else {
          setLoading(false); // Proceed to show content if logged in
        }
      }, [router]);
    
      if (loading) return <p>Loading...</p>;


    return (
        <div className='flex flex-col justify-center '>
            <div className="bg-accent m-2">
                <a href="/seller/close">Close account</a>
                
            </div>
            <div className='m-2'>
            <a href="/seller/item">items</a>
            </div>
            <div>
                <LogoutButton />
            </div>
        </div>
    );
}
