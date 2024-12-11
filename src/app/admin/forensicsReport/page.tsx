"use client"; 
import router from 'next/router';
import { useEffect, useState } from 'react';

interface Item {
    name: string
    figureimageout: string
    setPrice: number
    finalSalePrice: number
    sellerOfItem: string
    boughtByBuyer: string
}

export default function AuctionReport() {
    const [mean, setMean] = useState("");
    const [median, setMedian] = useState("");
    const [mFrequency, setModeFrequency] = useState("");
    const [mFinalSalePrice, setModePrice] = useState("");
    const [top3, setTop3] = useState<Item[]>([]);

    const generateForensicsReport = async () => {
        try {
            const response = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/generateForensicsReport', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({placeholder:"placeholder"})
            });
        
            if (!response.ok) {
                throw new Error('Failed to fetch forensics content');
            }
            

            const data = await response.json();
            console.log(data)
            setMean(data.mean)
            setMedian(data.median)
            setModeFrequency(data.mode[0].Frequency)
            setModePrice(data.mode[0].finalSalePrice)
            console.log(data.mode)
            setTop3(data.top)
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        
          generateForensicsReport();

      }, [router]);

    return (
        <div className='flex flex-col justify-center '>
            <div className='flex justify-center m-2'>
            <h1><b>Forensics Report</b></h1>
            </div>

            <div className="m-4 bg-accent-content p-4 rounded-xl">
                <h2><b>Final Sale Price Statistics</b></h2>
                <p>----------------------------</p>
                <div className="overflow-x-auto"></div>
                <h3><b>Mean: ${mean}</b></h3>
                <h3><b>Median: ${median}</b></h3>
                <h3><b><u>Mode</u></b></h3>
                <h3>Final Sale Price- ${mFinalSalePrice} <br/> Frequency - {mFrequency}</h3>
            </div>


            <div className="m-4 bg-accent-content p-4 rounded-xl">
              <div className="overflow-x-auto">
                <h1><b>Top 3 Items By Sale Price</b></h1>
                <p>---------------------------</p>
                <table className="table w-full">
                    <thead>
                        <tr>
                        <th></th>
                        <th>Item Name</th>
                        <th>Set Price</th>
                        <th>Final Sale Price</th>
                        <th>Seller of Item</th>
                        <th>Bought By Buyer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {top3.map((item, index) => (
                        <tr key={index} className="border-b border-gray-700">
                            <td>{index + 1}</td>
                            <td>{item.name }</td>
                            <td>{"$ " + item.setPrice}</td>
                            <td>{"$ " + item.finalSalePrice }</td>
                            <td>{item.sellerOfItem}</td>
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



