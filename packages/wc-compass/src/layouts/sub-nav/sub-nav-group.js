import {CdgBaseComponent} from '../../shared/base-component'

export class CdgSubNavGroup extends CdgBaseComponent {
  static get observedAttributes() {
    return ['name']
  }

  get name() {
    return this.getAttribute('name') || ''
  }

  set name(name) {
    this.setAttribute('name', name)
  }

  isOpen = true

  groupInner
  content
  nameElement
  arrowElement

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-sub-nav-group')
    this.classList.add('open')
    this.groupInner = document.createElement('button')
    this.groupInner.setAttribute(
      'class',
      'cdg-button ghost cdg-sub-nav-group-inner',
    )

    this.content = document.createElement('div')
    this.content.classList.add('cdg-sub-nav-group-content')
    this.content.innerHTML = this.innerHTML

    this.textContent = ''
    this.appendChild(this.groupInner)
    this.appendChild(this.content)

    this.attachIcon()
    this.attachGroupName()

    this.groupInner.addEventListener('click', this.handleToggle.bind(this))
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'name':
        this.updateGroupName()
        break

      default:
        break
    }
  }

  attachIcon() {
    this.arrowElement = document.createElement('cdg-icon')
    this.arrowElement.classList.add('cdg-expand-icon')
    this.arrowElement.setAttribute('size', '16')
    this.arrowElement.setAttribute('name', 'filledArrowDown')
    this.groupInner.appendChild(this.arrowElement)
  }

  attachGroupName() {
    this.nameElement = document.createElement('div')
    this.nameElement.classList.add('cdg-sub-nav-group-name')
    this.nameElement.textContent = this.name
    this.groupInner.appendChild(this.nameElement)
  }

  updateGroupName() {
    if (!this.nameElement) {
      return
    }

    this.nameElement.textContent = this.name
  }

  handleToggle() {
    this.isOpen = !this.isOpen
    if (this.isOpen) {
      this.classList.add('open')
    } else {
      this.classList.remove('open')
    }
    if (this.isOpen) {
      this.content.style.maxHeight = this.content.scrollHeight + 'px'
      setTimeout(() => {
        this.content.style.maxHeight = ''
      })
    } else {
      this.content.style.maxHeight = '0px'
    }
  }
}
