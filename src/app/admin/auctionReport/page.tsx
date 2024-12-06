"use client"; 
import { useRouter } from 'next/navigation';
import router from 'next/router';
import { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton';


interface SoldItem {
    itemName: string;
    salePrice: number;
    commision: number;
  }
export default function auctionReport() {
    const [items, setItems] = useState<SoldItem[]>([]);
    const [sum, setSum] = useState<number>(0);

    const generateAuctionReport = async () => {
        try {
            const response = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/generateAuctionReport', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({placeholder:"placeholder"})
            });
        
            if (!response.ok) {
                throw new Error('Failed to fetch auction items');
            }
            

            const data = await response.json();
            console.log(data.items);
            setItems(data.items);
            console.log(items + " items");
            let sumOfCommissionValues = 0;
            for (const i of data.items) {
                console.log(`commission: ${i.commision}`);
                sumOfCommissionValues += i.commision;
            }
            setSum(sumOfCommissionValues);
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        //const commissions = items.map((item) => item.commision);
        
        //setCommissionValues(commissions);
        
          generateAuctionReport();

      }, [router]);

    return (
        <div className='flex flex-col justify-center '>
            <div className='flex justify-center m-2'>
              <h1><b>Auction Report</b></h1>
            </div>
            <h3><b>Auction House Commission Value: ${sum}</b></h3>
            <div className="m-4 bg-accent-content p-4 rounded-xl">
              <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Sale Price</th>
                        <th>Commission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-700">
                            <td>{index + 1}</td>
                            <td>{item.itemName }</td>
                            <td>{"$ "+ item.salePrice }</td>
                            <td>{"$ "+ item.commision}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            </div>
        </div>                             
    );
}



