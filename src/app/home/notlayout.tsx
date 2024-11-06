import { ReactNode } from "react";
import { SigninButton } from "../components/SigninButton";

interface LayoutProps {
  children: ReactNode;
}
 
export default function HomeLayout({ children }:  LayoutProps ) {
  
  return (
    <div>

      <nav>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
            </div>
            <a className="btn btn-ghost text-xl">Fortran Auction 🏠</a>
          </div>

          <SigninButton />
          {/* <div className="navbar-end">
          </div> */}
        </div>
      </nav>

      <main className="p-4 flex items-center justify-center">
        {children}
      </main>

    </div>
    
  );
}