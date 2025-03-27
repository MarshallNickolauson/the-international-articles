import { useSelector } from 'react-redux';

const FormInput = ({ label, type, value, onChange, disabled = false, placeholder = '' }) => {
    
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    return (
    <div className='mb-4'>
        <label className='block text-lg font-medium mb-1'>{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border transition-all duration-200 ${
                isDarkMode ? 'border-white text-white bg-_303030' : 'border-gray-300 text-darkExpansion bg-white'
            } focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500
            font-opensans rounded-[8px] placeholder:italic`}
            required={!disabled}
        />
    </div>
    );
};

export default FormInput;