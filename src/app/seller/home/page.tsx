"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "../../components/LogoutButton";
import Link from "next/link";

interface Item {
    name: string;
    description: string;
    figureimageout: string;
    setPrice: number;
    publishDate: string;
    status: string;
  }
  

export default function SellerHomePage() {
    const [items, setItems] = useState<Item[]>([]);
    const [unpublishableItems, setUnpublishableItems] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    console.log(error);

    const handleAddItem = () => {
      router.push("/seller/item");
    };

    const handleClose = () => {
      router.push("/seller/close");
    };

    const handlePublish = async (iName: string) => {
      try {
        const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/publishItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             itemName: iName,
             seller: localStorage.getItem("token")})
        });

        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        fetchItems();
        findUnpublish();
        
      } catch (error) {
        console.error(error);
        setError("An unexpected error occurred.");
      }
    };

    const handleRemove = async (iName:string) => {
      try {
        const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/removeInactiveItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             itemName: iName,
             seller: localStorage.getItem("token")})
        });

        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        fetchItems();
        findUnpublish();
        
      } catch (error) {
        console.error(error);
        setError("An unexpected error occurred.");
      }
    };

    const findUnpublish = async () => {
      try {
        const response = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/getUnpublishableItems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch unpublishable items');
        }
        
    
        const data = await response.json();
        console.log(data);
        setUnpublishableItems(data.unpublishable.map(item => item.name));
        console.log(unpublishableItems.includes("nobids"));
        console.log(unpublishableItems.includes("active2"));
        //console.log(unpublishItems);
        //setUnpublishableItems(unpublishItems);
        console.log("Unpublishable items: ", unpublishableItems);

      } catch (error) {
        console.error(error);
        setError("An unexpected error occurred.");
        setUnpublishableItems([]);
      }
    };

    const handleUnpublishItem =  async(iName:string) => {
      try {
        const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/unpublishItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemName: iName,
            seller: localStorage.getItem("token")
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch unpublishable items');
        }
        else{
          findUnpublish();
        }
        fetchItems();
        
      } catch (error) {
        console.error(error);
        setError("An unexpected error occurred.");
      }
    };

    const handleArchive = async (iName:string) => {
      try {
        const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/archiveItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemName: iName,seller: localStorage.getItem("token")})
        });

        if (!response.ok) {
          throw new Error('Failed to fetch unpublishable items');
        }
        else{
          findUnpublish();
        }
        fetchItems();
        
      } catch (error) {
        console.error(error);
        setError("An unexpected error occurred.");
      }
    }

    const fetchItems = async () => {
      try {
        const response = await fetch(' https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/reviewItems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ seller: localStorage.getItem("token")})
        });

        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }

        const data = await response.json();
        setItems(data.items);
        console.log(items + " items");
      } catch (error) {
        console.error(error);
        setError("An unexpected error occurred.");
      }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/seller/signin");
        } else {
          setLoading(false);
        }
      
          fetchItems();
          findUnpublish();

      }, [router]);
    
      if (loading) return <p>Loading...</p>;
      console.log(items)


    return (
        <div className='flex flex-col justify-center '>

            <div className='flex justify-center m-2'>
              <button onClick={handleAddItem} className="btn btn-primary">Add Items</button>
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
                      <th>Status</th>
                      <th>Listing Date</th>
                      <th>Actions</th>
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
                            {item.status}
                          <br />
                          </td>
                          <td>{item.publishDate}</td>
                          <th>
                            <Link
                              href={{
                                pathname: `/seller/editItem`,
                                query: {
                                  name: item.name,
                                  description: item.description,
                                  imageUrl: item.figureimageout,
                                  price: item.setPrice,
                                  publishDate: item.publishDate,
                                },
                              }}
                            >
                              <button className="btn btn-outline btn-warning btn-xs ">Edit</button>
                            </Link>
                          </th>
                          <th>
                            <button className={`btn btn-outline btn-success btn-xs ${item.status !== "inactive" ? "btn-disabled" : ""}`} onClick = {() => handlePublish(item.name)} >Publish</button>
                          </th>

                          <th>
                            <button className={`btn btn-outline btn-error btn-xs ${item.status !== "inactive" ? "btn-disabled" : ""}`} onClick = {() => handleRemove(item.name)} >Remove</button>
                          </th>
                          <th>
                          <button 
                            className={`btn btn-outline btn-success btn-xs ${!unpublishableItems.includes(item.name) ? "btn-disabled" : ""}`}
                            onClick={() => handleUnpublishItem(item.name)}>
                            Unpublish
                          </button>
                          </th>
                          <th>
                            <button className={`btn btn-outline btn-error btn-xs ${item.status !== "inactive" ? "btn-disabled" : ""}`}  onClick = {() => handleArchive(item.name)} >Archive</button>
                          </th>
                      </tr>
                      ))}
                  </tbody>
                  </table>
              </div>
            </div>
            <div className="flex justify-between m-4">
              <div className="m-2">
                  <button onClick={handleClose} className="btn btn-error">Close Account</button>
              </div>

              <div >
                <LogoutButton />
              </div>
            </div>
        </div>
    );
}
