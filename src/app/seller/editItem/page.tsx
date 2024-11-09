"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function EditItemForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const [description, setDescription] = useState(searchParams.get("description") || "");
  const [image, setImage] = useState(searchParams.get("imageUrl") || "");
  const [price, setPrice] = useState(searchParams.get("price") || "");

  // Format publish date to "YYYY-MM-DDTHH:MM"
  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [startDate, setStartDate] = useState(formatDateTime(searchParams.get("publishDate")));
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedItem = {
      name,
      description,
      image,
      setPrice: parseFloat(price),
      startDate,
    };

    console.log(updatedItem)

    try {
      const response = await fetch(
        "https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/editItem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (response.ok) {
        alert("Item updated successfully!");
        router.push("/seller/home");
      } else {
        alert("Failed to update item.");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body flex-col items-center text-center justify-between">
          <h2 className="card-title">Edit Item</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-md p-4 rounded">
              <label className="mb-4">Description: </label>
              <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea mb-4"
                required
              />
            <label>Image: </label>
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input mb-4"
              required
            />
            <label>Price: </label>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input mb-4"
              required
            />
            <label>Publish Date: </label>
            <input
              type="datetime-local"
              placeholder="Publish Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input mb-4"
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              Update Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function EditItemPage() {
  return (
    <Suspense fallback={<p>Loading item data...</p>}>
      <EditItemForm />
    </Suspense>
  );
}
