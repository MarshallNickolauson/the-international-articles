import { useState, useEffect, useRef } from 'react';
import { FaBookAtlas } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSearch, IoIosArrowDropdown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../features/language/languageSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const language = useSelector((state) => state.language.language);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isLanguageLoading, setIsLanguageLoading] = useState(false);

    const dropdownRef = useRef(null);

    const languages = ['English', 'Spanish', 'French', 'German', 'Portuguese'];

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        setIsLanguageLoading(true);
        if (language) {
            setSelectedLanguage(language);
        }
        setIsLanguageLoading(false);
    }, [language, dispatch])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectLanguage = (lang) => {
        dispatch(changeLanguage(lang));
        setSelectedLanguage(lang);
        setIsDropdownOpen(false);
    }

    return (
        <>
            <nav className='top-0 w-full bg-darkGreen py-3 px-4 flex justify-center'>
                <div className='flex justify-between w-full max-w-[1450px]'>
                    <div
                        className='flex space-x-3 hover:cursor-pointer'
                        onClick={() => navigate('/')}
                    >
                        <FaBookAtlas size={40} color='white' />
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
                        <h1 className='hover:cursor-pointer border-b-2 pb-1 border-b-transparent hover:border-b-mainWhite transition-all duration-100'>
                            Menu
                        </h1>
                    </div>
                </div>
            </nav>
            <nav className='w-full px-4 py-4 border border-b-[1px] border-gray-300'>
                <div className='flex mx-auto max-w-[1450px] justify-between items-center'>
                    <div className='flex space-x-10 items-center'>
                        <Link to='/' className='text-darkExpansion text-lg hover:underline'>
                            Dashboard
                        </Link>
                        <Link to='/articles' className='text-darkExpansion text-lg hover:underline'>
                            Articles
                        </Link>
                        <div className='relative' ref={dropdownRef}>
                            <div
                                className='flex items-center py-1 px-4 border-[1px] border-gray-300 rounded-[8px] hover:cursor-pointer hover:border-gray-400'
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <h1 className={`text-darkExpansion text-lg ${isLanguageLoading ? 'opacity-0' : 'opacity-100'}`}>{selectedLanguage}</h1>
                                <IoIosArrowDropdown className='ml-2 text-2xl text-darkExpansion' />
                            </div>
                            {isDropdownOpen && (
                                <ul className='absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-[8px] shadow-lg transition-all duration-200'>
                                    {languages.map((lang, index) => (
                                        <li
                                            key={index}
                                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                            onClick={() => selectLanguage(lang)}
                                        >
                                            {lang}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className='relative'>
                        <IoIosSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
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
