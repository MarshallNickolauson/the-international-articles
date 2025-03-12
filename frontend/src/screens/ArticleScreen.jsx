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
import { changeSecondaryLanguage } from '../features/language/languageSlice';

const ArticleScreen = () => {
    const dispatch = useDispatch();

    const socialSize = 45;
    const socialClass =
        'hover:cursor-pointer transform transition-all duration-150 hover:scale-[1.08]';

    const [isSecondaryLangVisible, setisSecondaryLangVisible] = useState(false);
    const secondaryLanguage = useSelector((state) => state.language.secondaryLanguage);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    useEffect(() => {
        setisSecondaryLangVisible(secondaryLanguage !== 'Dual Language');
    }, [secondaryLanguage]);

    return (
        <div className='mt-6 transition-all duration-300 ease-in-out'>
            <div className='flex w-full space-x-5 items-center'>
                <div
                    className={`flex justify-between transition-all duration-300 ease-in-out ${
                        isSecondaryLangVisible ? 'w-1/2' : 'w-11/12'
                    }`}
                >
                    <h1 className={`font-poppins italic transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                        {'>'} Articles {'>'} English {'>'} Practice the Presence
                        of God
                    </h1>
                    <FiPrinter size={28} className={`hover:cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}  />
                </div>
                <div
                    className={`flex items-center justify-end space-x-2 cursor-pointer hover:underline transition-all duration-300 ease-in-out ${
                        isSecondaryLangVisible ? 'w-1/2' : 'w-1/12'
                    }`}
                >
                    <h1 className={`font-opensans text-xl transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>Share</h1>
                    <CiShare1 size={25} className={`transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`} />
                </div>
            </div>

            <div className='flex w-full space-x-5 mt-4'>
                {/* Main Language Article */}
                <div
                    className={`card-shadow-static rounded-[16px] transition-all duration-200 ease-in-out ${isDarkMode ? 'bg-_303030' : 'bg-white'} ${
                        isSecondaryLangVisible ? 'w-1/2' : 'w-11/12'
                    }`}
                >
                    <img
                        src={dock}
                        alt=''
                        className='rounded-t-[16px] image-shadow w-full'
                    />
                    <div className='py-5 px-2'>
                        <h1 className={`text-3xl font-bold mb-2 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                            Practice the Presence of God
                        </h1>
                        <div className='flex space-x-2'>
                            <h1 className={`text-sm italic mb-6 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                                Aug. 19, 2024
                            </h1>
                            <HiOutlineSpeakerWave
                                size={20}
                                className={`pt-[1px] hover:cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}
                            />
                        </div>
                        <h1 className={`text-lg transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                            God is present in our lives every moment of the
                            day... Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Ipsa reiciendis porro ex pariatur
                            perspiciatis iure cupiditate dolorum minima quos,
                            mollitia sequi iusto vel consequuntur iste! Labore,
                            iure totam optio voluptates exercitationem sed
                            laboriosam sapiente, magni esse harum, iste quasi id
                            explicabo assumenda nobis deleniti sunt quaerat
                            perferendis vero consequuntur? Doloribus, at rerum.
                            Provident tempore natus quis fugit praesentium ea,
                            aut laboriosam inventore similique rem beatae
                            consequuntur id! Harum officia asperiores quae magni
                            accusamus, quasi quod exercitationem ea
                            necessitatibus maiores voluptas. Magni, a
                            consequatur praesentium dolorum iure impedit ipsam
                            numquam mollitia pariatur, fuga explicabo cupiditate
                            rerum necessitatibus veritatis. Fuga, aliquid
                            dignissimos.
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
                        className={`card-shadow-static rounded-[16px] p-1 flex justify-center items-center transition-all duration-200 ease-in-out ${isDarkMode ? 'text-white bg-_303030' : 'text-darkExpansion bg-white'} ${
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
                        className={`transition-all duration-200 ease-in-out ${isDarkMode ? 'bg-_303030' : 'bg-white'} ${
                            isSecondaryLangVisible
                                ? 'opacity-100 translate-y-0 scale-100'
                                : 'opacity-0 translate-y-5 scale-95 pointer-events-none absolute'
                        } w-full card-shadow-static rounded-[16px] relative`}
                    >
                        <div className='absolute top-4 right-5 translate-x-2 -translate-y-2 text-2xl'>
                            <IoClose
                                size={30}
                                className={`hover:cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}
                                onClick={() => {
                                    dispatch(
                                        changeSecondaryLanguage('Dual Language')
                                    );
                                }}
                            />
                        </div>
                        <div className='py-3 px-2'>
                            <h1 className={`text-3xl font-bold mb-2 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                                Practice the Presence of God
                            </h1>
                            <div className='flex space-x-2'>
                                <h1 className={`text-sm italic mb-6 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                                    Aug. 19, 2024
                                </h1>
                                <HiOutlineSpeakerWave
                                    size={20}
                                    className={`pt-[1px] hover:cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}
                                />
                            </div>
                            <h1 className={`text-lg transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                                Dios está presente en nuestras vidas en cada
                                momento del día... Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Nisi voluptatibus
                                delectus molestiae nesciunt odio est aut commodi
                                suscipit aliquid quam. Veritatis nemo laborum
                                dignissimos inventore consequuntur a excepturi
                                culpa maxime dolorum numquam quod animi
                                perferendis quidem nobis ipsam aut maiores, iste
                                explicabo provident delectus? Assumenda unde
                                placeat debitis hic excepturi beatae cupiditate
                                officiis, corrupti inventore, odit maiores
                                consequuntur, quas ducimus atque ab sapiente!
                                Illo, qui? Praesentium nemo beatae, atque
                                pariatur facere, neque labore, doloribus dicta
                                nihil placeat error maiores delectus dolore
                                veritatis eaque voluptatum obcaecati maxime
                                eligendi autem cupiditate vel temporibus quo. At
                                magni eum amet accusantium nihil, maiores
                                debitis!
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleScreen;
