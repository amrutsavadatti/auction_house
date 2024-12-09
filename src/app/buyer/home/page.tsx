"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Item {
    name: string;
    description: string;
    figureimageout: string;
    setPrice: number;
    publishDate: string;
    sellerOfItem: string;
    highestBid: number;
    buyNow: number;
  }
  

export default function Home() {
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    console.log(error);


    const handleActiveBids = () => {
      router.push("/buyer/reviewActiveBids");
    };

    const handleReviewPurchases = () => {
      router.push("/buyer/reviewPurchases");
    };

    const handleFunds = () => {
      router.push("/buyer/funds");
    };

    const recentlySoldItems = () => {
      router.push("/buyer/recentlySoldItems");
    };



    useEffect(() => {
      const checkforCompletedItem = async () => {
        try {
          const response = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/completion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
          });
  
          if (!response.ok) {
            throw new Error('Failed to check for completed items');
          }
        } catch (error) {
          console.error(error);
          setError("An unexpected error occurred.");
        }
      };

        const fetchItems = async () => {
            try {
              const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/getActiveItemsCustomer', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "placeholder": "placeholder"})
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch items');
              }
      
              const data = await response.json();
              setItems(data.items);
              console.log("Number of items:", items.length);
              console.log("First item:", items[0]);

            } catch (error) {
              console.error(error);
              setError("An unexpected error occurred.");
            }
          };

          checkforCompletedItem();
      
          fetchItems();

      }, []);
    

      console.log(items)


    return (
        <div className='flex flex-col justify-center '>

          <div className='flex justify-between'>
            <div className='flex justify-center m-2'>
              <button onClick={handleActiveBids} className="btn btn-success">Active Bids</button>
            </div>

            <div className='flex justify-center m-2'>
              <button onClick={handleReviewPurchases} className="btn btn-info">Review Purchases</button>
            </div>

            <div className='flex justify-center m-2'>
              <button onClick={recentlySoldItems} className="btn btn-info">Recently Sold Items</button>
            </div>

            <div className='flex justify-center m-2'>
              <button onClick={handleFunds} className="btn btn-warning">Add Funds</button>
            </div>

          </div>
          
          
          <div className="m-4 bg-accent-content p-4 rounded-xl">
              <div className="overflow-x-auto">
                  <table className="table w-full">
                  <thead>
                      <tr>
                      <th>
                          <label>
                          </label>
                      </th>
                      <th>Item Name</th>
                      <th>Price</th>
                      <th>Current Highest Bid</th>
                      <th>Seller</th>
                      <th>Listing Date</th>
                      <th>Action</th>
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
                                    src={item.figureimageout}
                                    onClick={() => {console.log(item.figureimageout + "##")}}
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
                            {"$ "+item.setPrice}
                          <br />
                          </td>
                          <td>
                            {"$ " + item.highestBid}
                          <br />
                          </td>
                          <td>
                            { item.sellerOfItem }
                          <br />
                          </td>
                          <td>{ item.publishDate }</td>
                          <th>
                            <Link
                              href={{
                                pathname: `/buyer/bid`,
                                query: {
                                  name: item.name,
                                  description: item.description,
                                  figureimageout: item.figureimageout,
                                  price: item.setPrice,
                                  publishDate: item.publishDate,
                                  sellerOfItem: item.sellerOfItem,
                                  buyNow: item.buyNow
                                },
                              }}
                            >
                              <button className="btn btn-outline btn-warning btn-xs ">view item</button>
                            </Link>
                          </th>
                      </tr>
                      ))}
                  </tbody>
                  </table>
              </div>
            </div>
        </div>
    );
}
