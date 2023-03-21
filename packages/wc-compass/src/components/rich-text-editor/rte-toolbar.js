export class CdgRichTextEditorToolbar extends HTMLElement {
  static get observedAttributes() {
    return ['editor']
  }

  get editor() {
    return this.hasAttribute('editor')
  }
  constructor() {
    super()
  }

  connectedCallback() {
    const buttonList = document.querySelectorAll('button.cdg-rte-buttons')
    if (buttonList && buttonList.length) {
      buttonList.forEach((button) => {
        button.addEventListener('click', () => {
          console.log(button.getAttributeNames())
        })
      })
    }
  }
}
