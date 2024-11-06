"use client";

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');


  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn('credentials', { 
      redirect: true,
      callbackUrl: "/seller/home",
      email: email,
      password: password,
    });
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center justify-between">
          <h2 className="card-title">Sign In</h2>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <label className="input input-bordered flex items-center gap-2 my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input 
                type="email"
                required className="grow"
                placeholder="Email"
                value={email}
                name='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd" />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <div className="card-actions justify-center my-2">
              <button type="submit" className="btn btn-primary">Login</button>
              
            </div>

            <Link className="link link-warning" href={'/seller/signup'}>Create Account</Link>
            {message && <p>{message}</p>}
          </form>

        </div>
      </div>
    </div>
  );
}
