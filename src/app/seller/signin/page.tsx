"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreate = () => {
    router.push("/seller/signup");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/loginSeller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (!data.userid) {
          setError("Invalid email or password");
        } else {
          localStorage.setItem("token", data.userid); 
          router.push("/seller/home");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.log(error)
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button  onClick={handleCreate} >Create account</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
