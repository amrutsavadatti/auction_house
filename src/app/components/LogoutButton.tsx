"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

const LogoutButton: FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/home");
  };

  return (
    <button className="btn btn-outline btn-warning" onClick={handleLogout} style={{ cursor: "pointer" }}>
      Logout
    </button>
  );
};

export default LogoutButton;
