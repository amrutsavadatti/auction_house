"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddItemPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [setPrice, setSetPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const sellerOfItem = useState(localStorage.getItem("token"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postBody = {
      name,
      description,
      image,
      setPrice,
      startDate,
      endDate,
      sellerOfItem,
    };

    try {
      const res = await fetch("https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      });

      if (res.ok) {
        console.log(res);
        alert("Item added successfully!");
        router.push("/seller/home");
      } else {
        alert("Failed to add item.");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white shadow-md rounded">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input mb-4"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea mb-4"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input mb-4"
          required
        />
        <input
          type="text"
          placeholder="Set Price"
          value={setPrice}
          onChange={(e) => setSetPrice(e.target.value)}
          className="input mb-4"
          required
        />
        <input
          type="datetime-local"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input mb-4"
          required
        />
        <input
          type="datetime-local"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input mb-4"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
