// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// export default function EditItemPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const name = useState(searchParams.get("name") || "");
//   const [description, setDescription] = useState(searchParams.get("description") || "");
//   const [imageUrl, setImageUrl] = useState(searchParams.get("imageUrl") || "");
//   const [price, setPrice] = useState(searchParams.get("price") || "");
//   const [publishDate, setPublishDate] = useState(searchParams.get("publishDate") || "");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const updatedItem = {
//       name,
//       description,
//       imageUrl,
//       price: parseInt(price),
//       publishDate,
//     };

//     try {
//       const response = await fetch(
//         "https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/editItem",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedItem),
//         }
//       );

//       if (response.ok) {
//         alert("Item updated successfully!");
//         router.push("/seller/home");
//       } else {
//         alert("Failed to update item.");
//       }
//     } catch (error) {
//       console.error("Error updating item:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white shadow-md rounded">
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="textarea mb-4"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={imageUrl}
//           onChange={(e) => setImageUrl(e.target.value)}
//           className="input mb-4"
//           required
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           className="input mb-4"
//           required
//         />
//         <input
//           type="datetime-local"
//           placeholder="Publish Date"
//           value={publishDate}
//           onChange={(e) => setPublishDate(e.target.value)}
//           className="input mb-4"
//           required
//         />
//         <button type="submit" className="btn btn-primary w-full">
//           Update Item
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function EditItemForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState(searchParams.get("name") || "");
  const [description, setDescription] = useState(searchParams.get("description") || "");
  const [imageUrl, setImageUrl] = useState(searchParams.get("imageUrl") || "");
  const [price, setPrice] = useState(searchParams.get("price") || "");
  const [publishDate, setPublishDate] = useState(searchParams.get("publishDate") || "");
  const [seller, setSeller] = useState(searchParams.get("seller") || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedItem = {
      name,
      description,
      imageUrl,
      price: parseFloat(price),
      publishDate,
      seller,
    };

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white shadow-md rounded">
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
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="input mb-4"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input mb-4"
          required
        />
        <input
          type="datetime-local"
          placeholder="Publish Date"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
          className="input mb-4"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Update Item
        </button>
      </form>
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
