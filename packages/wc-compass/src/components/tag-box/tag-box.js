import {CdgBaseComponent} from '../../shared/base-component'
import {isElement} from '../../shared/utilities'

const hiddenNumberWidth = 32
const iconToggleWidth = 24
const gapSpace = 8
const lastItemWidth = hiddenNumberWidth + gapSpace + iconToggleWidth

function createTagBoxItem(content) {
  const template = document.createElement('template')
  template.innerHTML = `
  <cdg-tag-box-item>${content}</cdg-tag-box-item>
  `
  return template
}

export class CdgTagBoxContainer extends CdgBaseComponent {
  labelElement
  containerElement
  mainElement
  bottomElement
  helperTextElement
  hiddenItemElements = []
  hiddenNumberElement
  ctaButtons
  toggleIconELement
  inputElement
  _show = false
  _type = 'text-box'

  get type() {
    return this.getAttribute('type') || 'text-box'
  }

  set type(value) {
    this._type = value
    this.containerElement.classList.add(`cdg-tag-box-${this._type}`)
  }

  get canInput() {
    return this._show || this.type !== 'text-box'
  }

  static get observedAttributes() {
    return ['type']
  }

  constructor() {
    super()
    this.mainElement = document.createElement('div')
    this.mainElement.classList.add('cdg-tag-box-main')

    if (this.hasAttribute('label-left')) {
      this.classList.add('cdg-tag-box-label-left')
    }

    this.createInputContent()

    if (this.hasAttribute('label')) {
      this.labelElement = document.createElement('span')
      this.labelElement.classList.add('cdg-input-label')
      this.labelElement.innerHTML = this.getAttribute('label')
      this.prepend(this.labelElement)
    }

    this.createBottomContainer()
  }

  createInputContent() {
    this.containerElement = document.createElement('div')
    this.containerElement.classList.add('cdg-tag-box-container')
    this.containerElement.tabIndex = 0

    this.initInputableEvents()

    // Add icon to first order
    if (this.hasAttribute('icon-name')) {
      const icon = document.createElement('cdg-icon')
      const iconContainer = document.createElement('div')
      iconContainer.classList.add('cdg-tag-box-pre-icon')
      icon.setAttribute('name', this.getAttribute('icon-name'))
      icon.setAttribute('size', '16')
      iconContainer.appendChild(icon)
      this.containerElement.prepend(iconContainer)
    }

    this.appendTagItemToContainer()

    this.mainElement.appendChild(this.containerElement)
    this.appendChild(this.mainElement)
    // Show/hide items for only text-box depends on the number of lines of tags
    if (this.type === 'text-box') {
      this.toggleItemForTextBox()
    }
  }

  appendTagItemToContainer() {
    for (let index = 0; index < this.childNodes.length; index++) {
      const element = this.childNodes.item(index)
      if (this.isTagBoxItem(element)) {
        element.addEventListener(
          'onRemoveItem',
          this.handleTagBoxItemRemoveClick.bind(this),
        )
        this.containerElement.appendChild(element)
      }
    }
  }

  initInputableEvents() {
    if (this.hasAttribute('inputable')) {
      this.inputElement = document.createElement('input')
      this.inputElement.classList.add('cdg-tag-box-input-text')
      this.containerElement.addEventListener(
        'focus',
        this.handleContainerFocus.bind(this),
      )
      this.containerElement.addEventListener(
        'blur',
        this.handleContainerBlur.bind(this),
      )

      this.inputElement.addEventListener(
        'blur',
        this.handleInputTextBlur.bind(this),
      )

      this.inputElement.addEventListener(
        'keyup',
        this.handleInputTextKeyUp.bind(this),
      )
    }
  }

  handleContainerFocus() {
    if (!this.canInput) return
    this.containerElement.appendChild(this.inputElement)
    this.inputElement.focus()
  }

  handleContainerBlur(event) {
    if (!this.canInput || event.relatedTarget === this.inputElement) {
      return
    }
    this.containerElement.removeChild(this.inputElement)
  }

  handleInputTextBlur(event) {
    const isBlurToContainerChildren =
      event.relatedTarget === this.containerElement ||
      this.containerElement.contains(event.relatedTarget)
    if (!this.canInput || isBlurToContainerChildren) {
      return
    }
    this.containerElement.removeChild(this.inputElement)
  }

  handleInputTextKeyUp(event) {
    const isEnterValue = event.key === 'Enter' && event.target.value
    if (!this.canInput || !isEnterValue) {
      return
    }
    const newTagBox = createTagBoxItem(event.target.value).content.cloneNode(
      true,
    )
    this.containerElement.appendChild(newTagBox)
    this.containerElement.lastElementChild.addEventListener(
      'onRemoveItem',
      this.handleTagBoxItemRemoveClick.bind(this),
    )
    this.inputElement.blur()
    this.inputElement.value = ''
    this.dispatchEvent(
      new CustomEvent('onAddItem', {
        detail: {item: this.containerElement.lastElementChild},
      }),
    )
    this.dispatchChangeEvent()
  }

  handleTagBoxItemRemoveClick(event) {
    const isInHidden = this.hiddenItemElements.includes(event.target)
    this.containerElement.removeChild(event.target)
    this.dispatchChangeEvent()
    if (this.type === 'message-box') {
      return
    }

    if (
      this.hiddenNumberElement &&
      this.containerElement.contains(this.hiddenNumberElement)
    ) {
      this.containerElement.removeChild(this.hiddenNumberElement)
    }

    if (isInHidden) {
      this.hiddenItemElements = this.hiddenItemElements.filter(
        (item) => item !== event.target,
      )
    } else {
      if (this.hiddenItemElements.length) {
        let index = this.hiddenItemElements.length
        while (index--) {
          const hidItem = this.hiddenItemElements[index]
          const itemWidth = this.realWidth(hidItem)
          const containerWidth = this.realWidth(this.containerElement, true)
          if (
            containerWidth + itemWidth + lastItemWidth <=
            this.containerElement.offsetWidth
          ) {
            this.containerElement.appendChild(hidItem)
            this.hiddenItemElements.splice(index, 1)
          } else {
            index = 0
          }
        }
      }
    }
    this.rerenderNumberOfHiddenItems()
  }

  toggleItemForTextBox() {
    let isNext = true
    while (isNext) {
      const containerWidth = this.realWidth(this.containerElement, true)
      const index = this.containerElement.childNodes.length - 1
      const element = this.containerElement.childNodes.item(index)
      isNext =
        containerWidth + lastItemWidth + 8 >= this.containerElement.offsetWidth
      if (isNext) {
        this.containerElement.removeChild(element)
        this.hiddenItemElements.push(element)
      }
    }

    this.createHiddenControl()
  }

  createHiddenControl() {
    if (this.hiddenItemElements.length > 0) {
      this.hiddenNumberElement = document.createElement('div')
      this.hiddenNumberElement.classList.add('cdg-tag-box-item')
      this.hiddenNumberElement.innerText = `+${this.hiddenItemElements.length}`
      this.containerElement.appendChild(this.hiddenNumberElement)

      // Create toggle icon on the right
      const toggleIcon = document.createElement('cdg-icon')
      this.toggleIconELement = document.createElement('button')
      this.toggleIconELement.classList.add('cdg-tag-box-toggle-icon')
      this.toggleIconELement.setAttribute('aria-label', 'Expand tag box button')
      toggleIcon.setAttribute('name', 'arrowDown')
      toggleIcon.setAttribute('size', '16')
      this.toggleIconELement.appendChild(toggleIcon)
      this.containerElement.appendChild(this.toggleIconELement)
      this.toggleIconELement.addEventListener(
        'click',
        this.handleToggleIconClick.bind(this),
      )
    }
  }

  handleToggleIconClick() {
    this._show = !this._show
    this.toggleIconELement.classList.toggle('cdg-tag-box-toggle-icon-show')
    this.containerElement.classList.toggle('open')
    this.hiddenNumberElement.style.display = !this._show ? 'flex' : 'none'

    this.removeInputText()
    this.rerenderTagItemWithHiddenNumber()
    this.rerenderNumberOfHiddenItems()
    this.renderInputText()
  }

  renderInputText() {
    if (this._show && !this.containerElement.contains(this.inputElement)) {
      this.containerElement.appendChild(this.inputElement)
      this.inputElement.focus()
    }
  }

  rerenderNumberOfHiddenItems() {
    if (this.hiddenItemElements.length > 0) {
      this.hiddenNumberElement.innerText = `+${this.hiddenItemElements.length}`
      if (!this.containerElement.contains(this.hiddenNumberElement)) {
        this.containerElement.appendChild(this.hiddenNumberElement)
      }
    } else {
      if (this.containerElement.contains(this.hiddenNumberElement)) {
        this.containerElement.removeChild(this.hiddenNumberElement)
      }
    }
  }

  rerenderTagItemWithHiddenNumber() {
    const removeIndex = []
    this.hiddenItemElements.reverse().forEach((hidItem, index) => {
      if (this._show) {
        this.containerElement.appendChild(hidItem)
      } else {
        const containerWidth = this.realWidth(this.containerElement, true)
        if (containerWidth >= this.containerElement.offsetWidth) {
          this.containerElement.removeChild(hidItem)
        } else {
          removeIndex.push(index)
        }
      }
    })
    removeIndex.forEach((index) => this.hiddenItemElements.splice(index, 1))
  }

  removeInputText() {
    if (!this._show) {
      if (this.containerElement.contains(this.inputElement)) {
        this.containerElement.removeChild(this.inputElement)
      }
    }
  }

  realWidth(obj, fitContent = false) {
    const clone = obj.cloneNode(true)
    clone.style.visibility = 'hidden'
    if (fitContent) {
      clone.style.width = 'fit-content'
    }
    document.querySelector('body').append(clone)
    const width = clone.offsetWidth
    clone.remove()
    return width
  }

  isTagBoxItem(el) {
    return isElement(el) && el.tagName.toLowerCase() === 'cdg-tag-box-item'
  }

  createBottomContainer() {
    this.ctaButtons = this.querySelectorAll('[tag-box-button]')
    this.hasHelperText = this.hasAttribute('helperText')
    // Show bottom when has helper-text or call to action buttons
    if (this.hasHelperText || this.ctaButtons.length) {
      this.bottomElement = document.createElement('div')
      this.bottomElement.classList.add('cdg-tag-box-bottom')
      // Create helper text on left
      if (this.hasHelperText) {
        this.helperTextElement = document.createElement('div')
        this.helperTextElement.classList.add('cdg-tag-box-bottom-text')
        this.helperTextElement.innerText = this.getAttribute('helperText')
        this.bottomElement.appendChild(this.helperTextElement)
      }
      // Create buttons container on right with attribute "tag-box-button"
      if (this.ctaButtons.length) {
        const ctaContainer = document.createElement('div')
        ctaContainer.classList.add('cdg-tag-box-bottom-text')
        for (let index = 0; index < this.ctaButtons.length; index++) {
          const element = this.ctaButtons.item(index)
          ctaContainer.appendChild(element)
        }
        this.bottomElement.appendChild(ctaContainer)
      }
      this.mainElement.appendChild(this.bottomElement)
    }
  }

  connectedCallback() {
    this.classList.add('cdg-tag-box')
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    this[attr] = newValue
  }

  dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent('onChange'))
  }
}
