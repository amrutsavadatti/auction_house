"use client";

import { useEffect, useState } from "react";

interface Bid {
    itemName: string;
    value: number;
  }
  

export default function Home() {
    const [bids, setBids] = useState<Bid[]>([]);
    const [error, setError] = useState<string | null>(null);

    console.log(error);



    useEffect(() => {

        const fetchBids = async () => {
            try {
              const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/reviewActiveBids', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "email": localStorage.getItem("token")})
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch bids');
              }
              console.log("TOKEN: ", localStorage.getItem("token"));
      
              const data = await response.json();
              setBids(data.itemNames);
              console.log("Number of bids:", bids.length);
              console.log("First bid:", bids[0]);  

            } catch (error) {
              console.error(error);
              setError("An unexpected error occurred.");
            }
          };
      
          fetchBids();

      }, []);
    

      //console.log(items)


    return (
        <div className='flex flex-col justify-center '>
            <h1 style={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: '40px'}}>List of Active Bids</h1>

            <div className="m-4 bg-accent-content p-4 rounded-xl">
              <div className="overflow-x-auto">
                  <table className="table w-full">
                  <thead>
                      <tr>
                        <th></th>
                        <th>Item Name</th>
                        <th>Bid Value</th>
                      </tr>
                  </thead>

                  <tbody>
                      {bids.map((bid, index) => (
                      <tr key={index} className="border-b border-gray-700">
                          <th>
                            <label>
                                <h2>{index + 1}</h2>
                            </label>
                          </th>
                          <td>
                            <div className="font-bold">{bid.itemName}</div>
                          </td>
                          <td>
                            {"$ "+bid.value}
                          <br />
                          </td>
                      </tr>
                      ))}
                  </tbody>
                  </table>
              </div>
            </div>
        </div>
    );
}
