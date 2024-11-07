"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "../../components/LogoutButton";

export default function BuyerHomePage() {
    const [buyerEmail, setBuyerEmail] = useState<string | null>(null);
    const [funds, setFunds] = useState<string | null>(null); // Set initial funds to 0
    const [amountToAdd, setAmountToAdd] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/buyer/signin");
        } else {
          setBuyerEmail(token);
          setLoading(false);
        }
      }, [router]);

    const handleAddFunds = async () => {
      if (!buyerEmail) return;

      try {
        const response = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/addFunds', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ buyerEmail: buyerEmail, fundsAmountAdd: amountToAdd }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.body);
          setFunds(data.body); // Update funds after adding successfully
          alert("Funds added successfully.");
          setAmountToAdd(0); // Reset input after adding funds
        } else {
          setError("Failed to add funds.");
        }
      } catch (error) {
        console.error(error);
        setError("An unexpected error occurred while adding funds.");
      }
    };

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
        localStorage.removeItem("token");
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

            <div className="text-center mb-4">
                <p className="text-xl font-semibold">Available Funds: {funds !== null ? `$${funds}` : "0"}</p>
            </div>

            <div className="flex items-center space-x-4 mb-4">
                <input
                  type="number"
                  value={amountToAdd}
                  onChange={(e) => setAmountToAdd(Number(e.target.value))}
                  placeholder="Enter amount to add"
                  className="px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none"
                />
                <button
                  onClick={handleAddFunds}
                  className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
                >
                  Add Funds
                </button>
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
