export class CdgRichTextEditorToolbar extends HTMLElement {
  constructor() {
    super()
    this.viewMoreButton = document.createElement('button')
    this.viewMoreButton.classList.add('more-button')
    this.viewMoreButton.innerHTML =
      '<cdg-icon name="activity" source="host"></cdg-icon>'
    this.appendChild(this.viewMoreButton)
  }

  set editor(value) {
    this._editor = value
  }
  get editor() {
    return this._editor
  }
  buttonList
  viewMoreButton
  headingSelector
  connectedCallback() {
    this.buttonList = document.querySelectorAll('button.cdg-rte-buttons')
    this.editor.on('transaction', ({editor, transaction}) => {
      if (this.buttonList.length) {
        this.checkActive()
      }
    })
    if (this.buttonList && this.buttonList.length) {
      this.buttonList.forEach((button) => {
        button.addEventListener('click', () => {
          const detail = this.getEventData(button)
          const {operation, data} = detail
          if (button.getAttribute('name') === 'link') {
            this.setLink()
          } else if (button.getAttribute('name') === 'image') {
            this.setImage()
          } else {
            this.editor.chain().focus()[operation](data).run()
          }
        })
      })
    }

    window.addEventListener('resize', (event) => {
      this.checkMoreButtonVisibility()
    })

    this.viewMoreButton.addEventListener('click', () => {
      if (this.clientHeight === 38) {
        this.style.maxHeight = '300px'
      } else {
        this.style.maxHeight = '38px'
      }
    })

    this.headingSelector = document.querySelector('#heading-selector')
    if (this.headingSelector) {
      this.headingSelector.addEventListener('onchangevalue', (event) => {
        if (+event.detail === 0) {
          this.editor.commands.setNode('paragraph')
          this.editor.chain().focus().run()
        } else {
          this.editor
            .chain()
            .focus()
            .toggleHeading({level: +event.detail})
            .run()
        }
      })
    }
    this.textAlignmentSelector = document.querySelector(
      '#text-alignment-selector',
    )
    if (this.textAlignmentSelector) {
      this.textAlignmentSelector.addEventListener('onchangevalue', (event) => {
        this.editor.chain().focus().setTextAlign(event.detail).run()
      })
    }

    setTimeout(() => {
      this.checkMoreButtonVisibility()
    })
  }

  getEventData(button) {
    const attributes = {}
    button
      .getAttributeNames()
      .forEach((name) => (attributes[name] = button.getAttribute(name)))
    const {operation, level, alignment, name} = attributes
    let detail = {operation, name}
    switch (operation) {
      case 'toggleHeading':
        detail.data = {
          level: +level,
        }
        break
      case 'setTextAlign':
        detail.data = alignment
        break
    }

    return detail
  }

  checkActive() {
    this.buttonList.forEach((button) => {
      const {name, data} = this.getEventData(button)
      if (this.editor.isActive(name, data)) {
        button.classList.add('active')
      } else {
        button.classList.remove('active')
      }
    })
  }

  checkMoreButtonVisibility() {
    this.style.maxHeight = '38px'
    console.log(this.scrollHeight);
    if (
      this.scrollHeight &&
      this.clientHeight &&
      this.scrollHeight > this.clientHeight
    ) {
      this.viewMoreButton.classList.remove('hide')
      this.style.paddingRight = '40px'
    } else {
      this.style.paddingRight = '20px'
      this.viewMoreButton.classList.add('hide')
    }
  }

  setLink() {
    const url = window.prompt('URL')
    if (url === null) {
      return
    }

    if (url === '') {
      this.editor.chain().focus().unsetLink().run()

      return
    }

    this.editor.chain().focus().setLink({href: url}).run()
  }

  setImage() {
    const url = window.prompt('URL')

    if (url) {
      this.editor.chain().focus().setImage({src: url}).run()
    }
  }
}
