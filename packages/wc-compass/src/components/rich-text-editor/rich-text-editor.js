import {Editor} from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

export class CdgRichTextEditor extends HTMLElement {
  
  actions = [
    {name: 'bold', command: 'toggleBold', disable: true},
    {name: 'italic', command: 'toggleItalic', disable: true},
    {name: 'strike', command: 'toggleStrike', disable: true},
    {name: 'code', command: 'toggleCode', disable: true},
    {name: 'clear marks', command: 'unsetAllMarks'},
    {name: 'clear nodes', command: 'setParagraph'},
    {name: 'paragraph', command: 'toggle'},
    {name: 'h1', command: 'toggleHeading', argument: {level: 1}},
    {name: 'h2', command: 'toggleHeading', argument: {level: 2}},
    {name: 'h3', command: 'toggleHeading', argument: {level: 3}},
    {name: 'h4', command: 'toggleHeading)', argument: {level: 4}},
    {name: 'h5', command: 'toggleHeading', argument: {level: 5}},
    {name: 'h6', command: 'toggleHeading', argument: {level: 6}},
    {name: 'bullet list', command: 'toggleBulletList'},
    {name: 'ordered list', command: 'toggleOrderedList'},
    {name: 'code block', command: 'toggleCodeBlock'},
    {name: 'blockquote', command: 'toggleBlockquote'},
    {name: 'horizontal rule', command: 'setHorizontalRule'},
    {name: 'hard break', command: 'setHardBreak'},
    {name: 'undo', command: 'undo', disable: true},
    {name: 'redo', command: 'redo', disable: true},
  ]
  editor

  constructor() {
    super()
    editor = new Editor({
      element: document.querySelector('.element'),
      extensions: [StarterKit],
      content: '<p>Hello World2!</p>',
      onTransaction({editor}) {
        this.checkActive()
      },
    })
  }

  connectedCallback() {
    const toolbar = document.querySelectorAll('cdg-rte-toolbar')
    const content = document.querySelectorAll('cdg-rte-content')

    if (toolbar) {
      toolbar.editor = this.editor
    }

    if (content) {
      content.editor = this.editor
    }
  }

  checkActive() {
    // for (let i in actions) {
    //   const a = actions[i]
    //   if (a.disable) {
    //     if (this.editor.can().chain().focus()[a.command]().run())
    //       a.button.removeAttribute('disabled')
    //     else a.button.setAttribute('disabled', 'true')
    //   }
    //   if (a.button.classList.contains('is-active')) {
    //     if (!this.editor.isActive(a.name)) {
    //       a.button.classList.remove('is-active')
    //     }
    //   } else if (this.editor.isActive(a.name)) {
    //     a.button.classList.add('is-active')
    //   }
    // }
  }
}
