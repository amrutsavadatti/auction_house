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
    <div className="card bg-base-100 w-96 h-70 shadow-xl flex items-center justify-center">
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-lg">Hey Customer!</span>
        </div>
        <div>
          <button onClick={handleBuyerSignIn} className="btn bg-primary mt-4">Buyer? Click here</button>
        </div>
        <div>
          <button onClick={handleSellerSignIn} className="btn bg-secondary mt-4">Seller? Click here</button>
        </div>
      </div>
    </div>
  );
}
