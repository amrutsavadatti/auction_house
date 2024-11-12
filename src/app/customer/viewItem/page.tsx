"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ViewItem() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const [description, setDescription] = useState(searchParams.get("description") || "");
  const [image, setImage] = useState(searchParams.get("figureimageout") || "");
  const [price, setPrice] = useState(searchParams.get("price") || "");

  // Format publish date to "YYYY-MM-DDTHH:MM"
  const formatDateTime = (dateString:string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [startDate, setStartDate] = useState(formatDateTime(searchParams.get("publishDate") || ""));
  



  const handleBack = async (e:React.FormEvent) => {
    e.preventDefault();

    router.push("/");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body flex-col items-center text-center justify-between">
            <h2 className="card-title">{name}</h2>
            <h4 className="mb-4">Description: {description}</h4>
            <h4 className="mb-4">Set Price: {price}</h4>
            <div>
            <img
                src={image}
                className="object-cover"
            />
        </div>
        <button onClick={handleBack} className="btn btn-primary w-full">
            Back
        </button>
        </div>
      </div>
    </div>
  );
}

