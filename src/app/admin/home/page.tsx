"use client"; 
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SoldItem {
  itemName: string;
  salePrice: number;
  commision: number;
}

export default function AdminHome() {
  const router = useRouter();
  const [items, setItems] = useState<SoldItem[]>([]);
  const [sum, setSum] = useState<number>(0);

  const handleActiveItems = () => {
    router.push('/admin/activeItems');
  };

  const handleFrozenItems = () => {
    router.push('/admin/frozenItems');
  };

  const handleAuctionReport = () => {
    router.push('/admin/auctionReport');
  };

  const handleForensicsReport = () => {
    router.push('/admin/forensicsReport');
  };

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
        
        generateAuctionReport();

    }, [router]);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card bg-neutral text-neutral-content w-400">
        <div className="card-body items-center text-center justify-between">

        <div className="flex items-center space-x-4">
           {/* <span className="text-lg">Hey {localStorage.getItem("token")}!</span> */}
           <span className="text-lg">Hey Admin!</span>
         </div>

         <div className="flex w-full">
            <div className="card bg-base-300 rounded-box grid h-20 w-80 flex-grow place-items-center">
                <button onClick={handleActiveItems} className="btn btn-primary h-full w-full">List of Active Items</button>
            </div>

            <div className="divider divider-horizontal">-</div>

            <div className="card bg-base-300 rounded-box grid h-20 w-80 flex-grow place-items-center">
                <button onClick={handleFrozenItems} className="btn btn-primary h-full w-full">List of Frozen Items</button>
            </div>
        </div>

        <br/>

         <div className="flex w-full">
            <div className="card bg-base-300 rounded-box grid h-20 w-80 flex-grow place-items-center">
                <button onClick={handleAuctionReport} className="btn btn-info h-full w-full">Generate Auction Report</button>
            </div>

            <div className="divider divider-horizontal">-</div>

            <div className="card bg-base-300 rounded-box grid h-20 w-80 flex-grow place-items-center">
                <button onClick={handleForensicsReport} className="btn btn-info h-full w-full">Generate Forensics Report </button>
            </div>
        </div>
           
         <div>
            <span className="badge badge-ghost mt-4 rounded-box"> My Funds: ${sum}</span>
         </div>

        </div>
      </div>
    </div>
  );
}

