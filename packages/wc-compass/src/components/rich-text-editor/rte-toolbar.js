export class CdgRichTextEditorToolbar extends HTMLElement {
  static get observedAttributes() {
    return ['hiddenItems']
  }

  get isItemsHidden() {
    return this.hasAttribute('hiddenItems')
  }
  constructor() {
    super()
    if (this.isItemsHidden) {
      this.style.maxHeight = '38px'
      this.viewMoreButton = document.createElement('button')
      this.viewMoreButton.classList.add('more-button')
      this.viewMoreButton.innerHTML =
        '<cdg-icon name="activity" source="host"></cdg-icon>'
      this.appendChild(this.viewMoreButton)
      setTimeout(() => {
        this.checkMoreButtonVisibility()
      })
    } else {
      this.style.maxHeight = '300px'
    }
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
  colorSelector
  connectedCallback() {
    this.buttonList = this.querySelectorAll('button.cdg-rte-buttons')
    this.editor.on('transaction', ({editor, transaction}) => {
      if (this.buttonList && this.buttonList.length) {
        this.checkActive()
      }
    })
    this.bindEventHandler()
  }

  bindEventHandler() {
    if (this.isItemsHidden) {
      window.addEventListener('resize', (event) => {
        this.checkMoreButtonVisibility()
      })
      this.bindClickHandlerToMoreButton()
    }
    this.bindClickHandlerToControls()
    this.bindChangeHandlerToHeadingSelector()
    this.bindChangeHandlerToTextAlignmentSelector()
    this.bindChangeHandlerToColorSelector()
  }

  bindClickHandlerToControls() {
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
  }

  bindClickHandlerToMoreButton() {
    this.viewMoreButton.addEventListener('click', () => {
      if (this.clientHeight === 38) {
        this.style.maxHeight = '300px'
      } else {
        this.style.maxHeight = '38px'
      }
    })
  }

  bindChangeHandlerToHeadingSelector() {
    this.headingSelector = this.querySelector('#heading-selector')
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
  }

  bindChangeHandlerToTextAlignmentSelector() {
    this.textAlignmentSelector = this.querySelector('#text-alignment-selector')
    if (this.textAlignmentSelector) {
      this.textAlignmentSelector.addEventListener('onchangevalue', (event) => {
        this.editor.chain().focus().setTextAlign(event.detail).run()
      })
    }
  }

  bindChangeHandlerToColorSelector() {
    this.colorSelector = this.querySelector('#color-selector')
    if (this.colorSelector) {
      this.colorSelector.addEventListener('onchangevalue', (event) => {
        this.editor.chain().focus().setColor(event.detail).run()
      })
    }
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
    if (this.isScrollable()) {
      this.viewMoreButton.classList.remove('hide')
      this.style.paddingRight = '40px'
    } else {
      this.style.paddingRight = '20px'
      this.viewMoreButton.classList.add('hide')
    }
  }

  isScrollable() {
    return (
      this.scrollHeight &&
      this.clientHeight &&
      this.scrollHeight > this.clientHeight
    )
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
