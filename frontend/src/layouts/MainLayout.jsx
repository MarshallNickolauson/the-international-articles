import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';

const MainLayout = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <div className={`${isDarkMode ? 'bg-_252825' : 'bg-white'} transition-all duration-200 pb-[1000px]`}>
            <Header />
            <div className='px-4'>
                <div className='max-w-[1450px] mx-auto '>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default MainLayout;
