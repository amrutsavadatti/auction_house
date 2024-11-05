"use client";
import { useState, useEffect } from 'react';

export default function BuyerMainPage() {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Retrieve the logged-in user's email from session storage (or another state management solution)
    const userEmail = sessionStorage.getItem("userEmail");
    if (userEmail) {
      setEmail(userEmail);
    } else {
      setMessage("Error: Unable to retrieve user email. Please log in again.");
    }
  }, []);

  const handleCloseAccount = async () => {
    try {
      if (!email) {
        setMessage("Error: No email found. Please log in.");
        return;
      }

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold">Buyer Main Page</h2>

        {email ? (
          <button
            onClick={handleCloseAccount}
            className="w-full py-2 mt-4 text-lg font-semibold bg-red-600 rounded hover:bg-red-700 transition duration-200"
          >
            Close Account
          </button>
        ) : (
          <p className="text-red-500">Please log in to access account settings.</p>
        )}

        {message && (
          <div className="mt-4 p-4 text-green-400 bg-gray-700 rounded">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
