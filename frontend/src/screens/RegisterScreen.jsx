import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/auth/authSlice.js';
import { useRegisterMutation } from '../slices/auth/userApiSlice.js';
import { TRANSLATIONS } from '../constants.js';

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const language = useSelector((state) => state.language.language);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [registerUser] = useRegisterMutation();

    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordsMatch(false);
            return;
        }
        try {
            const res = await registerUser({ name, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            setTimeout(() => {
                navigate('/');
            }, 1);
        } catch (err) {
            console.log(err?.data?.message || err.error);
        }
    };

    return (
        <div className='flex items-center justify-center mt-16'>
            <div
                className={`w-full max-w-md p-8 rounded-lg card-shadow-static transition-all duration-200 ${
                    isDarkMode ? 'border-white text-white bg-_303030' : 'border-gray-300 text-darkExpansion bg-white'
                }`}
            >
                <h2 className='text-3xl font-poppins font-bold text-center mb-6'>{translations.register || 'Register'}</h2>

                <form onSubmit={handleRegister} className='font-opensans'>
                    <div className='mb-4'>
                        <label className='block text-lg font-medium mb-1'>{translations.name || 'Name'}</label>
                        <input
                            type='text'
                            className={`w-full px-4 py-2 border transition-all duration-200 ${isDarkMode ? 'border-white text-white bg-_303030' : 'border-gray-300 text-darkExpansion bg-white'}
                            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500
                            font-opensans rounded-[8px] py-2 pr-4 transition-all duration-200 
                            w-[600px] placeholder:italic`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-lg font-medium mb-1'>{translations.email || 'Email'}</label>
                        <input
                            type='email'
                            className={`w-full px-4 py-2 border transition-all duration-200 ${isDarkMode ? 'border-white text-white bg-_303030' : 'border-gray-300 text-darkExpansion bg-white'}
                            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500
                            font-opensans rounded-[8px] py-2 pr-4 transition-all duration-200 
                            w-[600px] placeholder:italic`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-lg font-medium mb-1'>{translations.password || 'Password'}</label>
                        <input
                            type='password'
                            className={`w-full px-4 py-2 border transition-all duration-200 ${isDarkMode ? 'border-white text-white bg-_303030' : 'border-gray-300 text-darkExpansion bg-white'}
                            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500
                            font-opensans rounded-[8px] py-2 pr-4 transition-all duration-200 
                            w-[600px] placeholder:italic`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-lg font-medium mb-1'>{translations.confirmPassword || 'Confirm Password'}</label>
                        <input
                            type='password'
                            className={`w-full px-4 py-2 border transition-all duration-200 ${isDarkMode ? 'border-white text-white bg-_303030' : 'border-gray-300 text-darkExpansion bg-white'}
                            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500
                            font-opensans rounded-[8px] py-2 pr-4 transition-all duration-200 
                            w-[600px] placeholder:italic`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {!passwordsMatch && <div className='text-red-500 text-md mb-4 font-opensans text-center'>{translations.passwordsMismatch || 'Passwords do not match'}</div>}

                    <button type='submit' className='w-full bg-darkGreen text-white py-2 rounded-md font-semibold hover:bg-green-700 transition-all duration-200'>
                        {translations.submit || 'Sign Up'}
                    </button>
                </form>
                <div className='text-center mt-4 font-opensans'>
                    <span className='text-lg'>{translations.alreadyHaveAccount || 'Already have an account?'} </span>
                    <button onClick={() => navigate('/login')} className='text-blue-500 hover:underline text-lg'>
                        {translations.login || 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
