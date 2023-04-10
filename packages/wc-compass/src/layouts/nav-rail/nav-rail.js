export class CdgNavRail extends HTMLElement {
  container

  static get observedAttributes() {
    return ['open']
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(open) {
    if (open) {
      this.setAttribute('open', '')
    } else {
      this.removeAttribute('open')
    }
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-nav-rail')
    this.container = document.createElement('div')
    this.container.classList.add('cdg-nav-rail-inner')
    this.container.innerHTML = this.innerHTML

    // Clear all
    this.textContent = ''
    this.appendChild(this.container)

    this.addEventListener('blur', this.handleBlur.bind(this))
    this.addEventListener('mouseenter', this.handleMouseEnter.bind(this))
    this.addEventListener('mouseleave', this.handleMouseLeave.bind(this))
  }

  attributeChangedCallback(attr) {
    if (attr === 'open') {
      // console.log('open nav rail', this.open)
    }
  }

  handleBlur() {
    requestAnimationFrame(() => {
      if (!this.contains(document.activeElement)) {
        this.open = false
      }
    })
  }

  handleMouseEnter() {
    this.timer = setTimeout(() => {
      this.open = true
    }, 500)
  }

  handleMouseLeave() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.open = false
  }
}
