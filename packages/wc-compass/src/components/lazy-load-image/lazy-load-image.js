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

  // If image fail to load and there is user fallback src
  //  -> load user fallback src
  // else
  //  -> load default fallback src
  handleImageError() {
    const fallbackSrc = this.attributes?.fallbackSrc?.value
    // Set fallback retry times to prevent callback loop when the fallback itself is causing errors
    if (this.userFallbackRetry < MAX_RETRY_TIMES && fallbackSrc) {
      this.userFallbackRetry = this.userFallbackRetry + 1
      this.image.src = fallbackSrc
    } else if (this.defaultFallbackRetry < MAX_RETRY_TIMES) {
      this.defaultFallbackRetry = this.defaultFallbackRetry + 1
      this.image.src = placeholderSrc
    }
  }

  lazyLoadImage() {
    const {src, width, height, ...props} = this.attributes
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

      if (src.value) this.image.src = src.value
    }
    // if browser not support loading='lazy' -> use intersection observer to watch the image
    else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && src.value) {
            this.image.src = src.value
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
