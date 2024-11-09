"use client"; 
import { useRouter } from 'next/navigation';

export default function AccountSelection() {
  const router = useRouter();

  const handleSellerSignIn = () => {
    router.push('/seller/signin');
  };

  const handleBuyerSignIn = () => {
    router.push('/buyer/signin');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center justify-between">

        <div className="flex items-center space-x-4">
           <span className="text-lg">Hey Customer!</span>
         </div>
         <div>
           <button onClick={handleBuyerSignIn} className="btn btn-accent mt-4">Buyer? Click here</button>
         </div>
         <div>
           <button onClick={handleSellerSignIn} className="btn btn-warning mt-4">Seller? Click here</button>
         </div>

        </div>
      </div>
    </div>
  );
}
