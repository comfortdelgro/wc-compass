import {CdgCarousel} from '../carousel/carousel'

export class CdgTestimonial extends CdgCarousel {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-testimonial')
    this.wrapContent()
    if (!this.hasAttribute('current')) {
      this.switchSlide()
    }
    this.createHeaderControlBar()
  }

  createHeaderControlBar() {
    this.headerControlBarEl = document.createElement('div')
    this.headerControlBarEl.classList.add('cdg-testimonial-header-control')
    if (this.controller) {
      this.headerControlBarEl.appendChild(this.controller)
      if (this.hasAttribute('hide-indicators')) {
        this.controller.style.display = 'none'
        this.headerControlBarEl.style.justifyContent = 'flex-end'
      }
    }
    if (this.navigationBar) {
      this.headerControlBarEl.appendChild(this.navigationBar)
    }
    this.prepend(this.headerControlBarEl)
  }
}
