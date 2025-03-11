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
    const secondaryLanguage = useSelector(
        (state) => state.language.secondaryLanguage
    );

    useEffect(() => {
        if (secondaryLanguage !== 'Dual Language') {
            setisSecondaryLangVisible(true);
        } else {
            setisSecondaryLangVisible(false);
        }
    }, [secondaryLanguage]);

    return (
        <div className='mt-6'>
            <div className='flex w-full space-x-5 items-center'>
                <div
                    className={`${
                        isSecondaryLangVisible ? 'w-1/2' : 'w-11/12'
                    } flex justify-between`}
                >
                    <h1 className={`font-poppins italic text-darkExpansion`}>
                        {'>'} Articles {'>'} English {'>'} Practice the Presence
                        of God
                    </h1>
                    <FiPrinter size={28} className='hover:cursor-pointer' />
                </div>
                <div
                    className={`${
                        isSecondaryLangVisible ? 'w-1/2' : 'w-1/12'
                    } flex items-center justify-end space-x-2 cursor-pointer hover:underline`}
                >
                    <h1 className='font-opensans text-xl'>Share</h1>
                    <CiShare1 size={25} />
                </div>
            </div>

            <div className='flex w-full space-x-5 mt-4'>
                {/* Main Language Article */}
                <div
                    className={`
                    ${isSecondaryLangVisible ? 'w-1/2' : 'w-11/12'}
                    card-shadow-static rounded-[16px]`}
                >
                    <img
                        src={dock}
                        alt=''
                        className='rounded-t-[16px] image-shadow w-full'
                    />
                    <div className='py-5 px-2'>
                        <h1 className='text-darkExpansion text-3xl font-bold mb-2'>
                            Practice the Presence of God
                        </h1>
                        <div className='flex space-x-2'>
                            <h1 className='text-gray-600 text-sm italic mb-6'>
                                Aug. 19, 2024
                            </h1>
                            <HiOutlineSpeakerWave
                                size={20}
                                className='pt-[1px] hover:cursor-pointer'
                            />
                        </div>
                        <h1 className='text-darkExpansion text-lg'>
                            God is present in our lives every moment of the
                            day... Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Commodi, consequatur! Assumenda
                            molestiae, dicta architecto deleniti adipisci
                            aperiam. Molestias labore rerum quam velit deleniti
                            libero accusantium aut necessitatibus nostrum eius!
                            Veritatis cupiditate, sed illo porro sunt fugiat
                            culpa molestiae aliquid impedit commodi dicta
                            officiis nemo, sint rem incidunt! Harum doloribus
                            architecto minima saepe quaerat eum vero velit rem
                            corrupti perferendis ex rerum nulla laudantium nemo
                            ut recusandae beatae, unde, commodi excepturi
                            numquam repellendus sapiente laborum natus!
                            Voluptatum facere debitis consequuntur repellat rem
                            atque tempora non fuga ut magnam, explicabo aliquam!
                            Voluptate voluptatibus non repudiandae eligendi
                            ducimus id, nesciunt inventore tempora odit.
                        </h1>
                    </div>
                </div>

                {/* Right Section */}
                <div
                    className={`${
                        isSecondaryLangVisible ? 'w-1/2' : 'w-1/12'
                    } flex flex-col items-end space-y-[320px]`}
                >
                    {/* Connect Section */}
                    <div
                        className={`
                        ${
                            isSecondaryLangVisible
                                ? 'flex-row h-[80px] w-[400px] space-x-4'
                                : 'flex-col w-[100px] h-[400px] space-y-4'
                        }
                        card-shadow-static rounded-[16px] p-1 flex flex-row justify-center items-center`}
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
                    {isSecondaryLangVisible && (
                        <div className='w-full card-shadow-static rounded-[16px] relative'>
                            <div className='absolute top-4 right-5 translate-x-2 -translate-y-2 text-2xl'>
                                <IoClose
                                    size={30}
                                    className='hover:cursor-pointer'
                                    onClick={() => {
                                        dispatch(changeSecondaryLanguage('Dual Language'));
                                    }}
                                />
                            </div>
                            <div className='py-3 px-2'>
                                <h1 className='text-darkExpansion text-3xl font-bold mb-2'>
                                    Practice the Presence of God
                                </h1>
                                <div className='flex space-x-2'>
                                    <h1 className='text-gray-600 text-sm italic mb-6'>
                                        Aug. 19, 2024
                                    </h1>
                                    <HiOutlineSpeakerWave
                                        size={20}
                                        className='pt-[1px] hover:cursor-pointer'
                                    />
                                </div>
                                <h1 className='text-darkExpansion text-lg'>
                                    Dios está presente en nuestras vidas en cada
                                    momento del día... Lorem ipsum dolor sit,
                                    amet consectetur adipisicing elit. Beatae,
                                    praesentium omnis? Aliquam rerum in
                                    inventore quod vero perferendis doloremque
                                    nihil autem laboriosam fuga corporis odit
                                    accusamus magnam, aspernatur at. Provident
                                    doloremque, nemo omnis ut esse minima
                                    voluptates hic praesentium, deleniti ea, et
                                    atque neque enim impedit inventore suscipit
                                    autem officia laudantium ullam. Totam omnis,
                                    id vitae a fugit exercitationem explicabo
                                    ipsam veritatis aperiam tenetur enim
                                    expedita modi quam quaerat quia blanditiis
                                    veniam! Tempore ipsam doloremque ex
                                    recusandae illum consequatur officia.
                                    Laudantium non doloremque totam accusamus
                                    quisquam iusto deleniti. Neque repellat
                                    nobis accusamus eum rem eligendi non
                                    molestias possimus reiciendis inventore.
                                </h1>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticleScreen;
