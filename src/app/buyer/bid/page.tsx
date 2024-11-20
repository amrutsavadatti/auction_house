"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import React from "react";

export default function ViewItem() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const description = searchParams.get("description") || "";
  const image = searchParams.get("figureimageout") || "";
  const price = searchParams.get("price") || "";

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const [amountToAdd, setAmountToAdd] = useState<number>(0);


  const handleBack = async (e:React.FormEvent) => {
    e.preventDefault();

    router.push("/buyer/home");
  };

  const handleBid = async (e:React.FormEvent) => {
    e.preventDefault();
      try {
        if (amountToAdd > parseInt(price, 10)) {
            const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/placeBid', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                 "itemName" : name,
                 "buyer": localStorage.getItem('token'),
                 "value": amountToAdd,
                 "dateMade": `${year}-${month}-${day}T${hours}:${minutes}`,
                })
            });
    
            if (response.ok) {
              const data = await response.json();
              if (data.statusCode === 200) {
                console.log(data);
                alert("Bid placed successfully");
                router.push("/buyer/reviewActiveBids");
              } else {
                alert(`${ data.error }`)
              }
            }
        } else {
            alert("Bid higher that current bid")
        }
      } catch (error) {
        console.log(error);
      }
  };

  return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body flex-col items-center text-center justify-between">
            <h2 className="card-title">{name}</h2>
            <h4 className="mb-4">Description: {description}</h4>
            <h4 className="mb-4">Price: {price}</h4>
            <div>
            <img
                src={image}
                className="object-cover"
            />
        </div>
        <form onSubmit={handleBid}>
            <label className="input input-bordered flex items-center gap-2 my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
              </svg>
            <input
                type="number"
                value={amountToAdd}
                onChange={(e) => setAmountToAdd(Number(e.target.value))}
                placeholder="Enter amount to add"
                className="px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none"
            />
            </label>
            <button type="submit" className="btn btn-success w-full rounded-full">Place Bid</button>
          </form>

        <button onClick={handleBack} className="btn btn-primary w-full	">
            Back
        </button>
        </div>
      </div>
    </div>
  );
  
}
