"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function EditItemForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const [description, setDescription] = useState(searchParams.get("description") || "");
  // const [image, setImage] = useState(searchParams.get("imageUrl") || "");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [price, setPrice] = useState(searchParams.get("price") || "");

  

  const obtainURL = async (file: File) => {
    try {
      const res = await fetch("https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/uploadImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: `{"fileName":"${file.name}","fileType":"${file.type}"}`
        })
      });

      const data = await res.json();
      console.log(JSON.parse(data.body));
      const myURL = JSON.parse(data.body);
      return myURL;
    } catch (error) {
      console.error("Error obtaining image URL:", error);
      alert("An error occurred. Please try again.");
      return null
    }
  }

    const handleImageUploadEdit = async (file: File, uploadURL: string) => {
      if (!name || !file) return;

      await fetch(uploadURL, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file,
      });

      return uploadURL.split('?')[0]; 
  };


  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    const imageURLs = await Promise.all(
      imageFiles.map(async (file) => {
        const getImageURL = await obtainURL(file);
        return await handleImageUploadEdit(file, getImageURL);
      })
    )

    const updatedItem = {
      name,
      description,
      image:imageURLs[0],
      setPrice: parseFloat(price)
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
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setImageFiles(imageFiles.concat(Array.from(e.target.files)));
                  }
                }}
              />
              <label className="mb-4">Description: </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea mb-4"
                required
              />
            {/*<label>Image: </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input mb-4"
              required
            />*/}
            <label>Price: </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
