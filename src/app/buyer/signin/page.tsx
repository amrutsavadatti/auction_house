"use client";

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function BuyerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/loginBuyer', {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (!data.userid) {
          setMessage("Invalid email or password");
        } else {
          localStorage.setItem("token", data.userid); // Store user ID in localStorage
          router.push("/buyer/Home"); // Redirect to buyer home page
        }
      } else {
        setMessage("Invalid email or password");
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Buyer Sign In</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border-b border-gray-600 py-2">
            <input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-transparent focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center border-b border-gray-600 py-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-transparent focus:outline-none"
              required
            />
          </div>

          <button type="submit" className="w-full py-2 mt-4 text-lg font-semibold bg-green-600 rounded hover:bg-green-700 transition duration-200">
            Login
          </button>
          
          <div className="text-center mt-4">
            <Link href="/buyer/signup" className="text-yellow-400 hover:underline">Create Account</Link>
          </div>
          
          {message && <p className="text-center text-red-400 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
}
