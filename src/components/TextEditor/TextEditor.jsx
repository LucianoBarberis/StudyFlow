import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import './TextEditor.css'

const TextEditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: localStorage.getItem('editorContent') || '<p>Escribe aquí...</p>',
        onUpdate: ({ editor }) => {
            // Guardar el contenido cuando cambie
            const content = editor.getHTML();
            localStorage.setItem('editorContent', content);
        },
    })

    if (!editor) return null

    return (
        <div className="editor">
            <div className="toolbar">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'active' : ''}
                >
                    B
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'active' : ''}
                >
                    I
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'active' : ''}
                >
                    U
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}
                >
                    H1
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
                >
                    H2
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'active' : ''}
                >
                    • List
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'active' : ''}
                >
                    1. List
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'active' : ''}
                >
                    <img className='quoteIcon' src="./icons/quote.svg" alt="" />
                </button>
            </div>

            <EditorContent editor={editor} />
        </div>
    )
}

export default TextEditor