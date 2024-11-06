"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CloseAccountPage() {
    const [email, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleCloseAccount = async () => {
        setEmail("aa@g.com");
        try {
            const response = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/closeSeller', {
            method: 'POST',
            cache: 'no-store',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email}),
        });

        if (response.ok) {
            router.push('/home');
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
        <h2 className="text-xl font-bold mb-4">Close Account</h2>
        <p className="mb-4 text-center">Are you sure you want to close your account? This action is irreversible.</p>
        <button
            onClick={handleCloseAccount}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition"
        >
            Close Account
        </button>
        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
        </div>
    );
}
