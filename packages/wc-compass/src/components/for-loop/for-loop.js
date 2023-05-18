import get from 'lodash.get'

export class CdgForLoop extends HTMLElement {
  constructor() {
    super()
    this.firsLoad = true
  }

  static get observedAttributes() {
    return ['items', 'for']
  }

  get items() {
    return JSON.parse(this.getAttribute('items') || '[]')
  }

  get for() {
    return JSON.parse(this.getAttribute('for') || 0)
  }

  set items(value) {
    this.setAttribute('items', JSON.stringify(value))
    this.render()
  }

  set for(value) {
    this.setAttribute('for', JSON.stringify(value))
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'for' || name == 'items') {
      this.render()
    }
  }

  render() {
    const c = this.innerHTML.trim()
    const template = this.querySelector('template')
    if (!this.firsLoad) {
      // after first load (template tag has been removed)

      // if attribute for is provided -> only loop for [for] times, without [items]
      if (this.for && this.save != null) {
        this.innerHTML = ''
        for (let i = 0; i < parseInt(this.for); i++) {
          this.appendChildToThis(null)
        }
        return
      }

      // if has [items], loop with the object pass into it
      if (!template && this.items.length > 0) {
        this.innerHTML = ''
        this.items.forEach((item) => {
          this.appendChildToThis(item)
        })
      }
      return
    }
    // first load
    this.firsLoad = false
    this.save = c.replace('<template>', '').replace('</template>', '')
    this.innerHTML = ''
    // if attribute for is provided -> only loop for [for] times, without [items]
    if (this.for) {
      for (let i = 0; i < parseInt(this.for); i++) {
        this.appendChildToThis(null)
      }
      return
    }

    // if has [items], loop with the object pass into it
    this.items.forEach((item) => {
      this.appendChildToThis(item)
    })
  }

  appendChildToThis(item) {
    const nodes = this.replacePlaceholderFromNodes(this.save, item)
    nodes.forEach((node) => {
      this.appendChild(node)
    })
  }

  replacePlaceholderFromNodes(html, obj) {
    const nodes = new DOMParser().parseFromString(
      this.replacePlaceholders(html, obj),
      'text/html',
    ).body.childNodes

    return nodes
  }

  replacePlaceholders(str, obj) {
    return str.replace(/{{([^{}]*)}}/g, (match, key) => {
      const getKeysFromString = key.split('.').slice(1).join('.')
      if (!getKeysFromString) {
        return obj || ''
      }
      return get(obj, getKeysFromString) || ''
    })
  }
}
