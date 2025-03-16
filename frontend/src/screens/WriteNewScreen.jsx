import React, { useState } from 'react';
import SimpleEditor from './SimpleEditor';

const WriteNewScreen = () => {
    const [editorContent, setEditorContent] = useState('');

    const convertPtoNewline = (htmlContent) => {
        return htmlContent.replace(/<p><\/p>/g, '\n');
    };

    // Language Selection (tabs on the top)
    // Title
    // Date
    // Content
    // Dual language editor view
    // Generate other languages button??? THAT WOULD BE SO COOL
    // Save draft button
    // Publish/Unpublish button

    return (
        <div className="py-4">
            <h2 className="text-2xl font-semibold mb-4">Rich Text Editor</h2>
            <SimpleEditor
                onChange={(content) => {
                    console.log('Editor content:', content);
                    setEditorContent(content);
                }}
            />
            <div className="mt-6">
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
            </div>
        </div>
    );
};

export default WriteNewScreen;
