import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/auth/authSlice';
import { useLoginMutation } from '../slices/auth/userApiSlice';
import { TRANSLATIONS } from '../constants';
import FormInput from '../components/FormInput';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const language = useSelector((state) => state.language.language);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, isError, error }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) navigate('/');
    }, [navigate, userInfo]);

    useEffect(() => {
        if (isError) {
            setEmail('');
            setPassword('');
        }
    }, [isError]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');
        } catch (err) {
            console.log(err?.data?.message || err.error);
        }
    };

    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;

    return (
        <div className={`flex items-center justify-center mt-16`}>
            <div
                className={`w-full max-w-md p-8 rounded-lg card-shadow-static transition-all duration-200 ${
                    isDarkMode ? 'border-white text-white bg-_303030' : 'border-gray-300 text-darkExpansion bg-white'
                }`}
            >
                <h2 className='text-3xl font-poppins font-bold text-center mb-6'>{translations.signIn || 'Sign In'}</h2>

                <form onSubmit={handleLogin} className='font-opensans'>
                    <FormInput label={translations.email || 'Email'} type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FormInput label={translations.password || 'Password'} type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type='submit' className='w-full bg-darkGreen text-white py-2 rounded-md font-semibold hover:bg-green-700 transition-all duration-200'>
                        {isLoading ? 'Loading...' : translations.login || 'Login'}
                    </button>
                </form>

                <div className='text-center mt-4 font-opensans'>
                    <p className='text-lg'>
                        {translations.dontHaveAccount || "Don't have an account?"}{' '}
                        <Link to='/register' className='text-blue-500 hover:underline'>
                            {translations.signUp || 'Sign Up'}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
