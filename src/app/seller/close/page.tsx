"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function CloseAccountPage() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleCloseAccount = async () => {
        try {
            const response = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/closeSeller', {
            method: 'POST',
            cache: 'no-store',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: localStorage.getItem("token") }),
        });

        if (response.ok) {

            const data = await response.json()
            if(data.statusCode === 200){
                localStorage.removeItem("token");
                router.push('/');
            }
            alert(data.message)
            router.push('/seller/home')
        } else {
            const data = await response.json();
            setErrorMessage(data.message || 'Failed to close account.');
        }
        } catch (error) {
        console.error('An unexpected error occurred:', error);
        setErrorMessage('An unexpected error occurred.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="card bg-neutral text-neutral-content w-96">
                <div className="card-body items-center text-center justify-between">
                    <h2 className="card-title text-red-500">Close Account</h2>
                    <h3>Are you sure? this change is Irreversible!!</h3>
                    <button
                        onClick={handleCloseAccount}
                        className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition"
                    >
                        Confirm
                    </button>
                    {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

                </div>
            </div>
        </div>
    );
}
