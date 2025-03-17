import React, { useState } from 'react';
import SimpleEditor from './SimpleEditor';
import { useSelector } from 'react-redux';

const WriteNewScreen = () => {
    const [editorContent, setEditorContent] = useState('');

    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const language = useSelector((state) => state.language.language);

    // Language Selection (tabs on the top)
    // Title
    // Date
    // Content
    // Dual language editor view
    // Generate other languages button??? THAT WOULD BE SO COOL
    // Save draft button
    // Publish/Unpublish button

    return (
        <div className='py-4'>
            <div className='mb-4'>
                <label className='block text-lg mb-1'>
                    English Title
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
                    value='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>









            <h2 className='text-2xl font-semibold mb-4'>Rich Text Editor</h2>
            <SimpleEditor
                onChange={(content) => {
                    console.log('Editor content:', content);
                    setEditorContent(content);
                }}
            />

            {/*     const convertPtoNewline = (htmlContent) => {
        return htmlContent.replace(/<p><\/p>/g, '\n');
    }; */}

            {/* How to display it properly */}
            {/* <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Editor Content:</h3>
                <div
                    className="p-4 bg-gray-100 border rounded-md shadow-md font-opensans tracking-wider leading-[1.75]"
                    style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                    }}
                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: convertPtoNewline(editorContent),
                        }}
                    />
                </div>
            </div> */}
        </div>
    );
};

export default WriteNewScreen;
