"use client";

import { Session } from "inspector/promises";
import { useSession } from "next-auth/react";

export default function SellerHomePage() {

    const { data: session } = useSession();
    console.log( session.user);
    console.log("# User data:");

    return (
        <div className='flex flex-col justify-center '>
            <div className="bg-accent m-2">
                <a href="/seller/close">Close account</a>
                
            </div>
            <div className='m-2'>
            <a href="/seller/item">items</a>
            </div>
        </div>
    );
}
