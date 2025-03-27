import { useSelector } from 'react-redux';
import dock from '../assets/dock.png';
import { useNavigate } from 'react-router-dom';

const FeaturedArticle = ({ article }) => {
    const navigate = useNavigate();

    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const language = useSelector((state) => state.language.language);

    const articleData = article.languages[language.toLowerCase()];

    console.log(language)

    if (!articleData) return null;

    const localeMap = {
        en: 'en-US',
        es: 'es-ES',
        fr: 'fr-FR',
        de: 'de-DE',
        pt: 'pt-PT',
    };

    const articleDate = new Date(articleData.date).toLocaleDateString(localeMap[language.toLowerCase()] || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const cleanText = articleData.content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/([^\s])([.?!;:])(\S)/g, '$1$2 $3') // Add space after . ? ! ; : if missing
        .replace(/([.?!;:])\s+/g, '$1 ') // Ensure only one space after punctuation
        .replace(/\s+/g, ' ') // Collapse multiple spaces/newlines into one
        .trim()
        .substring(0, 1000);

    return (
        <div className={`card-shadow rounded-[16px] hover:cursor-pointer transition-all duration-200 ${isDarkMode ? 'bg-_303030' : ''}`} onClick={() => navigate(`/article/${article._id}`)}>
            <img src={dock} alt='' className='rounded-t-[16px] image-shadow' />
            <div className='py-5 px-2 space-y-2 font-opensans'>
                <h1 className={`text-2xl font-bold transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{articleData.title}</h1>
                <h1 className={`text-sm italic transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>{articleDate}</h1>
                <h1 className={`text-lg line-clamp-3 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{cleanText}</h1>
                <h1 className={`text-lg font-bold underline inline-block pb-1 transition-all duration-200 ${isDarkMode ? 'text-white hover:text-blue-300' : 'text-darkExpansion hover:text-mainBlue'}`}>Read More</h1>
            </div>
        </div>
    );
};

export default FeaturedArticle;
