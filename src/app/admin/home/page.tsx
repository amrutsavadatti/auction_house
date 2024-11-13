"use client"; 
import { useRouter } from 'next/navigation';

export default function AdminHome() {
  const router = useRouter();

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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card bg-neutral text-neutral-content w-400">
        <div className="card-body items-center text-center justify-between">

        <div className="flex items-center space-x-4">
           {/* <span className="text-lg">Hey {localStorage.getItem("token")}!</span> */}
           <span className="text-lg">Hey!</span>
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
            <span className="badge badge-ghost mt-4 rounded-box"> Insert Admin Funds Here</span>
         </div>

        </div>
      </div>
    </div>
  );
}
