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
  connectedCallback() {
    this.buttonList = document.querySelectorAll('button.cdg-rte-buttons')
    this.editor.on('transaction', ({editor, transaction}) => {
      // The editor state has changed.
      if (this.buttonList.length) {
        this.checkActive()
      }
    })
    if (this.buttonList && this.buttonList.length) {
      this.buttonList.forEach((button) => {
        button.addEventListener('click', () => {
          const detail = this.getEventData(button)
          const {operation, data} = detail
          this.editor.chain().focus()[operation](data).run()
        })
      })
    }

    window.addEventListener('resize', (event) => {
      this.style.maxHeight = '38px'
      if (this.scrollHeight > this.clientHeight) {
        console.log('show view more btn')
        this.viewMoreButton.classList.remove('hide')
      } else {
        this.viewMoreButton.classList.add('hide')
      }
    })

    this.viewMoreButton.addEventListener('click', () => {
      if (this.clientHeight === 38) {
        this.style.maxHeight = '300px'
      } else {
        this.style.maxHeight = '38px'
      }
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

      // TODO: link and image
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
}
