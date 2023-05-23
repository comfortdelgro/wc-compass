import {replacePlaceholders} from './dom'

export class CdgLoop {
  container
  items
  template
  templateInner
  constructor(container) {
    this.firsLoad = true
    this.container = container
    this.template = this.container.querySelector('template')

    const content = this.container.innerHTML.trim()
    this.templateInner = content
      .replace('<template>', '')
      .replace('</template>', '')

    this.container.removeChild(this.template)
  }

  for(count) {
    if (count) {
      for (let i = 0; i < count; i++) {
        this.appendChildToThis(null)
      }
      return
    }
  }

  loop(data) {
    this.container.textContent = ''
    this.items = data
    const focusItem = document.activeElement
    // if has [items], loop with the object pass into it
    this.items.forEach((item) => {
      this.appendChildToThis(item)
    })
    focusItem.focus()
  }

  appendChildToThis(item) {
    const nodes = this.replacePlaceholderFromNodes(this.templateInner, item)
    nodes.forEach((node) => {
      this.container.appendChild(node)
      node.instance = item
    })
  }

  replacePlaceholderFromNodes(html, obj) {
    const nodes = new DOMParser().parseFromString(
      replacePlaceholders(html, obj),
      'text/html',
    ).body.childNodes

    return nodes
  }
}
