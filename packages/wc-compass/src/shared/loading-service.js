export class CdgLoadingItem {
  id
  element
  host
  constructor(id, host, element) {
    this.id = id
    this.host = host
    this.element = element
  }

  show() {
    this.host.appendChild(this.element)
  }

  hide() {
    this.host.removeChild(this.element)
  }
}

export class CdgLoadingService {
  loaders = {}
  globalIds = []
  type = 'global'

  globalLoader

  show(type = 'global', host) {
    this.type = type
    if (this.type === 'global') {
      return this.showGlobal()
    } else {
      return this.showLocal(host)
    }
  }

  hide(id) {
    if (this.loaders[id]) {
      this.loaders[id].hide()
    } else {
      this.hideGlobal(id)
    }
  }

  hideGlobal(id) {
    const index = this.globalIds.indexOf(id)
    if (index !== -1) {
      this.globalIds.splice(index, 1)
      if (!this.globalIds.length) {
        this.globalLoader.classList.remove('show')
      }
    }
  }

  showLocal(host) {
    if (host) {
      host.style.position = 'relative'
      const id = new Date().getTime()
      const loadingElement = this.createLoader()
      loadingElement.classList.add('local')
      this.loaders[id] = new CdgLoadingItem(id, host, loadingElement)
      this.loaders[id].show()
      return id
    }

    return null
  }

  showGlobal() {
    if (!this.globalLoader) {
      this.globalLoader = document.querySelector('body > .cdg-loading-wrapper')
      if (!this.globalLoader) {
        this.globalLoader = this.createLoader()
        document.body.appendChild(this.globalLoader)
      }
    }

    const id = new Date().getTime()
    this.globalIds.push(id)
    this.globalLoader.classList.add('show')

    return id
  }

  createLoader() {
    const wrapper = document.createElement('cdg-loading-wrapper')
    wrapper.classList.add('cdg-loading-wrapper')
    const loader = document.createElement('cdg-loading')
    loader.setAttribute('size', 'medium')
    wrapper.appendChild(loader)

    return wrapper
  }
}
