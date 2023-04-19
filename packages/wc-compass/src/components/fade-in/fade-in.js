export class CdgFadeIn extends HTMLElement {
  constructor() {
    super()
    this.options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    }
    this.callback = this.callback.bind(this)
    this.observer = new IntersectionObserver(this.callback, this.options)
  }

  get delay() {
    return this.getAttribute('delay')
  }

  get transition() {
    return this.getAttribute('transition')
  }

  connectedCallback() {
    this.classList.add('cdg-fade-in')
    if (this.transition === 'slide-in') {
      this.classList.add('cdg-slide-in')
    }
    this.observer.observe(this)
  }

  callback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          this.classList.add('cdg-fade-in-visible')
        }, this.delay)
        this.observer.unobserve(entry.target)
      }
    })
  }
}
