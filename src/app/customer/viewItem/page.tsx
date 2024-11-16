"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React,{ Suspense } from "react";

function ViewItemContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const description = searchParams.get("description") || "";
  const image = searchParams.get("figureimageout") || "";
  const price = searchParams.get("price") || "";


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

export default function ViewItem() {
  <Suspense fallback = {<div></div>}>
    <ViewItemContent/>
  </Suspense>
}