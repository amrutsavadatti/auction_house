"use client"; 
import router from 'next/router';
import { useEffect, useState } from 'react';


interface Item {
    name: string;
    finalSalePrice: number;
    boughtByBuyer: string;
  }
export default function reviewPurchases() {
    const [items, setItems] = useState<Item[]>([]);

    const fetchPurchases = async () => {
        try {
            const response = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/reviewPurchases', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: localStorage.getItem("token")})
            });
        
            if (!response.ok) {
                throw new Error('Failed to fetch purchased items');
            }
            

            const data = await response.json();
            console.log(data.purchases);
            setItems(data.purchases);
            console.log(items + " items");
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        
          fetchPurchases();

      }, [router]);

    return (
        <div className='flex flex-col justify-center '>
            <div className='flex justify-center m-2'>
              <h1><b>Review Purchases</b></h1>
            </div>
            <div className="m-4 bg-accent-content p-4 rounded-xl">
              <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Final Sale Price</th>
                        <th>Bought By Buyer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-700">
                            <td>{index + 1}</td>
                            <td>{item.name }</td>
                            <td>{"$ "+ item.finalSalePrice }</td>
                            <td>{item.boughtByBuyer}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            </div>
        </div>                             
    );
}



