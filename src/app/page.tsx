"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    const [loading, setLoading] = useState(false);
    const [minimum, setMinimum] = useState("");
    const [maximum, setMaximum] = useState("");
    const [keyword, setKeyword] = useState("");

    //console.log(error);

    const handleSearchByKeyword = async (e: FormEvent) => {
      e.preventDefault();
      console.log("inside")
      try {
        const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/searchNameDescriptionCustomer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "keyword": keyword})
        });

        if (!response.ok) {
          throw new Error('Failed to search items');
        }

        const data = await response.json();
        setItems(data.items);
        console.log("Number of items:", items.length);
        console.log("First item:", items[0]);  // Log only the first item to inspect its structure

      } catch (error) {
        setError("An unexpected error occurred.");
      }
    };

    const handlePriceByRange = async (e: FormEvent) => {
      e.preventDefault();
      try {
        const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/searchPriceRange', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "lowerBound": minimum, "upperBound": maximum})
        });

        if (!response.ok) {
          throw new Error('Failed to search items');
        }

        const data = await response.json();
        setItems(data.items);
        console.log("Number of items:", items.length);
        console.log("First item:", items[0]);  // Log only the first item to inspect its structure

      } catch (error) {
        setError("An unexpected error occurred.");
      }
    };

    useEffect(() => {

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
      
          fetchItems();

      }, []);
    
      if (loading) return <p>Loading...</p>;
      console.log(items)


    return (
        <div className='flex flex-col justify-center '>

            <div className='flex justify-center m-2'>
              <form onSubmit={handleSearchByKeyword}>
                <input
                  type="text"
                  placeholder="Search By Keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="input mb-4"
                />
                <button type ="submit" className="btn btn-outline btn-warning btn-xs "> search by keyword </button>
              </form>
              <form onSubmit = {handlePriceByRange}>
                <input type="number"
                  placeholder="lowerBound"
                  onChange={(e) => setMinimum(e.target.value)}
                  className="input mb-4"
                  >
                </input>
                <input type="number"
                  placeholder="upperBound"
                  onChange={(e) => setMaximum(e.target.value)}
                  className="input mb-4"
                  >
                </input>
                <button type ="submit" className="btn btn-outline btn-warning btn-xs "> search by price </button>
              </form>
              
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
                            <Link
                              href={{
                                pathname: `/customer/viewItem`,
                                query: {
                                  name: item.name,
                                  description: item.description,
                                  figureimageout: item.figureimageout,
                                  price: item.setPrice,
                                  publishDate: item.publishDate,
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
