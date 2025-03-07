import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="px-4">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};
export default MainLayout;
