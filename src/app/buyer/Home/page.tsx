"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "../../components/LogoutButton";

export default function BuyerHomePage() {
    const [buyerEmail, setBuyerEmail] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/buyer/signin");
        } else {
          setBuyerEmail(token); // Set buyer's email from token
          setLoading(false); // Proceed to show content if logged in
        }
      }, [router]);

    const handleCloseAccount = async () => {
      try {
        const response = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/closeBuyer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: buyerEmail })
        });

        if (!response.ok) {
          throw new Error("Failed to close account");
        }

        const data = await response.json();
        alert(data.message || "Your account has been deactivated.");
        router.push("/buyer/signin"); // Redirect to sign-in page after account deactivation
      } catch (error) {
        console.error(error);
        setError("An unexpected error occurred.");
      }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white'>
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold">Buyer Home Page</h2>
                <p className="text-lg">Hey {buyerEmail}!</p>
            </div>

            <div className="flex space-x-4">
                <button
                  onClick={handleCloseAccount}
                  className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
                >
                  Close Account
                </button>
                <LogoutButton />
            </div>

            {error && (
              <div className="mt-4 p-4 text-red-400 bg-gray-700 rounded">
                {error}
              </div>
            )}
        </div>
    );
}
