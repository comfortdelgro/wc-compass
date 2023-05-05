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
    this.tabIndex = 0
    this.container = document.createElement('div')
    this.container.classList.add('cdg-nav-rail-inner')
    this.container.innerHTML = this.innerHTML

    // Clear all
    this.textContent = ''
    this.appendChild(this.container)

    this.addEventListener('focus', this.handleFocus.bind(this))
    this.container.addEventListener(
      'mouseover',
      this.handleMouseEnter.bind(this),
    )
    this.container.addEventListener(
      'mouseleave',
      this.handleMouseLeave.bind(this),
    )
    this.addEventListener('mousedown', this.handleMouseDown.bind(this))
  }

  attributeChangedCallback(attr) {
    if (attr === 'open') {
      if (!this.open) {
        this.dispatchEvent(new CustomEvent('close'))
      }
    }
  }

  handleMouseDown(event) {
    if (event.target.isEqualNode(this)) {
      this.open = false
    }
  }

  handleFocus() {
    this.addEventListener('blur', this.handleBlur.bind(this))
  }

  handleBlur() {
    requestAnimationFrame(() => {
      if (!this.contains(document.activeElement)) {
        this.removeEventListener('blur', this.handleBlur.bind(this))
        this.open = false
      }
    })
  }

  handleMouseEnter() {
    if (this.timer || window.innerWidth < 768) {
      return
    }
    this.timer = setTimeout(() => {
      this.open = true
      this.timer = null
    }, 500)
  }

  handleMouseLeave() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    if (window.innerWidth >= 768) {
      this.open = false
    }
  }
}
