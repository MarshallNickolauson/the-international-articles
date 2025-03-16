import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/auth/authSlice';
import { useLoginMutation } from '../slices/auth/userApiSlice';

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

    const translations = {
        English: {
            signIn: 'Sign In',
            email: 'Email',
            password: 'Password',
            login: 'Login',
            dontHaveAccount: "Don't have an account?",
            signUp: 'Sign Up',
        },
        Español: {
            signIn: 'Iniciar sesión',
            email: 'Correo electrónico',
            password: 'Contraseña',
            login: 'Iniciar sesión',
            dontHaveAccount: '¿No tienes una cuenta?',
            signUp: 'Regístrate',
        },
        Français: {
            signIn: 'Se connecter',
            email: 'Email',
            password: 'Mot de passe',
            login: 'Se connecter',
            dontHaveAccount: 'Vous n\'avez pas de compte?',
            signUp: 'S\'inscrire',
        },
        Deutsch: {
            signIn: 'Einloggen',
            email: 'E-Mail',
            password: 'Passwort',
            login: 'Einloggen',
            dontHaveAccount: 'Hast du ein Konto?',
            signUp: 'Registrieren',
        },
        Português: {
            signIn: 'Entrar',
            email: 'E-mail',
            password: 'Senha',
            login: 'Entrar',
            dontHaveAccount: 'Não tem uma conta?',
            signUp: 'Registrar',
        },
    };

    return (
        <div
            className={`flex items-center justify-center mt-16 ${
                isDarkMode ? '' : ''
            }`}
        >
            <div
                className={`w-full max-w-md p-8 rounded-lg card-shadow-static transition-all duration-200 ${
                    isDarkMode
                        ? 'border-white text-white bg-_303030'
                        : 'border-gray-300 text-darkExpansion bg-white'
                }`}
            >
                <h2 className='text-3xl font-bold text-center mb-6'>
                    {translations[language]?.signIn || 'Sign In'}
                </h2>

                <form onSubmit={handleLogin}>
                    <div className='mb-4'>
                        <label className='block text-lg font-medium mb-1'>
                            {translations[language]?.email || 'Email'}
                        </label>
                        <input
                            type='email'
                            className={`w-full px-4 py-2 border transition-all duration-200 ${
                                isDarkMode
                                    ? 'border-white text-white bg-_303030'
                                    : 'border-gray-300 text-darkExpansion bg-white'
                            }
                            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500
                            font-opensans rounded-[8px] py-2 pr-4 transition-all duration-200 
                            w-[600px] placeholder:italic`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-lg font-medium mb-1'>
                            {translations[language]?.password || 'Password'}
                        </label>
                        <input
                            type='password'
                            className={`w-full px-4 py-2 border transition-all duration-200 ${
                                isDarkMode
                                    ? 'border-white text-white bg-_303030'
                                    : 'border-gray-300 text-darkExpansion bg-white'
                            }
                            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500
                            font-opensans rounded-[8px] py-2 pr-4 transition-all duration-200 
                            w-[600px] placeholder:italic`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-darkGreen text-white py-2 rounded-md font-semibold hover:bg-green-700 transition-all duration-200'
                    >
                        {isLoading ? 'Loading...' : translations[language]?.login || 'Login'}
                    </button>
                </form>

                <div className='text-center mt-4'>
                    <p className='text-lg'>
                        {translations[language]?.dontHaveAccount || "Don't have an account?"}{' '}
                        <Link
                            to='/register'
                            className='text-blue-500 hover:underline'
                        >
                            {translations[language]?.signUp || 'Sign Up'}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
