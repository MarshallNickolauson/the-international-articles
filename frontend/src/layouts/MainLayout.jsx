import React, { useEffect } from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';

const MainLayout = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    useEffect(() => {
        document.body.style.backgroundColor = isDarkMode ? '#252825' : '#ffffff';
    }, [isDarkMode]);

    return (
        <div className={`${isDarkMode ? 'bg-_252825' : 'bg-white'} transition-all duration-200`}>
            <Header />
            <div className='px-4'>
                <div className='max-w-[1450px] mx-auto pb-[500px]'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default MainLayout;
