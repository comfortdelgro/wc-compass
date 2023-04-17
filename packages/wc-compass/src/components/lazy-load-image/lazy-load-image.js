const imageTemplate = document.createElement('template')

//TODO: remove this outside source url later, use wc-compass image placeholder instead
const placeholderSrc =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoNaLFFSdD4YhW8mqgDBSWY8nHnte6ANHQWz6Lsl37yA&s'

const MAX_RETRY_TIMES = 5

imageTemplate.innerHTML = `
  <style>
    :host {
      display: block;
    }
  </style>
  <img src=${placeholderSrc}/>
`

export class CdgLazyLoadImage extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({mode: 'open'})
    const templateContent = imageTemplate.content.cloneNode(true)
    shadowRoot.appendChild(templateContent)

    this.userFallbackRetry = 0
    this.defaultFallbackRetry = 0
    this.image = shadowRoot.querySelector('img')
    this.image.addEventListener('error', () => this.handleImageError())
    this.lazyLoadImage()
  }

  static get observedAttributes() {
    return ['src', 'width', 'height', 'fallbackSrc']
  }

  get src() {
    return this.getAttribute('src')
  }

  get width() {
    return this.getAttribute('width')
  }

  get height() {
    return this.getAttribute('height')
  }

  get fallbackSrc() {
    return this.getAttribute('fallbackSrc')
  }

  // If image fail to load and there is user fallback src
  //  -> load user fallback src
  // else
  //  -> load default fallback src
  handleImageError() {
    // Set fallback retry times to prevent callback loop when the fallback itself is causing errors
    if (this.userFallbackRetry < MAX_RETRY_TIMES && this.fallbackSrc) {
      this.userFallbackRetry = this.userFallbackRetry + 1
      this.image.src = this.fallbackSrc
    } else if (this.defaultFallbackRetry < MAX_RETRY_TIMES) {
      this.defaultFallbackRetry = this.defaultFallbackRetry + 1
      this.image.src = placeholderSrc
    }
  }

  lazyLoadImage() {
    const props = this.attributes
    // pass the rest of the props
    Object.entries(props).forEach(([_, value]) => {
      if (value.name !== 'src') {
        this.image.setAttribute(value.name, value.value)
      }
    })

    // if browser support -> set loading='lazy'
    if (this.isBrowserSupportLazyLoading()) {
      // Set the loading attribute of the image element to 'lazy'
      this.image.setAttribute('loading', 'lazy')

      if (this.src) this.image.src = this.src
    }
    // if browser not support loading='lazy' -> use intersection observer to watch the image
    else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && this.src) {
            this.image.src = this.src
            observer.disconnect()
          }
        })
      })
      observer.observe(this)
    }
  }

  isBrowserSupportLazyLoading() {
    return 'loading' in HTMLImageElement.prototype
  }

  disconnectedCallback() {
    this.image.removeEventListener('error', this.handleImageError)
  }
}
