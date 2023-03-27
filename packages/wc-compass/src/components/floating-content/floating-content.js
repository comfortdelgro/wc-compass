import {getScrollParent} from '../../shared/utilities'

const template = document.createElement('template')
template.innerHTML = `
    <div class="cdg-floating-content-overlay"></div>
`
const ARROW_HEIGHT = 8
const OUTLINE_HEIGHT = 2
export const DIRECTIONS = [
  'topLeft',
  'top',
  'topRight',
  'leftTop',
  'left',
  'leftBottom',
  'rightTop',
  'right',
  'rightBottom',
  'bottomLeft',
  'bottom',
  'bottomRight',
]

export class CdgFloatingContent extends HTMLElement {
  _position = 'bottom'
  containerElement
  childrenNode

  get position() {
    return this._position
  }

  set position(value) {
    this._position = value
    this.classList.remove(...DIRECTIONS)
    this.classList.add('cdg-floating-content')
    this.hasAttribute('hasArrow') && this.classList.add('hasArrow')
    this.classList.add(this._position)
  }

  static get observedAttributes() {
    return ['opening', 'placement', 'has-outline']
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-floating-content')
    this.addEventListener('mousedown', (event) => {
      event.preventDefault()
    })
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    switch (attr) {
      case 'placement':
        this.position = newValue
        break
      case 'has-outline':
        this.hasOutline = newValue
        break
      case 'opening':
        if (newValue) {
          this.style.height = 'auto'
          this.eventScroll = this.handleWindowScroll.bind(this)
          window.addEventListener('scroll', this.eventScroll, true)

          if (this.parentElement) {
            const anchorElement = this.parentElement.anchorElement
            setTimeout(() => {
              this.style.visibility = 'visible'
              this.style.opacity = '1'
              const newPosition = getNewPosition(
                anchorElement,
                this.position,
                this.clientHeight,
                this.clientWidth,
                this.classList.contains('hasArrow'),
                this.hasOutline,
              )

              this.style.top = `${newPosition.topPosition}px`
              this.style.left = `${newPosition.leftPosition}px`
            }, 0)

            document.body.appendChild(this.parentElement)
          }
        } else {
          window.removeEventListener('scroll', this.eventScroll, true)
          this.style.visibility = 'hidden'
          this.style.opacity = '0'
          this.style.height = '0'

          if (this.parentElement) {
            document.body.removeChild(this.parentElement)
          }
        }
        break

      default:
        break
    }
  }

  handleWindowScroll() {
    if (
      this.parentElement &&
      this.hasAttribute('opening') &&
      this.getAttribute('opening')
    ) {
      const newPosition = getNewPosition(
        this.parentElement.anchorElement,
        this.position,
        this.clientHeight,
        this.clientWidth,
        this.classList.contains('hasArrow'),
        this.hasOutline,
      )

      this.style.top = `${newPosition.topPosition}px`
      this.style.left = `${newPosition.leftPosition}px`
    }
  }
}

/**
 * Create a new floating component
 * @param {HTMLElement} anchorElement Origin element
 * @param {HTMLElement} contentElement Content popup
 * @param {string} position Floating position relative to the origin
 * @param {string} rootClass Add class to overlay
 * @param {boolean} isFullWidth Is full-width with origin
 * @param {boolean} hasArrow has arrow on floating
 * @returns {CdgFloatingContent} Floating element
 */
export function createFloating(
  anchorElement,
  contentElement = null,
  position = 'bottom',
  rootClass = '',
  isFullWidth = false,
  hasArrow = false,
  hasOutline = false,
  hasbackdrop = true,
) {
  // Create overlay for floating
  const containerElement = document.createElement('div')
  containerElement.setAttribute('class', 'cdg-floating-content-overlay')
  containerElement.anchorElement = anchorElement
  rootClass && containerElement.classList.add(rootClass)

  let backdropElement
  if (hasbackdrop) {
    // Create backdrop for floating
    backdropElement = document.createElement('div')
    backdropElement.setAttribute('class', 'cdg-floating-content-backdrop')
    backdropElement.addEventListener('click', () => {
      this.removeAttribute('opening')
      this.dispatchEvent(new CustomEvent('onDropdownSelectClose'))
    })
  }

  // Create new floating
  const floatingElement = document.createElement('cdg-floating-content')
  floatingElement.setAttribute('placement', position)
  floatingElement.classList.add(position)
  if (hasArrow) {
    floatingElement.classList.add('hasArrow')
    floatingElement.setAttribute('hasArrow', 'true')
  }
  hasOutline && floatingElement.setAttribute('has-outline', true)

  // 100% width of the origin
  if (isFullWidth) {
    floatingElement.style.minWidth = `${anchorElement.clientWidth}px`
  }

  floatingElement.appendChild(contentElement || this)
  if (hasbackdrop) {
    containerElement.appendChild(backdropElement)
  }
  containerElement.append(floatingElement)
  return floatingElement
}

function getNewPosition(
  anchorElement,
  position,
  currentHeight = 0,
  currentWidth = 0,
  hasArrow = false,
  hasOutline = false,
) {
  let topPosition = 0
  let leftPosition = 0
  const nearestScrollParent = getScrollParent(anchorElement)
  const scrollTop = nearestScrollParent ? nearestScrollParent.scrollTop || 0 : 0
  const scrollLeft = nearestScrollParent
    ? nearestScrollParent.scrollLeft || 0
    : 0
  const arrowHeight = hasArrow ? ARROW_HEIGHT : 0
  const outlineHeight = hasOutline ? OUTLINE_HEIGHT : 0

  const boundLeft = anchorElement.getBoundingClientRect().left
  const boundTop = anchorElement.getBoundingClientRect().top

  // Set position by placement param
  switch (position) {
    case 'topLeft':
      topPosition =
        boundTop - currentHeight - scrollTop - arrowHeight - outlineHeight
      leftPosition = boundLeft - scrollLeft
      break
    case 'top':
      topPosition =
        boundTop - currentHeight - scrollTop - arrowHeight - outlineHeight
      leftPosition = boundLeft + anchorElement.clientWidth / 2 - scrollLeft
      break
    case 'topRight':
      topPosition =
        boundTop - currentHeight - scrollTop - arrowHeight - outlineHeight
      leftPosition = boundLeft + anchorElement.clientWidth - currentWidth
      break
    case 'leftTop':
      topPosition = boundTop - scrollTop
      leftPosition =
        boundLeft - currentWidth - scrollLeft - arrowHeight - outlineHeight
      break
    case 'left':
      topPosition = boundTop + anchorElement.clientHeight / 2 - scrollTop
      leftPosition =
        boundLeft - currentWidth - scrollLeft - arrowHeight - outlineHeight
      break
    case 'leftBottom':
      topPosition = boundTop + anchorElement.clientHeight - scrollTop
      leftPosition =
        boundLeft - currentWidth - scrollLeft - arrowHeight - outlineHeight
      break
    case 'rightTop':
      topPosition = boundTop - scrollTop
      leftPosition =
        boundLeft +
        anchorElement.clientWidth -
        scrollLeft +
        arrowHeight +
        outlineHeight
      break
    case 'right':
      topPosition = boundTop + anchorElement.clientHeight / 2 - scrollTop
      leftPosition =
        boundLeft +
        anchorElement.clientWidth -
        scrollLeft +
        arrowHeight +
        outlineHeight
      break
    case 'rightBottom':
      topPosition = boundTop + anchorElement.clientHeight - scrollTop
      leftPosition =
        boundLeft +
        anchorElement.clientWidth -
        scrollLeft +
        arrowHeight +
        outlineHeight
      break
    case 'bottomLeft':
      topPosition =
        boundTop +
        anchorElement.clientHeight -
        scrollTop +
        arrowHeight +
        outlineHeight
      leftPosition = boundLeft - scrollLeft
      break
    case 'bottom':
      topPosition =
        boundTop +
        anchorElement.clientHeight -
        scrollTop +
        arrowHeight +
        outlineHeight
      leftPosition = boundLeft + anchorElement.clientWidth / 2 - scrollLeft
      break
    case 'bottomRight':
      topPosition =
        boundTop +
        anchorElement.clientHeight -
        scrollTop +
        arrowHeight +
        outlineHeight
      leftPosition = boundLeft + anchorElement.clientWidth - scrollLeft
      break

    default:
      break
  }
  return {topPosition, leftPosition}
}
