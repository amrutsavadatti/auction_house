"use client";
import { useState, useEffect } from 'react';

export default function BuyerMainPage() {
  const [message, setMessage] = useState<string>('');
  const [funds, setFunds] = useState<number>(0);
  const [addAmount, setAddAmount] = useState<number>(0);

  // Fetch initial funds on component mount
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const email = "user@example.com"; // Replace with dynamic email of logged-in user
        const response = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/getFunds', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
          setFunds(data.funds);
        } else {
          console.error("Failed to fetch funds:", data);
        }
      } catch (error) {
        console.error("An error occurred while fetching funds:", error);
      }
    };

    fetchFunds();
  }, []);

  const handleCloseAccount = async () => {
    try {
      const email = "user@example.com"; // Replace with dynamic email of logged-in user
      const response = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/closeBuyer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Your account has been deactivated.");
      } else {
        setMessage(`Error: ${data}`);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setMessage('An unexpected error occurred.');
    }
  };

  const handleAddFunds = async () => {
    try {
      const email = "user@example.com"; // Replace with dynamic email of logged-in user
      const response = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/addFunds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, amount: addAmount }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Funds added successfully.");
        setFunds(prevFunds => prevFunds + addAmount);
        setAddAmount(0); // Clear the input field
      } else {
        setMessage(`Error: ${data}`);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Buyer Main Page</h2>

        <div className="text-lg mb-4">Current Funds: ${funds}</div>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={addAmount}
            onChange={(e) => setAddAmount(parseFloat(e.target.value))}
            placeholder="Enter amount"
            className="w-full p-2 bg-gray-700 rounded text-white"
          />
          <button
            onClick={handleAddFunds}
            className="py-2 px-4 bg-green-600 rounded hover:bg-green-700 transition duration-200"
          >
            Add Funds
          </button>
        </div>

        <button
          onClick={handleCloseAccount}
          className="w-full py-2 mt-4 text-lg font-semibold bg-red-600 rounded hover:bg-red-700 transition duration-200"
        >
          Close Account
        </button>

        {message && (
          <div className="mt-4 p-4 text-green-400 bg-gray-700 rounded">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
