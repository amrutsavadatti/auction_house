"use client";
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleSellerSignIn = () => {
    router.push('/seller/signin');
  };

  const handleBuyerSignIn = () => {
    router.push('/buyer/signin');
  };

  return (
    <div>
      <div className="navbar text-neutral-content justify-center bg-black">
        <a className="btn btn-ghost text-2xl font-bold">Fortnet Auction House 🏠</a>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-lg">Hey Customer!</span>
          <a className="btn bg-primary">Sign in</a>
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
