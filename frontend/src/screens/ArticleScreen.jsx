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
import { useNavigate, useParams } from 'react-router-dom';
import { useGetArticleByIdQuery } from '../slices/article/articleApiSlice';
import ArticleScreenLoader from '../components/loaders/ArticleScreenLoader';
import { toggleArticleLoading } from '../slices/article/articleSlice';
import { LANGUAGES, TRANSLATIONS } from '../constants';

const ArticleScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const socialIconSize = 45;
    const socialIconClass = 'hover:cursor-pointer transform transition-all duration-150 hover:scale-[1.08]';

    const language = useSelector((state) => state.language.language);
    const [isSecondaryLangVisible, setisSecondaryLangVisible] = useState(false);
    const secondaryLanguage = useSelector((state) => state.language.secondaryLanguage);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    useEffect(() => {
        setisSecondaryLangVisible(secondaryLanguage !== 'Dual Language');
    }, [secondaryLanguage]);

    const { data: article, isLoading, isError, error, refetch, isFetching } = useGetArticleByIdQuery(id, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        dispatch(toggleArticleLoading(isLoading));
    }, [isLoading, dispatch]);

    if (isLoading || isFetching) {
        return (
            <div className='mt-6 transition-all duration-300 ease-in-out'>
                <div className='flex w-full space-x-5 items-center'>
                    <div className={`flex justify-between transition-all duration-300 ease-in-out ${isSecondaryLangVisible ? 'w-1/2' : 'w-11/12'}`}>
                        <div className={`animate-pulseh-6 w-[350px] rounded transition-all duration-200 ${isDarkMode ? 'bg-[#303030]' : 'bg-gray-300 '}`}></div>
                        <FiPrinter size={28} className={`hover:cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`} />
                    </div>
                    <div className={`flex items-center justify-end space-x-2 cursor-pointer hover:underline transition-all duration-300 ease-in-out ${isSecondaryLangVisible ? 'w-1/2' : 'w-1/12'}`}>
                        <h1 className={`font-opensans text-xl transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>Share</h1>
                        <CiShare1 size={25} className={`transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`} />
                    </div>
                </div>

                <div className='flex w-full space-x-5 mt-4'>
                    {/* Main Language Article */}
                    <ArticleScreenLoader />

                    {/* Right Section */}
                    <div className={`flex flex-col items-end transition-all duration-200 ease-in-out ${isSecondaryLangVisible ? 'w-1/2 space-y-[320px]' : 'w-1/12'}`}>
                        {/* Connect Section */}
                        <div className={`card-shadow-static rounded-[16px] p-1 flex justify-center items-center transition-all duration-200 ease-in-out ${isDarkMode ? 'text-white bg-_303030' : 'text-darkExpansion bg-white'} ${isSecondaryLangVisible ? 'flex-row h-[80px] w-[400px] space-x-4' : 'flex-col w-[100px] h-[400px] space-y-4'}`}>
                            <FaSquareXTwitter size={socialIconSize} className={socialIconClass} />
                            <FaYoutube size={socialIconSize} className={socialIconClass} />
                            <FaInstagram size={socialIconSize} className={socialIconClass} />
                            <FaFacebookSquare size={socialIconSize} className={socialIconClass} />
                            <FaLinkedin size={socialIconSize} className={socialIconClass} />
                            <FaPinterest size={socialIconSize} className={socialIconClass} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <section className='flex justify-center items-center mt-20'>
                <div className='bg-red-100 text-red-800 p-6 rounded-2xl shadow-lg text-center max-w-md'>
                    <h1 className='text-2xl font-bold'>Error {error?.status || 'Unknown'}</h1>
                    <p className='mt-2'>{error?.data?.message || 'Something went wrong'}</p>
                    <button className='mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg' onClick={() => navigate('/')}>
                        Go to Dashboard
                    </button>
                </div>
            </section>
        );
    }

    const articleData = article.languages[language.toLowerCase()];
    if (!articleData) return null;

    const localeMap = {
        english: 'en-US',
        español: 'es-ES',
        français: 'fr-FR',
        deutsch: 'de-DE',
        português: 'pt-PT',
    };

    const articleDate = new Date(articleData.date).toLocaleDateString(localeMap[language.toLowerCase()] || 'en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const secondaryLangArticleData = article.languages[secondaryLanguage.toLowerCase()];

    const secondaryLangArticleDate = secondaryLangArticleData ? new Date(secondaryLangArticleData.date).toLocaleDateString(localeMap[secondaryLanguage.toLowerCase()] || 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'null date';

    const convertPtoNewline = (htmlContent) => {
        return htmlContent.replace(/<p><\/p>/g, '\n');
    };

    return (
        <div className='mt-6 transition-all duration-300 ease-in-out'>
            <div className='flex w-full space-x-5 items-center'>
                <div className={`flex justify-between transition-all duration-300 ease-in-out ${isSecondaryLangVisible ? 'w-1/2' : 'w-11/12'}`}>
                    <h1 className={`font-poppins italic transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                        {'>'} {TRANSLATIONS[language]?.articles || 'Articles'} {'>'} {LANGUAGES[language]?.name || 'LANG'} {'>'} {articleData.title}
                    </h1>
                    <FiPrinter size={28} className={`hover:cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`} />
                </div>
                <div className={`flex items-center justify-end space-x-2 cursor-pointer hover:underline transition-all duration-300 ease-in-out ${isSecondaryLangVisible ? 'w-1/2' : 'w-1/12'}`}>
                    <h1 className={`font-opensans text-xl transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{TRANSLATIONS[language].share || 'Share'}</h1>
                    <CiShare1 size={25} className={`transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`} />
                </div>
            </div>

            <div className='flex w-full space-x-5 mt-4'>
                {/* Main Language Article */}
                <div className={`card-shadow-static rounded-[16px] transition-all duration-200 ease-in-out ${isDarkMode ? 'bg-_303030' : 'bg-white'} ${isSecondaryLangVisible ? 'w-1/2' : 'w-11/12'}`}>
                    <img src={dock} alt='' className='rounded-t-[16px] image-shadow w-full max-h-[300px] object-cover' />
                    <div className='p-5'>
                        <h1 className={`text-3xl font-bold mb-2 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{articleData.title}</h1>
                        <div className='flex space-x-2'>
                            <h1 className={`text-sm italic mb-6 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{articleDate}</h1>
                            <HiOutlineSpeakerWave size={20} className={`pt-[1px] hover:cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`} />
                        </div>

                        <div
                            className={`text-lg font-opensans tracking-wider leading-[1.75] transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}
                            style={{
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                            }}
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: convertPtoNewline(articleData.content),
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className={`flex flex-col items-end transition-all duration-200 ease-in-out ${isSecondaryLangVisible ? 'w-1/2 space-y-[225px]' : 'w-1/12'}`}>
                    {/* Connect Section */}
                    <div className={`card-shadow-static rounded-[16px] p-1 flex justify-center items-center transition-all duration-200 ease-in-out ${isDarkMode ? 'text-white bg-_303030' : 'text-darkExpansion bg-white'} ${isSecondaryLangVisible ? 'flex-row h-[80px] w-[400px] space-x-4' : 'flex-col w-[100px] h-[400px] space-y-4'}`}>
                        <FaSquareXTwitter size={socialIconSize} className={socialIconClass} />
                        <FaYoutube size={socialIconSize} className={socialIconClass} />
                        <FaInstagram size={socialIconSize} className={socialIconClass} />
                        <FaFacebookSquare size={socialIconSize} className={socialIconClass} />
                        <FaLinkedin size={socialIconSize} className={socialIconClass} />
                        <FaPinterest size={socialIconSize} className={socialIconClass} />
                    </div>

                    {/* Secondary Language Article */}
                    <div className={`transition-all duration-200 ease-in-out ${isDarkMode ? 'bg-_303030' : 'bg-white'} ${isSecondaryLangVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95 pointer-events-none absolute'} w-full card-shadow-static rounded-[16px] relative`}>
                        <div className='absolute top-4 right-5 translate-x-2 -translate-y-2 text-2xl'>
                            <IoClose
                                size={30}
                                className={`hover:cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}
                                onClick={() => {
                                    dispatch(changeSecondaryLanguage('Dual Language'));
                                }}
                            />
                        </div>

                        {secondaryLangArticleData && (
                            <div className='py-3 px-2'>
                                <h1 className={`text-3xl font-bold mb-2 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{secondaryLangArticleData.title}</h1>
                                <div className='flex space-x-2'>
                                    <h1 className={`text-sm italic mb-6 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{secondaryLangArticleDate}</h1>
                                    <HiOutlineSpeakerWave size={20} className={`pt-[1px] hover:cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`} />
                                </div>
                                <div
                                    className={`text-lg font-opensans tracking-wider leading-[1.75] transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}
                                    style={{
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        overflowWrap: 'break-word',
                                    }}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: convertPtoNewline(secondaryLangArticleData.content),
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleScreen;
