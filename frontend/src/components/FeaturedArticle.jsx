import { useSelector } from "react-redux";
import dock from "../assets/dock.png";
import {useNavigate} from 'react-router-dom';

const FeaturedArticle = () => {
    const navigate = useNavigate();
    
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <div className="card-shadow rounded-[16px] hover:cursor-pointer transition-all duration-200" onClick={() => navigate('/article')}>
            <img src={dock} alt="" className="rounded-t-[16px] image-shadow" />
            <div className="py-5 px-2 space-y-2">
                <h1 className={`text-2xl font-bold transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                    Practice the Presence of God
                </h1>
                <h1 className={`text-sm italic transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>Aug. 19, 2024</h1>
                <h1 className={`text-lg line-clamp-3 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                    God is present in our lives every moment of the day, whether
                    we recognize it or not. More filler words here that have
                    meaning and trail off into dots okay... Lorem ipsum dolor
                    sit, amet consectetur adipisicing elit. Consequuntur
                    blanditiis eaque unde cum commodi ex maiores voluptatem.
                    Obcaecati, perspiciatis eos. Et temporibus iusto fugiat
                    rerum commodi, laborum ea pariatur in omnis nisi nobis totam
                    labore expedita porro officia iste, animi, veniam tempora
                    modi illum ducimus eius aspernatur a? Alias culpa placeat a
                    ratione quisquam odit natus vel. Nostrum recusandae ipsa
                    alias quisquam pariatur! Ratione aspernatur atque modi,
                    pariatur ducimus quaerat? Eum rem quidem dolorum
                    necessitatibus et cumque, voluptatem exercitationem
                    excepturi adipisci suscipit vitae fuga? Distinctio
                    repellendus nihil sed tenetur minima officia libero,
                    voluptas recusandae natus obcaecati. Quos deleniti ducimus
                    culpa.
                </h1>
                <h1 className={`text-lg font-bold underline inline-block pb-1 transition-all duration-200 ${isDarkMode ? 'text-white hover:text-blue-300' : 'text-darkExpansion hover:text-mainBlue'}`}>
                    Read More
                </h1>
            </div>
        </div>
    );
};

export default FeaturedArticle;
