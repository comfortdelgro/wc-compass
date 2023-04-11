import {Editor} from '@tiptap/core'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'

import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

export class CdgRichTextEditor extends HTMLElement {
  editor

  constructor() {
    super()
    const content = this.querySelector('.cdg-rte-content')

    // Clone default value
    const data = content.innerHTML
    content.textContent = ''

    this.editor = new Editor({
      element: content,
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Underline,
        Superscript,
        SubScript,
        Highlight,
        Link,
        Image,
        TextStyle,
        Color,
      ],
      content: data,
      onUpdate: ({editor}) => {
        const output = editor.getHTML()
        if (!output) return
        this.dispatchEvent(
          new CustomEvent('onRichTextEditorUpdate', {detail: output}),
        )
      },
    })
  }

  connectedCallback() {
    const toolbar = this.querySelector('cdg-rte-toolbar')
    if (toolbar) {
      toolbar.editor = this.editor
    }
  }
}
