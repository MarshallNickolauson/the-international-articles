import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials, logout } from '../slices/auth/authSlice.js';
import { useUpdateMutation, useDeleteMutation } from '../slices/auth/userApiSlice.js';
import { TRANSLATIONS } from '../constants.js';
import FormInput from '../components/FormInput.jsx';

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

    const [updateUser] = useUpdateMutation();
    const [deleteUser] = useDeleteMutation();
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [updatedMessage, setUpdatedMessage] = useState(false);

    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;

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
        setTimeout(() => {
            navigate('/');
        }, 1);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            try {
                await deleteUser().unwrap();
                handleLogout();
            } catch (error) {
                console.log(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className='flex items-center justify-center mt-16'>
            <div
                className={`w-full max-w-md p-8 rounded-lg card-shadow-static transition-all duration-200 ${
                    isDarkMode ? 'border-white text-white bg-_303030' : 'border-gray-300 text-darkExpansion bg-white'
                }`}
            >
                <h2 className='text-3xl font-poppins font-bold text-center mb-6'>{translations.account || 'Your Account'}</h2>

                {updatedMessage && <div className='text-mainGreen text-md mb-4 text-center'>{translations.profileUpdated || 'Profile updated successfully'}</div>}

                <form onSubmit={handleUpdate} className='font-opensans'>
                    <FormInput label={translations.name || 'Name'} type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    <FormInput label={translations.email || 'Email'} type='email' value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                    <FormInput label={translations.password || 'Password'} type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <FormInput label={translations.confirmPassword || 'Confirm Password'} type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    {!passwordsMatch && <div className='text-red-500 font-opensans text-md mb-4 text-center'>{translations.passwordsMismatch || 'Passwords do not match'}</div>}

                    <button type='submit' className='w-full bg-darkGreen text-white py-2 rounded-md font-semibold hover:bg-green-700 transition-all duration-200'>
                        {translations.update || 'Update'}
                    </button>
                </form>
                <button
                    onClick={handleLogout}
                    className='w-full mt-4 font-opensans bg-white text-darkGreen border border-darkGreen py-2 rounded-md font-semibold hover:bg-gray-100 transition-all duration-200'
                >
                    {translations.logout || 'Logout'}
                </button>

                {/* 

                // Removed because user._id is linked to written articles
                // Will handle later

                <button
                    onClick={handleDelete}
                    className='w-full mt-4 font-opensans bg-red-600 text-white border border-red-600 py-2 rounded-md font-semibold hover:bg-red-500 transition-all duration-200'
                >
                    {translations.deleteAccount || 'Delete Account'}
                </button> */}
            </div>
        </div>
    );
};

export default AccountScreen;
