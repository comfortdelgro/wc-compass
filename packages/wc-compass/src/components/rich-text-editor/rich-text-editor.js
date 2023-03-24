import {Editor} from '@tiptap/core'
import Highlight from '@tiptap/extension-highlight'
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

    this.editor = new Editor({
      element: document.querySelector('.rte-content'),
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
      ],
      content: '<p>Hello World2!</p>',
    })
  }

  connectedCallback() {
    const toolbar = document.querySelector('cdg-rte-toolbar')
    if (toolbar) {
      toolbar.editor = this.editor
    }
  }
}
