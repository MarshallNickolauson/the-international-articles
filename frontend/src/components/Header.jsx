import { FaBookAtlas } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const navItemUnderline = `hover:cursor-pointer border-b-2 pb-1 border-b-transparent hover:border-b-mainWhite transition-all duration-100`;

    return (
        <nav className="top-0 w-full bg-darkGreen py-3 px-4 flex justify-center">
            <div className="flex justify-between w-full max-w-[1450px]">
                <div
                    className="flex space-x-3 hover:cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <div>
                        <FaBookAtlas size={40} color="white" />
                    </div>
                    <h1 className="font-poppins font-bold tracking-wide text-white flex items-center text-3xl">
                        The International Articles
                    </h1>
                </div>
                <div className="font-opensans flex space-x-5 text-white text-xl items-center">
                    <Link
                        to="/login"
                        className="bg-white text-darkGreen font-semibold px-4 py-2 rounded-[8px] hover:bg-gray-200 transition-all duration-100"
                    >
                        Sign In
                    </Link>
                    <h1 to="/" className={navItemUnderline}>
                        Menu
                    </h1>
                </div>
            </div>
        </nav>
    );
}

export default Header;
