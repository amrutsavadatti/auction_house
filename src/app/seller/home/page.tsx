"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "../../components/LogoutButton";
import Link from "next/link";

interface Item {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    publishDate: string;
  }

export default function SellerHomePage() {
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    console.log(error);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/seller/signin");
        } else {
          setLoading(false);
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
              console.error(error);
              setError("An unexpected error occurred.");
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
                <a href="/seller/item">Add items</a>
              </div>

            <div>
                <LogoutButton />
            </div>


            <div className="overflow-x-auto">
                <table className="table w-full">
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
                                // alt={`${item.name} image`}
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
                        {localStorage.getItem("token")}
                        <br />
                        </td>
                        <td>{item.publishDate}</td>
                        <th>
                          <Link
                            href={{
                              pathname: `/seller/editItem`,
                              query: {
                                name: item.name,
                                description: item.description,
                                imageUrl: item.imageUrl,
                                price: item.price,
                                publishDate: item.publishDate,
                              },
                            }}
                          >
                            <button className="btn btn-ghost btn-xs">edit</button>
                          </Link>
                        </th>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}
