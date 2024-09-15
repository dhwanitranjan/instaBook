import LeftSidebar from "@/components/LeftSidebar";
import Topbar from "@/components/Topbar";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet />
      </section>
    </div>
  );
};

export default AuthLayout;
