import { useState } from 'react';
import { FaBookAtlas } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { IoIosArrowDropdown } from 'react-icons/io';

function Header() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const navItemUnderline = `hover:cursor-pointer border-b-2 pb-1 border-b-transparent hover:border-b-mainWhite transition-all duration-100`;

    return (
        <>
            <nav className='top-0 w-full bg-darkGreen py-3 px-4 flex justify-center'>
                <div className='flex justify-between w-full max-w-[1450px]'>
                    <div
                        className='flex space-x-3 hover:cursor-pointer'
                        onClick={() => navigate('/')}
                    >
                        <div>
                            <FaBookAtlas size={40} color='white' />
                        </div>
                        <h1 className='font-poppins font-bold tracking-wide text-white flex items-center text-3xl'>
                            The International Articles
                        </h1>
                    </div>
                    <div className='font-opensans flex space-x-5 text-white items-center'>
                        <Link
                            to='/login'
                            className='bg-white text-darkGreen font-semibold px-4 py-2 rounded-[8px] hover:bg-gray-200 transition-all duration-100'
                        >
                            Sign In
                        </Link>
                        <h1 to='/' className={navItemUnderline}>
                            Menu
                        </h1>
                    </div>
                </div>
            </nav>
            <nav className='w-full px-4 py-4 border border-b-2 border-gray-300'>
                <div className='flex mx-auto max-w-[1450px] justify-between items-center'>
                    <div className='flex space-x-10 items-center'>
                        <Link
                            to='/'
                            className='text-darkExpansion text-lg hover:underline'
                        >
                            Dashboard
                        </Link>
                        <Link
                            to='/articles'
                            className='text-darkExpansion text-lg hover:underline'
                        >
                            Articles
                        </Link>
                        <div className='flex items-center py-1 px-4 border-[1px] border-gray-300 rounded-[8px] hover:cursor-pointer hover:opacity-80'>
                            <h1
                                to='/articles'
                                className='text-darkExpansion text-lg'
                            >
                                Language
                            </h1>
                            <IoIosArrowDropdown className='ml-2 text-2xl text-darkExpansion' />
                        </div>
                    </div>
                    <div className='relative'>
                        <IoIosSearch
                            className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
                            size={20}
                        />
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search...'
                            className='border border-gray-300 font-opensans text-darkExpansion rounded-[8px] py-2 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 w-[600px] placeholder:italic'
                        />
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
