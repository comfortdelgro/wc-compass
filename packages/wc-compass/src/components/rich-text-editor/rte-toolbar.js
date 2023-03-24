export class CdgRichTextEditorToolbar extends HTMLElement {
  constructor() {
    super()
    // const viewMoreButton = document.createElement(button);
    // viewMoreButton.innerHTML = 
  }

  set editor(value) {
    this._editor = value
  }
  get editor() {
    return this._editor
  }
  buttonList
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
      if(this.scrollHeight > this.clientHeight) {
        
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
