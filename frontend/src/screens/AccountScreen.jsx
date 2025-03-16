import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials, logout } from '../slices/auth/authSlice.js';
import { useUpdateMutation } from '../slices/auth/userApiSlice.js';

const AccountScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const language = useSelector((state) => state.language.language);
    const { userInfo } = useSelector((state) => state.auth);

    const [name, setName] = useState(userInfo?.name || '');
    const [email, setEmail] = useState(userInfo?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [updateUser, { isLoading, isError, error }] = useUpdateMutation();
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [updatedMessage, setUpdatedMessage] = useState(false);

    const translations = {
        English: {
            account: 'Your Account',
            name: 'Name',
            email: 'Email',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            update: 'Update',
            logout: 'Logout',
            passwordsMismatch: 'Passwords do not match',
            profileUpdated: 'Profile updated successfully',
        },
        Español: {
            account: 'Tu Cuenta',
            name: 'Nombre',
            email: 'Correo Electrónico',
            password: 'Contraseña',
            confirmPassword: 'Confirmar Contraseña',
            update: 'Actualizar',
            logout: 'Cerrar sesión',
            passwordsMismatch: 'Las contraseñas no coinciden',
            profileUpdated: 'Perfil actualizado con éxito',
        },
        Français: {
            account: 'Votre Compte',
            name: 'Nom',
            email: 'Email',
            password: 'Mot de passe',
            confirmPassword: 'Confirmer le mot de passe',
            update: 'Mettre à jour',
            logout: 'Se déconnecter',
            passwordsMismatch: 'Les mots de passe ne correspondent pas',
            profileUpdated: 'Profil mis à jour avec succès',
        },
        Deutsch: {
            account: 'Ihr Konto',
            name: 'Name',
            email: 'E-Mail',
            password: 'Passwort',
            confirmPassword: 'Passwort bestätigen',
            update: 'Aktualisieren',
            logout: 'Abmelden',
            passwordsMismatch: 'Passwörter stimmen nicht überein',
            profileUpdated: 'Profil erfolgreich aktualisiert',
        },
        Português: {
            account: 'Sua Conta',
            name: 'Nome',
            email: 'E-mail',
            password: 'Senha',
            confirmPassword: 'Confirmar Senha',
            update: 'Atualizar',
            logout: 'Sair',
            passwordsMismatch: 'As senhas não coincidem',
            profileUpdated: 'Perfil atualizado com sucesso',
        },
    };

    useEffect(() => {
        if (!userInfo) navigate('/login');
    }, [navigate, userInfo]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordsMatch(false);
            setUpdatedMessage(false);
        } else {
            try {
                const res = await updateUser({
                    name,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                setPassword('');
                setConfirmPassword('');
                setPasswordsMatch(true);
                setUpdatedMessage(true);
            } catch (err) {
                console.log(err?.data?.message || err.error);
            }
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className='flex items-center justify-center mt-16'>
            <div
                className={`w-full max-w-md p-8 rounded-lg card-shadow-static transition-all duration-200 ${
                    isDarkMode
                        ? 'border-white text-white bg-_303030'
                        : 'border-gray-300 text-darkExpansion bg-white'
                }`}
            >
                <h2 className='text-3xl font-bold text-center mb-6'>
                    {translations[language]?.account || 'Your Account'}
                </h2>

                {updatedMessage && (
                    <div className='text-mainGreen text-md mb-4 text-center'>
                        {translations[language]?.profileUpdated ||
                            'Profile updated successfully'}
                    </div>
                )}

                <form onSubmit={handleUpdate}>
                    <div className='mb-4'>
                        <label className='block text-lg font-medium mb-1'>
                            {translations[language]?.name || 'Name'}
                        </label>
                        <input
                            type='text'
                            className={`w-full px-4 py-2 border transition-all duration-200 ${
                                isDarkMode
                                    ? 'border-white text-white bg-_303030'
                                    : 'border-gray-300 text-darkExpansion bg-white'
                            }
                            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500
                            font-opensans rounded-[8px] py-2 pr-4 transition-all duration-200 
                            w-[600px] placeholder:italic`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                            required
                            disabled
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
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-lg font-medium mb-1'>
                            {translations[language]?.confirmPassword ||
                                'Confirm Password'}
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
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {!passwordsMatch && (
                        <div className='text-red-500 text-md mb-4 text-center'>
                            {translations[language]?.passwordsMismatch ||
                            'Passwords do not match'}
                        </div>
                    )}

                    <button
                        type='submit'
                        className='w-full bg-darkGreen text-white py-2 rounded-md font-semibold hover:bg-green-700 transition-all duration-200'
                    >
                        {translations[language]?.update || 'Update'}
                    </button>
                </form>
                <button
                    onClick={handleLogout}
                    className='w-full mt-4 bg-white text-darkGreen border border-darkGreen py-2 rounded-md font-semibold hover:bg-gray-100 transition-all duration-200'
                >
                    {translations[language]?.logout || 'Logout'}
                </button>
            </div>
        </div>
    );
};

export default AccountScreen;
