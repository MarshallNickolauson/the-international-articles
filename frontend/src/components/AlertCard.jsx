import { useEffect, useState, useRef } from 'react';
import { CiCircleCheck, CiCircleRemove, CiCircleAlert } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';

const AlertCard = ({ type = 'info', message, show = true, onClose = () => {} }) => {
    const [visible, setVisible] = useState(show);
    const cardRef = useRef(null);

    const icons = {
        success: <CiCircleCheck className='text-green-600 w-5 h-5' />,
        error: <CiCircleRemove className='text-red-600 w-5 h-5' />,
        warning: <CiCircleAlert className='text-yellow-600 w-5 h-5' />,
        info: <CiCircleCheck className='text-blue-600 w-5 h-5' />,
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (cardRef.current && !cardRef.current.contains(e.target)) {
                setVisible(false);
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    useEffect(() => {
        if (visible) {
            const originalStyle = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-40 h-full min-h-[1000dvh]'>
            <div className='flex items-center justify-center mt-[230px]'>
                <div
                    ref={cardRef}
                    className={`relative flex items-center gap-3 p-4 rounded-xl shadow-md bg-white border-l-4 max-w-md max-h-[90vh] overflow-y-auto
            ${type === 'success' && 'border-green-600'}
            ${type === 'error' && 'border-red-600'}
            ${type === 'warning' && 'border-yellow-600'}
            ${type === 'info' && 'border-blue-600'}
          `}
                >
                    {icons[type]}
                    <div className='text-xl text-gray-800 mr-4'>{message}</div>
                    <button
                        onClick={() => {
                            setVisible(false);
                            onClose();
                        }}
                        className='absolute top-2 right-2 text-gray-500 hover:text-black transition'
                    >
                        <IoClose size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertCard;
