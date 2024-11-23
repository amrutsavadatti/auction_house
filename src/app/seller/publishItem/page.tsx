"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PublishItem() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemName = searchParams.get("name") || "";
  const [expirationDate, setExpirationDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');




  const postBody = {
    itemName,
    publishDate: `${year}-${month}-${day}T${hours}:${minutes}`,
    expirationDate,
    seller:localStorage.getItem("token"),
  };

    try {
      const res = await fetch("https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/publishItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody)
      });
      console.log(postBody)

      if (res.ok) {
        console.log(res);
        alert("Item published successfully!");
        router.push("/seller/home");
      } else {
        alert("Failed to publish item.");
      }
    } catch (error) {
      console.error("Error publishing item:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center justify-between">
          <h2 className="card-title">Publish Item</h2>

          <form onSubmit={handleSubmit} className="w-full max-w-md p-4 rounded">
            <h3> {itemName}</h3>
            End Date
            <input
              type="datetime-local"
              placeholder="End Date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="input mb-4"
              required
            />
            <button type="submit" className="btn btn-accent w-full">
              Submit
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}



export default function PublishItemPage() {
  return (
    <Suspense fallback={<p>Loading item data...</p>}>
      <PublishItem />
    </Suspense>
  );
}
