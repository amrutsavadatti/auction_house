"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Item {
    name: string;
    description: string;
    figureimageout: string;
    setPrice: number;
    publishDate: string;
    sellerOfItem: string;
    highestBid: number
  }
  

export default function Home() {
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [minimum, setMinimum] = useState("");
    const [maximum, setMaximum] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortType, setSortType] = useState("");
    const router = useRouter();

    console.log(error);

    const handleSort = (type:string) => {
      setSortType(type)
      sort();

    };
    const handleSearch = async (e: FormEvent) => {
      e.preventDefault();
      try {
        const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/searchCustomerCombination', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "keyword" : keyword, "lowerBound": minimum, "upperBound": maximum})
        });

        if (!response.ok) {
          throw new Error('Failed to search items');
        }

        const data = await response.json();
        setItems(data.items);
        console.log("Number of items:", items.length);
        console.log("First item:", items[0]);  // Log only the first item to inspect its structure

      } catch (error) {
        console.log(error);
        setError("An unexpected error occurred.");
      }
    };

    const handleFunds = () => {
      router.push("/buyer/funds");
    };

    const handleActiveBids = () => {
      router.push("/buyer/reviewActiveBids");
    };

    const sort = async () => {
      try {
        const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/sortItemsCustomer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "sorter" : sortType})
        });

        if (!response.ok) {
          throw new Error('Failed to sort items');
        }

        const data = await response.json();
        setItems(data.items);
        console.log("Number of items:", items.length);
        console.log("First item:", items[0]);  // Log only the first item to inspect its structure

      } catch (error) {
        console.log(error);
        setError("An unexpected error occurred.");
      }
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
              console.log("First item:", items[0]);  // Log only the first item to inspect its structure

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
                            <button className="btn btn-outline btn-warning btn-xs ">view item</button>
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
