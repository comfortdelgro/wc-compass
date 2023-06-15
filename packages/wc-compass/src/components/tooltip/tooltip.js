import {createFloating, DIRECTIONS} from '../floating-content/floating-content'

const HEIGHT_ARROW = 12

const createTemplateHeader = function (type) {
  const templateHeader = document.createElement('template')
  templateHeader.innerHTML = `
  <div class="cdg-tooltip-header">
      <span class="header-title"></span>
      <button class="header-close-button cdg-button ${type}">
          <cdg-icon name="close" size="16" />
      </button>
  </div>
  `

  return templateHeader
}

export class CdgTooltip extends HTMLElement {
  floatingElement
  anchorElement
  cdgTooltipContentElement
  _placement = 'top'
  _type = 'primary'
  trigger = 'hover'
  headerElement
  bottomElement
  title = ''
  hasArrow = true
  openDelay = 0
  closeDelay = 0
  disableInteractive = false
  deplayTimeout

  get placement() {
    return this._placement ? 'top' : this._placement
  }

  set placement(value) {
    this._placement = !DIRECTIONS.includes(value) ? 'top' : value
    if (this.floatingElement) {
      this.floatingElement.setAttribute('placement', this._placement)
    }
  }

  get open() {
    return this._open
  }

  set open(value) {
    if (this.floatingElement) {
      if (this.deplayTimeout) {
        clearTimeout(this.deplayTimeout)
      }
      if (value) {
        this.deplayTimeout = setTimeout(() => {
          this.floatingElement.setAttribute('open', 'true')
          clearTimeout(this.deplayTimeout)
        }, this.openDelay)
      } else {
        this.removeAttribute('open')
        this.deplayTimeout = setTimeout(() => {
          this.floatingElement.removeAttribute('open')
          clearTimeout(this.deplayTimeout)
        }, this.closeDelay)
      }
    }
    this._open = value
  }

  get type() {
    return this._type
  }

  set type(value) {
    if (value && this.floatingElement) {
      this.floatingElement.classList.remove(this._type)
      this.floatingElement.classList.add(value)
    }
    this._type = value
  }

  static get observedAttributes() {
    return [
      'placement',
      'title',
      'trigger',
      'type',
      'open',
      'hide-arrow',
      'hide-close-button',
      'content-wrapper-class',
      'open-delay',
      'close-delay',
      'disable-interactive',
    ]
  }

  constructor() {
    super()
    this.title = this.getAttribute('title') || ''
    this.hasArrow = !this.hasAttribute('hide-arrow')
    this.disableInteractive = this.hasAttribute('disable-interactive')
    if (this.hasAttribute('open-delay')) {
      this.openDelay = Number(this.getAttribute('open-delay'))
    }
    if (this.hasAttribute('close-delay')) {
      this.closeDelay = Number(this.getAttribute('close-delay'))
    }
    if (!this.anchorElement) {
      this.anchorElement = this.querySelector('[cdg-tooltip-header]')
    }
    if (!this.cdgTooltipContentElement) {
      this.cdgTooltipContentElement = this.querySelector(
        '[cdg-tooltip-content]',
      )
      if (!this.cdgTooltipContentElement) {
        this.cdgTooltipContentElement = document.createElement('div')
      }
      this.cdgTooltipContentElement.classList.add('cdg-tooltip-main-content')
      this.createHeaderAndBottomTooltip()
    }
  }

  connectedCallback() {
    this.classList.add('cdg-tooltip')
    if (!this.floatingElement) {
      const floatingClass = this.hasAttribute('content-wrapper-class')
        ? this.getAttribute('content-wrapper-class').split(',')
        : []
      floatingClass.push('cdg-tooltip-floating-container')
      if (!this.hasArrow) {
        floatingClass.push('cdg-tooltip-floating-container-hide-arrow')
      }
      this.floatingElement = createFloating.bind(this)(
        this.anchorElement,
        this.cdgTooltipContentElement,
        this.placement,
        floatingClass,
        false,
        true,
        true,
        false,
      )
      this.open = this.getAttribute('open')
      if (
        this.hasAttribute('placement') &&
        DIRECTIONS.includes(this.getAttribute('placement'))
      ) {
        this.placement = this.getAttribute('placement')
      } else {
        this.placement = 'top'
      }

      if (this.hasAttribute('type')) {
        this.type = this.getAttribute('type')
        this.floatingElement.classList.add(this.type)
      }

      this.bindEvents()
    }
  }

  createHeaderAndBottomTooltip() {
    if (!this.hasAttribute('hide-close-button')) {
      // Create header of tooltip
      this.cdgTooltipContentElement.prepend(
        createTemplateHeader(this.type).content.cloneNode(true),
      )
      this.headerElement = this.cdgTooltipContentElement.querySelector(
        'div.cdg-tooltip-header',
      )
      const headerTitleElement =
        this.headerElement.querySelector('.header-title')
      headerTitleElement.textContent = this.title
      this.headerElement
        .querySelector('.header-close-button')
        .addEventListener('click', () => {
          this.changeOpen(false)
        })
    }
    // Create bottom of tooltip
    this.bottomElement = this.querySelector('[cdg-tooltip-bottom]')
    if (this.bottomElement) {
      this.cdgTooltipContentElement.append(this.bottomElement)
      const closeButtons =
        this.bottomElement.querySelectorAll('[click-to-close]')
      if (closeButtons) {
        const currentComponent = this
        closeButtons.forEach((closeButton) => {
          closeButton.addEventListener('click', () => {
            currentComponent.changeOpen(false)
          })
        })
      }
    }
  }

  bindEvents() {
    if (
      this.hasAttribute('trigger') &&
      ['click', 'focus', 'hover'].includes(this.getAttribute('trigger'))
    ) {
      this.trigger = this.getAttribute('trigger')
    }
    if (this.trigger === 'click') {
      this.anchorElement.addEventListener('click', () => {
        this.changeOpen(true)
      })
      this.anchorElement.addEventListener('blur', () => {
        this.changeOpen(false)
      })
    } else if (this.trigger === 'hover') {
      this.anchorElement.addEventListener('mouseenter', () => {
        this.changeOpen(true)
      })
      this.anchorElement.addEventListener(
        'mouseleave',
        this.handleAnchorMouseLeave.bind(this),
      )
      this.floatingElement.addEventListener(
        'mouseleave',
        this.handleFloatingMouseLeave.bind(this),
      )
    } else if (this.trigger === 'focus') {
      this.anchorElement.addEventListener('focusin', () => {
        this.changeOpen(true)
      })
      this.anchorElement.addEventListener('focusout', () => {
        this.changeOpen(false)
      })
    }
  }

  handleAnchorMouseLeave(event) {
    if (this.disableInteractive) {
      this.changeOpen(false)
      return
    }
    const floatingBound = this.floatingElement.getBoundingClientRect()
    const placement = this.getAttribute('placement') || 'top'
    let left = 0
    let right = 0
    let top = 0
    let bottom = 0
    switch (placement) {
      case 'topLeft':
      case 'top':
      case 'topRight':
        left = floatingBound.left
        right = floatingBound.right
        top = floatingBound.top + HEIGHT_ARROW
        bottom = floatingBound.bottom + HEIGHT_ARROW
        break
      case 'bottomLeft':
      case 'bottom':
      case 'bottomRight':
        left = floatingBound.left
        right = floatingBound.right
        top = floatingBound.top - HEIGHT_ARROW
        bottom = floatingBound.bottom - HEIGHT_ARROW
        break
      case 'leftTop':
      case 'left':
      case 'leftBottom':
        left = floatingBound.left + HEIGHT_ARROW
        right = floatingBound.right + HEIGHT_ARROW
        top = floatingBound.top
        bottom = floatingBound.bottom
        break
      case 'rightTop':
      case 'right':
      case 'rightBottom':
        left = floatingBound.left - HEIGHT_ARROW
        right = floatingBound.right - HEIGHT_ARROW
        top = floatingBound.top
        bottom = floatingBound.bottom
        break
      default:
        break
    }
    // related target is floating content
    const isContains =
      (left <= event.clientX &&
        event.clientX <= right &&
        top <= event.clientY &&
        event.clientY <= bottom) ||
      this.anchorElement.contains(event.relatedTarget)
    if (!isContains) {
      this.changeOpen(false)
    }
  }

  handleFloatingMouseLeave(event) {
    const placement = this.getAttribute('placement') || 'bottom'
    const anchorBound = this.anchorElement.getBoundingClientRect()
    let left = 0
    let right = 0
    let top = 0
    let bottom = 0
    switch (placement) {
      case 'topLeft':
      case 'top':
      case 'topRight':
        left = anchorBound.left
        right = anchorBound.right
        top = anchorBound.top - HEIGHT_ARROW
        bottom = anchorBound.bottom - HEIGHT_ARROW
        break
      case 'bottomLeft':
      case 'bottom':
      case 'bottomRight':
        left = anchorBound.left
        right = anchorBound.right
        top = anchorBound.top + HEIGHT_ARROW
        bottom = anchorBound.bottom + HEIGHT_ARROW
        break
      case 'leftTop':
      case 'left':
      case 'leftBottom':
        left = anchorBound.left - HEIGHT_ARROW
        right = anchorBound.right - HEIGHT_ARROW
        top = anchorBound.top
        bottom = anchorBound.bottom
        break
      case 'rightTop':
      case 'right':
      case 'rightBottom':
        left = anchorBound.left + HEIGHT_ARROW
        right = anchorBound.right + HEIGHT_ARROW
        top = anchorBound.top
        bottom = anchorBound.bottom
        break

      default:
        break
    }
    // related target is anchor element
    const isContains =
      (left <= event.clientX &&
        event.clientX <= right &&
        top <= event.clientY &&
        event.clientY <= bottom) ||
      this.anchorElement.contains(event.relatedTarget)
    if (!isContains) {
      this.changeOpen(false)
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return

    switch (attr) {
      case 'open-delay':
        this.openDelay = Number(newValue)
        break
      case 'close-delay':
        this.closeDelay = Number(newValue)
        break
      case 'disable-interactive':
        this.disableInteractive = this.hasAttribute('disable-interactive')
        break

      default:
        this[attr] = newValue
        if (attr === 'title') {
          if (this.headerElement) {
            this.headerElement.querySelector('.header-title').textContent =
              newValue
          }
        }
        break
    }
  }

  changeOpen(status) {
    if (status) {
      this.setAttribute('open', 'true')
    } else {
      this.removeAttribute('open')
    }
    this.dispatchEvent(new CustomEvent('onOpenChange', {detail: status}))
    this.open = status
  }
}
