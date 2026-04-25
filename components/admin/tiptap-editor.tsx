'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Placeholder from '@tiptap/extension-placeholder'
import { lowlight } from 'lowlight/lib/core'
import { useState, useCallback } from 'react'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Eye,
  Code2,
} from 'lucide-react'

interface TiptapEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function TiptapEditor({ content, onChange, placeholder = 'İçeriğinizi buraya yazın...' }: TiptapEditorProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [showHtml, setShowHtml] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full',
        },
      }),
      TableRow,
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-border p-2',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-border p-2 bg-muted font-bold',
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-muted p-4 rounded-lg font-mono text-sm',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }: { editor: any }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
  })

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL:', previousUrl)

    if (url === null) return

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const addImage = useCallback(() => {
    if (!editor) return

    const url = window.prompt('Resim URL:')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const addTable = useCallback(() => {
    if (!editor) return
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }, [editor])

  if (!editor) {
    return null
  }

  const MenuButton = ({ onClick, active, children, title }: any) => (
    <button
      onClick={onClick}
      type="button"
      className={`p-2 rounded hover:bg-muted transition ${
        active ? 'bg-primary text-white' : 'text-foreground'
      }`}
      title={title}
    >
      {children}
    </button>
  )

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-muted/50 border-b border-border p-2 flex flex-wrap gap-1">
        {/* View Modes */}
        <div className="flex gap-1 border-r border-border pr-2 mr-2">
          <MenuButton
            onClick={() => {
              setShowPreview(false)
              setShowHtml(false)
            }}
            active={!showPreview && !showHtml}
            title="Editör"
          >
            <Code2 className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => {
              setShowPreview(true)
              setShowHtml(false)
            }}
            active={showPreview}
            title="Önizleme"
          >
            <Eye className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => {
              setShowHtml(true)
              setShowPreview(false)
            }}
            active={showHtml}
            title="HTML"
          >
            <Code className="w-4 h-4" />
          </MenuButton>
        </div>

        {/* Text Formatting */}
        <div className="flex gap-1 border-r border-border pr-2 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Kalın (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="İtalik (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            title="Altı Çizili (Ctrl+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title="Üstü Çizili"
          >
            <Strikethrough className="w-4 h-4" />
          </MenuButton>
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r border-border pr-2 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
            title="Başlık 1"
          >
            <Heading1 className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            title="Başlık 2"
          >
            <Heading2 className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive('heading', { level: 3 })}
            title="Başlık 3"
          >
            <Heading3 className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            active={editor.isActive('heading', { level: 4 })}
            title="Başlık 4"
          >
            <Heading4 className="w-4 h-4" />
          </MenuButton>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r border-border pr-2 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Madde İşaretli Liste"
          >
            <List className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Numaralı Liste"
          >
            <ListOrdered className="w-4 h-4" />
          </MenuButton>
        </div>

        {/* Alignment */}
        <div className="flex gap-1 border-r border-border pr-2 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            active={editor.isActive({ textAlign: 'left' })}
            title="Sola Hizala"
          >
            <AlignLeft className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            active={editor.isActive({ textAlign: 'center' })}
            title="Ortala"
          >
            <AlignCenter className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            active={editor.isActive({ textAlign: 'right' })}
            title="Sağa Hizala"
          >
            <AlignRight className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            active={editor.isActive({ textAlign: 'justify' })}
            title="İki Yana Yasla"
          >
            <AlignJustify className="w-4 h-4" />
          </MenuButton>
        </div>

        {/* Insert */}
        <div className="flex gap-1 border-r border-border pr-2 mr-2">
          <MenuButton onClick={setLink} active={editor.isActive('link')} title="Link Ekle">
            <LinkIcon className="w-4 h-4" />
          </MenuButton>
          <MenuButton onClick={addImage} title="Resim Ekle">
            <ImageIcon className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title="Alıntı"
          >
            <Quote className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
            title="Kod Bloğu"
          >
            <Code className="w-4 h-4" />
          </MenuButton>
          <MenuButton onClick={addTable} title="Tablo Ekle">
            <TableIcon className="w-4 h-4" />
          </MenuButton>
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Geri Al (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Yinele (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </MenuButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className="bg-white">
        {showHtml ? (
          <textarea
            value={editor.getHTML()}
            onChange={(e) => {
              editor.commands.setContent(e.target.value)
            }}
            className="w-full min-h-[400px] p-4 font-mono text-sm focus:outline-none"
            placeholder="HTML kodu..."
          />
        ) : showPreview ? (
          <div
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none p-4 min-h-[400px]"
            dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
          />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
    </div>
  )
}
