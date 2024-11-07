"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "../../components/LogoutButton";

interface Item {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    publishDate: string;
    seller: string;
    status: string;
  }

export default function SellerHomePage() {
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/seller/signin");
        } else {
          setLoading(false); // Proceed to show content if logged in
        }

        const fetchItems = async () => {
            try {
              const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/reviewItems', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ seller: localStorage.getItem("token")})
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch items');
              }
      
              const data = await response.json();
              setItems(data.items);
            } catch (error) {
              setError('Could not fetch items.');
              console.error(error);
            }
          };
      
          fetchItems();

      }, [router]);
    
      if (loading) return <p>Loading...</p>;


    return (
        <div className='flex flex-col justify-center '>
            <div className="bg-accent m-2">
                <a href="/seller/close">Close account</a>
                
            </div>
            <div className='m-2'>
            <a href="/seller/item">items</a>
            </div>
            <div>
                <LogoutButton />
            </div>


            <div className="overflow-x-auto">
                <table className="table w-full">
                {/* Table Header */}
                <thead>
                    <tr>
                    <th>
                        <label>
                        </label>
                    </th>
                    <th>Item Name</th>
                    <th>Seller</th>
                    <th>Listing Date</th>
                    <th></th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700">
                        <th>
                        <label>
                            <h2>{index + 1}</h2>
                        </label>
                        </th>
                        <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                src={item.imageUrl}
                                alt={`${item.name} image`}
                                className="object-cover"
                                />
                            </div>
                            </div>
                            <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-sm opacity-50">{item.description}</div>
                            </div>
                        </div>
                        </td>
                        <td>
                        {item.seller}
                        <br />
                        <span className="badge badge-ghost badge-sm">{item.status}</span>
                        </td>
                        <td>{item.publishDate}</td>
                        <th>
                        <button className="btn btn-ghost btn-xs">details</button>
                        </th>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}
