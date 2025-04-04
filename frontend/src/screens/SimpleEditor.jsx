import React, { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const SimpleEditor = ({ initialContent, onChange }) => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const hasInitialized = useRef(false);

    const handleUpdate = _.debounce(({ editor }) => {
        const html = editor.getHTML();
        if (onChange) onChange(html);
    }, 300);

    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: initialContent,
        onUpdate: handleUpdate,
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
                class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto rounded-[8px] px-2 py-1 pb-2 outline-none ring-0 border-[1px] border-gray-300 focus:border-gray-500 font-opensans tracking-wider leading-[1.75] transition-all duration-200 ${
                    isDarkMode ? 'bg-_303030 text-white' : 'bg-white text-darkExpansion'
                }`,
            },
        },
    });
    
    // Ensure the editor content is set correctly only once or when new content arrives
    useEffect(() => {
        if (editor) {
            // If the initialContent has changed, reset the content of the editor
            if (editor.getHTML() !== initialContent) {
                editor.commands.setContent(initialContent); // Reinitialize content
            }
        }
    }, [initialContent, editor]);

    return (
        <div>
            <EditorContent editor={editor} />
        </div>
    );
};

export default SimpleEditor;
