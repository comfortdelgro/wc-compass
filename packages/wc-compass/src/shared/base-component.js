import {replacePlaceholders} from './dom'

export class CdgBaseComponent extends HTMLElement {
  set instance(instance) {
    Object.keys(instance).forEach((key) => {
      this[key] = instance[key]
    })
    this.render()
  }

  get instance() {
    return this
  }

  constructor() {
    super()
  }

  render() {
    if (this.template) {
      this.innerHTML = this.complie()
    }
    this.afterViewInit()
  }

  complie() {
    return replacePlaceholders(this.template, this)
  }

  afterViewInit() {}
}
