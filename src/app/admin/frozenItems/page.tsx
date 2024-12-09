"use client";

import { useEffect, useState } from "react";

interface Item {
    name: string;
    description: string;
    figureimageout: string;
    setPrice: number;
    publishDate: string;
    sellerOfItem: string
  }
  

export default function Home() {
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState<string | null>(null);

    console.log(error);

    const handleUnfreezeItem = async (iSeller: string, iName: string) => {
      try {
        const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/unfreezeItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ seller: iSeller, name: iName })
        });

        if (!response.ok) {
          throw new Error('Failed to unfreeze item');
        }
        
      } catch (error) {
        console.error(error);
        setError("An unexpected error occurred.");
      }

      fetchItems();
      
    }

    const fetchItems = async () => {
      try {
        const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/getFrozenItems', {
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


    useEffect(() => {
      
          fetchItems();

      }, []);
    

      console.log(items)


    return (
        <div className='flex flex-col justify-center '>
            <h1 style={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: '40px'}}>List of Frozen Items</h1>

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
                            { item.sellerOfItem }
                          <br />
                          </td>
                          <td>{ item.publishDate }</td>
                          <th>
                              <button className="btn btn-outline btn-info btn-xs " onClick = {() => handleUnfreezeItem(item.sellerOfItem, item.name)} >unfreeze item</button>
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
