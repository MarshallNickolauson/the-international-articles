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

const ArticleScreen = () => {
    const socialSize = 45;
    const socialClass =
        'hover:cursor-pointer transform transition-all duration-150 hover:scale-[1.08]';

    return (
        <div className='mt-6'>
            <div className='flex w-full space-x-5 items-center'>
                <div className='flex justify-between w-11/12'>
                    <h1 className='font-poppins italic text-darkExpansion'>
                        {'>'} Articles {'>'} English {'>'} Practice the Presence
                        of God
                    </h1>
                    <FiPrinter
                        size={28}
                        className='mr-2 hover:cursor-pointer'
                    />
                </div>
                <div className='w-1/12 flex items-center justify-end space-x-2 cursor-pointer hover:underline'>
                    <h1 className='font-opensans text-xl'>Share</h1>
                    <CiShare1 size={25} />
                </div>
            </div>
            <div className='flex w-full space-x-5 mt-4'>
                {/* Article Section (80%) */}
                <div className='w-11/12 card-shadow-static rounded-[16px] transition-all duration-200'>
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
                            <HiOutlineSpeakerWave size={20} className='pt-[1px] hover:cursor-pointer'/>
                        </div>
                        <h1 className='text-darkExpansion text-lg'>
                            God is present in our lives every moment of the day,
                            whether we recognize it or not. More filler words
                            here that have meaning and trail off into dots
                            okay... Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Vero perferendis suscipit velit
                            aperiam, sit natus enim nisi possimus soluta
                            inventore pariatur veritatis facilis aut incidunt
                            obcaecati molestias. Iure officiis dicta, consect
                        </h1>
                    </div>
                </div>

                {/* Card Section (20%) */}
                <div className='w-1/12 card-shadow-static rounded-[16px] p-1 h-[400px]'>
                    <h2 className='text-darkExpansion text-xl font-bold text-center'>
                        Connect
                    </h2>
                    <p className='text-darkExpansion mt-4 flex flex-col items-center justify-center mx-auto space-y-3'>
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
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArticleScreen;
