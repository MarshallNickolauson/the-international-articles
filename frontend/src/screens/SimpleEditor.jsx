import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { useSelector } from 'react-redux';

const SimpleEditor = ({ onChange }) => {
    const [content, setContent] = useState('');
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: '<p>Start typing...</p>',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setContent(html);
            if (onChange) onChange(html);
        },
        editorProps: {
            handleKeyDown: (view, event) => {
                const { state, dispatch } = editor.view;

                if (event.key === 'Tab') {
                    event.preventDefault();

                    const { $from, $to } = state.selection;
                    if ($from.pos !== $to.pos) {
                        editor.chain().focus().toggleBlockquote().run();
                    } else {
                        const tabCharacter = '    ';
                        dispatch(state.tr.insertText(tabCharacter, $from.pos));
                    }
                    return true;
                }

                return false;
            },
            attributes: {
                class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto rounded-[8px] px-2 py-1 pb-2 outline-none ring-0 border-[1px] border-gray-300 focus:border-gray-500 font-opensans tracking-wider leading-[1.75] transition-all duration-200 ${isDarkMode ? 'bg-_303030 text-white' : 'bg-white text-darkExpansion'}`,
            },
        },
    });

    return (
        <div>
            <EditorContent editor={editor} />
        </div>
    );
};

export default SimpleEditor;
