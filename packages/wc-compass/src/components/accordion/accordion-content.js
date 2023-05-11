export class CdgAccordionContent extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-acordion-content')
  }
}
