export class CdgActionBar extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-toolbar')
    this.attachElements()
  }

  attachElements() {
    const leftGroup = this.querySelector('.cdg-left-group')
    // if (!leftGroup) {
    //   const leftGroupElement = document.createElement('div')
    //   leftGroupElement.classList.add('cdg-left-group')
    //   this.prepend(leftGroupElement)
    // }

    const centerGroup = this.querySelector('.cdg-center-group')
    const rightGroup = this.querySelector('.cdg-right-group')
    // if (!centerGroup) {
    //   const centerGroupElement = document.createElement('div')
    //   centerGroupElement.classList.add('cdg-center-group')
    //   if (rightGroup) {
    //     this.insertBefore(centerGroupElement, rightGroup)
    //   } else {
    //     this.appendChild(centerGroupElement)
    //   }
    // }

    // if (!rightGroup) {
    //   const rightGroupElement = document.createElement('div')
    //   rightGroupElement.classList.add('cdg-right-group')
    //   this.appendChild(rightGroupElement)
    // }
  }
}
