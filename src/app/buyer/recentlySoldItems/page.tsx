"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Item {
    name: string;
    description: string;
    figureimageout: string;
    finalSalePrice: number;
    boughtByBuyer: string;
    sellerOfItem: string;
    publishDate: string;
    expirationDate: string;
    highestBid: number
  }
export default function RecentlySoldItems(){

    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [minimum, setMinimum] = useState("");
    const [maximum, setMaximum] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortType, setSortType] = useState("");

    const handleSortAsc = (type:string) => {
        setSortType(type)
        console.log(sortType)
        sortAsc();
  
      };

      const handleSortDesc = (type:string) => {
        setSortType(type)
        sortDesc();
  
      };
      const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        try {
          const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/searchRecentlySold', {
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
          console.log("First item:", items[0]);
  
        } catch (error) {
          console.log(error);
          setError("An unexpected error occurred.");
        }
      };

      const sortAsc = async () => {
        try {
          const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/sortRecentlySoldAscending', {
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
          console.log("First item:", items[0]);
  
        } catch (error) {
          console.log(error);
          setError("An unexpected error occurred.");
        }
      };

      const sortDesc = async () => {
        try {
          const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/sortRecentlySoldDesc', {
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
          console.log("First item:", items[0]);
  
        } catch (error) {
          console.log(error);
          setError("An unexpected error occurred.");
        }
      };



      useEffect(() => {
  
          const getRecentlySoldItems = async () => {
              try {
                const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/getRecentlySoldItems', {
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
        
            getRecentlySoldItems();
  
        }, []);

        return (
            <div className='flex flex-col justify-center '>

                <div className='flex justify-center m-2'>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Keyword"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="input mb-4"
                        />
                        <input type="number"
                        placeholder="lowerBound"
                        onChange={(e) => setMinimum(e.target.value)}
                        className="input mb-4"
                        />
                        <input type="number"
                        placeholder="upperBound"
                        onChange={(e) => setMaximum(e.target.value)}
                        className="input mb-4"
                        />
                        
                        <button type ="submit" className="btn btn-outline btn-xs "> search </button>
                    </form>

                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="btn btn-outline btn-xs m-3" style={{ minWidth: "120px" }}>ascending sort</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a className="btn btn-outline btn-xs mt-2"onClick={() => handleSortAsc("finalSalePrice")}>final sale price</a></li>
                        <li><a className="btn btn-outline btn-xs mt-2" onClick={() => handleSortAsc("publishDate")}>publish date</a></li>
                        <li><a className="btn btn-outline btn-xs mt-2" onClick={() => handleSortAsc("expirationDate")}>expiration date</a></li>
                        </ul>
                    </div>

                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="btn btn-outline btn-xs m-3" style={{ minWidth: "120px" }}>descending sort</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a className="btn btn-outline btn-xs mt-2"onClick={() => handleSortDesc("finalSalePrice")}>final sale price</a></li>
                        <li><a className="btn btn-outline btn-xs mt-2" onClick={() => handleSortDesc("publishDate")}>publish date</a></li>
                        <li><a className="btn btn-outline btn-xs mt-2" onClick={() => handleSortDesc("expirationDate")}>expiration date</a></li>
                        </ul>
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
                        <th>Final Sale Price</th>
                        <th>Seller</th>
                        <th>Buyer</th>
                        <th>Publish Date</th>
                        <th>Expiration Date</th>
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
                                {"$ "+item.finalSalePrice}
                            <br />
                            </td>
                            <td>
                                { item.sellerOfItem }
                            <br />
                            </td>
                            <td>{ item.boughtByBuyer }</td>
                            <td>{ item.publishDate }</td>
                            <td>{ item.expirationDate }</td>
                            <th>
                                <Link
                                href={{
                                    pathname: `/buyer/viewBidHistory`,
                                    query: {
                                    name: item.name,
                                    description: item.description,
                                    figureimageout: item.figureimageout,
                                    finalSalePrice: item.finalSalePrice,
                                    boughtByBuyer: item.boughtByBuyer,
                                    sellerOfItem: item.sellerOfItem
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