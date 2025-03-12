import dock from '../assets/dock.png';
import { FiPrinter } from 'react-icons/fi';
import { CiShare1 } from 'react-icons/ci';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaPinterest } from 'react-icons/fa';
import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { changeSecondaryLanguage } from '../slices/language/languageSlice';
import { useParams } from 'react-router-dom';
import { useGetArticleByIdQuery } from '../slices/article/articleApiSlice';

const ArticleScreen = () => {
    const dispatch = useDispatch();

    const { id } = useParams();

    const socialSize = 45;
    const socialClass =
        'hover:cursor-pointer transform transition-all duration-150 hover:scale-[1.08]';

    const language = useSelector((state) => state.language.language);
    const [isSecondaryLangVisible, setisSecondaryLangVisible] = useState(false);
    const secondaryLanguage = useSelector(
        (state) => state.language.secondaryLanguage
    );
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    useEffect(() => {
        setisSecondaryLangVisible(secondaryLanguage !== 'Dual Language');
    }, [secondaryLanguage]);

    const { data: article, isLoading, isError } = useGetArticleByIdQuery(id);

    if (isLoading) return <p>Loading articles...</p>;
    if (isError) return <p>Error fetching articles</p>;

    const articleData = article.languages[language.toLowerCase()];
    if (!articleData) return null;

    const localeMap = {
        english: 'en-US',
        español: 'es-ES',
        français: 'fr-FR',
        deutsch: 'de-DE',
        português: 'pt-PT',
    };

    const articleDate = new Date(articleData.date).toLocaleDateString(
        localeMap[language.toLowerCase()] || 'en-US',
        { month: 'long', day: 'numeric', year: 'numeric' }
    );

    const secondaryLangArticleData =
        article.languages[secondaryLanguage.toLowerCase()];

    const secondaryLangArticleDate = secondaryLangArticleData
        ? new Date(secondaryLangArticleData.date).toLocaleDateString(
              localeMap[secondaryLanguage.toLowerCase()] || 'en-US',
              { month: 'long', day: 'numeric', year: 'numeric' }
          )
        : 'null date';

    return (
        <div className='mt-6 transition-all duration-300 ease-in-out'>
            <div className='flex w-full space-x-5 items-center'>
                <div
                    className={`flex justify-between transition-all duration-300 ease-in-out ${
                        isSecondaryLangVisible ? 'w-1/2' : 'w-11/12'
                    }`}
                >
                    <h1
                        className={`font-poppins italic transition-all duration-200 ${
                            isDarkMode ? 'text-white' : 'text-darkExpansion'
                        }`}
                    >
                        {'>'} Articles {'>'} English {'>'} {articleData.title}
                    </h1>
                    <FiPrinter
                        size={28}
                        className={`hover:cursor-pointer transition-all duration-200 ${
                            isDarkMode ? 'text-white' : 'text-darkExpansion'
                        }`}
                    />
                </div>
                <div
                    className={`flex items-center justify-end space-x-2 cursor-pointer hover:underline transition-all duration-300 ease-in-out ${
                        isSecondaryLangVisible ? 'w-1/2' : 'w-1/12'
                    }`}
                >
                    <h1
                        className={`font-opensans text-xl transition-all duration-200 ${
                            isDarkMode ? 'text-white' : 'text-darkExpansion'
                        }`}
                    >
                        Share
                    </h1>
                    <CiShare1
                        size={25}
                        className={`transition-all duration-200 ${
                            isDarkMode ? 'text-white' : 'text-darkExpansion'
                        }`}
                    />
                </div>
            </div>

            <div className='flex w-full space-x-5 mt-4'>
                {/* Main Language Article */}
                <div
                    className={`card-shadow-static rounded-[16px] transition-all duration-200 ease-in-out ${
                        isDarkMode ? 'bg-_303030' : 'bg-white'
                    } ${isSecondaryLangVisible ? 'w-1/2' : 'w-11/12'}`}
                >
                    <img
                        src={dock}
                        alt=''
                        className='rounded-t-[16px] image-shadow w-full'
                    />
                    <div className='py-5 px-2'>
                        <h1
                            className={`text-3xl font-bold mb-2 transition-all duration-200 ${
                                isDarkMode ? 'text-white' : 'text-darkExpansion'
                            }`}
                        >
                            {articleData.title}
                        </h1>
                        <div className='flex space-x-2'>
                            <h1
                                className={`text-sm italic mb-6 transition-all duration-200 ${
                                    isDarkMode
                                        ? 'text-white'
                                        : 'text-darkExpansion'
                                }`}
                            >
                                {articleDate}
                            </h1>
                            <HiOutlineSpeakerWave
                                size={20}
                                className={`pt-[1px] hover:cursor-pointer transition-all duration-200 ${
                                    isDarkMode
                                        ? 'text-white'
                                        : 'text-darkExpansion'
                                }`}
                            />
                        </div>
                        <h1
                            className={`text-lg transition-all duration-200 ${
                                isDarkMode ? 'text-white' : 'text-darkExpansion'
                            }`}
                        >
                            {articleData.content}
                        </h1>
                    </div>
                </div>

                {/* Right Section */}
                <div
                    className={`flex flex-col items-end transition-all duration-200 ease-in-out ${
                        isSecondaryLangVisible
                            ? 'w-1/2 space-y-[320px]'
                            : 'w-1/12'
                    }`}
                >
                    {/* Connect Section */}
                    <div
                        className={`card-shadow-static rounded-[16px] p-1 flex justify-center items-center transition-all duration-200 ease-in-out ${
                            isDarkMode
                                ? 'text-white bg-_303030'
                                : 'text-darkExpansion bg-white'
                        } ${
                            isSecondaryLangVisible
                                ? 'flex-row h-[80px] w-[400px] space-x-4'
                                : 'flex-col w-[100px] h-[400px] space-y-4'
                        }`}
                    >
                        <FaSquareXTwitter
                            size={socialSize}
                            className={socialClass}
                        />
                        <FaYoutube size={socialSize} className={socialClass} />
                        <FaInstagram
                            size={socialSize}
                            className={socialClass}
                        />
                        <FaFacebookSquare
                            size={socialSize}
                            className={socialClass}
                        />
                        <FaLinkedin size={socialSize} className={socialClass} />
                        <FaPinterest
                            size={socialSize}
                            className={socialClass}
                        />
                    </div>

                    {/* Secondary Language Article */}
                    <div
                        className={`transition-all duration-200 ease-in-out ${
                            isDarkMode ? 'bg-_303030' : 'bg-white'
                        } ${
                            isSecondaryLangVisible
                                ? 'opacity-100 translate-y-0 scale-100'
                                : 'opacity-0 translate-y-5 scale-95 pointer-events-none absolute'
                        } w-full card-shadow-static rounded-[16px] relative`}
                    >
                        <div className='absolute top-4 right-5 translate-x-2 -translate-y-2 text-2xl'>
                            <IoClose
                                size={30}
                                className={`hover:cursor-pointer transition-all duration-200 ${
                                    isDarkMode
                                        ? 'text-white'
                                        : 'text-darkExpansion'
                                }`}
                                onClick={() => {
                                    dispatch(
                                        changeSecondaryLanguage('Dual Language')
                                    );
                                }}
                            />
                        </div>

                        {secondaryLangArticleData && (
                            <div className='py-3 px-2'>
                                <h1
                                    className={`text-3xl font-bold mb-2 transition-all duration-200 ${
                                        isDarkMode
                                            ? 'text-white'
                                            : 'text-darkExpansion'
                                    }`}
                                >
                                    {secondaryLangArticleData.title}
                                </h1>
                                <div className='flex space-x-2'>
                                    <h1
                                        className={`text-sm italic mb-6 transition-all duration-200 ${
                                            isDarkMode
                                                ? 'text-white'
                                                : 'text-darkExpansion'
                                        }`}
                                    >
                                        {secondaryLangArticleDate}
                                    </h1>
                                    <HiOutlineSpeakerWave
                                        size={20}
                                        className={`pt-[1px] hover:cursor-pointer transition-all duration-200 ${
                                            isDarkMode
                                                ? 'text-white'
                                                : 'text-darkExpansion'
                                        }`}
                                    />
                                </div>
                                <h1
                                    className={`text-lg transition-all duration-200 ${
                                        isDarkMode
                                            ? 'text-white'
                                            : 'text-darkExpansion'
                                    }`}
                                >
                                    {secondaryLangArticleData.content}
                                </h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleScreen;
