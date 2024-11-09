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

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState('');

    const handleImageUpload = async () => {
      if (!name || !imageFile) return;

      const response = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/generateUploadURL?itemName=${name}');
      const { uploadURL } = await response.json();

      await fetch(uploadURL, {
          method: 'PUT',
          headers: { 'Content-Type': imageFile.type },
          body: imageFile,
      });

      setImageURL(uploadURL.split('?')[0]); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postBody = {
      name,
      description,
      image,
      setPrice,
      startDate,
      endDate,
      sellerOfItem:localStorage.getItem("token"),
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center justify-between">
          <h2 className="card-title">Add Item</h2>

          <div className="flex flex-col p-2 m-2">
           
            <input
                type="file"
                onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            />
            <button onClick={handleImageUpload}>Upload Item</button>

            {imageURL && <img src={imageURL} alt={name} />}

          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md p-4 rounded">
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
            <button type="submit" className="btn btn-accent w-full">
              Submit
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
