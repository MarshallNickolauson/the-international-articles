import { useSelector } from "react-redux";

function Footer() {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    const year = new Date().getFullYear();

    return (
        <footer className="px-4">
            <div className="max-w-[1450px] mx-auto">
                <p className={`text-md text-center ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>Copyright Example &copy; The International Articles {year}</p>
            </div>
        </footer>
    );
}

export default Footer;
