import {CdgBaseComponent} from '../../shared/base-component'
import {createFloating} from '../floating-content/floating-content'
import {FULL_TIME_REGEX, HALF_TIME_REGEX} from '../time-dropdown/time-dropdown'

const inputTemplate = document.createElement('template')
inputTemplate.innerHTML = `
<label class="cdg-input-group">
  <div class="cdg-input-with-icon right">
    <input class="cdg-input time-picker-input-container" />
    <cdg-icon name="clock"></cdg-icon>
  </div>
</label>
`
const PLACEHOLDER_DEFAULT = 'HH:MM AA'
const TIME_DROPDOWN_HEIGHT = 320

export class CdgTimePicker extends CdgBaseComponent {
  floatingElement
  anchorElement
  rootValue = ''
  format = 'half'
  regex = HALF_TIME_REGEX

  set value(newValue) {
    if (newValue && this.regex.test(newValue)) {
      if (this.timeDropdownElement) {
        this.timeDropdownElement.setAttribute('value', newValue)
      }
      if (this.anchorElement) {
        this.anchorElement.value = newValue
      }
    }
  }

  set placeholder(value) {
    if (!this.anchorElement) {
      return
    }
    if (value) {
      this.anchorElement.placeholder = value
    } else {
      this.anchorElement.placeholder = PLACEHOLDER_DEFAULT
    }
  }

  static get observedAttributes() {
    return ['value', 'placeholder', 'minute-step', 'format']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    this[attr] = newValue
  }

  constructor() {
    super()

    this.appendChild(inputTemplate.content.cloneNode(true))

    this.timeDropdownElement = document.createElement('cdg-time-dropdown')
    this.timeDropdownElement.setAttribute('has-bottom', '')
    if (this.hasAttribute('minute-step')) {
      this.timeDropdownElement.setAttribute(
        'minute-step',
        this.getAttribute('minute-step'),
      )
    }
    if (this.hasAttribute('format')) {
      this.timeDropdownElement.setAttribute(
        'format',
        this.getAttribute('format'),
      )
    }
    this.regex =
      this.getAttribute('format') === 'full' ? FULL_TIME_REGEX : HALF_TIME_REGEX
    if (this.hasAttribute('value')) {
      this.timeDropdownElement.setAttribute('value', this.getAttribute('value'))
    }
    this.timeDropdownElement.addEventListener(
      'onTimeClick',
      this.handleDropdownTimeItemClick.bind(this),
    )
    this.timeDropdownElement.addEventListener(
      'onTimeChange',
      this.handleDropdownTimeChange.bind(this),
    )

    this.anchorElement = this.querySelector('.time-picker-input-container')
    this.anchorElement.placeholder =
      this.getAttribute('placeholder') || PLACEHOLDER_DEFAULT
    this.anchorElement.addEventListener(
      'focusin',
      this.handleInputTimeFocusIn.bind(this),
    )
    this.anchorElement.addEventListener(
      'keyup',
      this.handleInputTimeKeyUp.bind(this),
    )
    this.anchorElement.addEventListener(
      'blur',
      this.handleInputTimeBlur.bind(this),
    )
  }

  connectedCallback() {
    this.classList.add('cdg-time-picker')

    if (!this.floatingElement) {
      this.floatingElement = createFloating.bind(this)(
        this.anchorElement,
        this.timeDropdownElement,
        'bottomLeft',
        'cdg-time-dropdown-floating-container',
        false,
        false,
        true,
        false,
      )
    }
  }

  handleDropdownTimeItemClick(event) {
    const {hour, minute, time, displayValue} = event.detail
    this.anchorElement.value = displayValue
    this.timeDropdownElement.setAttribute('value', this.anchorElement.value)
    this.dispatchEvent(
      new CustomEvent('onTimeClick', {
        detail: {hour, minute, time, displayValue},
      }),
    )
  }

  handleDropdownTimeChange(event) {
    const {hour, minute, time, displayValue} = event.detail
    this.anchorElement.value = displayValue
    this.rootValue = this.anchorElement.value
    this.floatingElement.removeAttribute('open')
    this.anchorElement.blur()
    this.dispatchEvent(
      new CustomEvent('onTimeChange', {
        detail: {hour, minute, time, displayValue},
      }),
    )
  }

  handleInputTimeKeyUp() {
    const isValidTime = this.regex.test(this.anchorElement.value)
    if (isValidTime && this.timeDropdownElement) {
      this.rootValue = this.anchorElement.value.toUpperCase()
      this.timeDropdownElement.setAttribute(
        'value',
        this.anchorElement.value.toUpperCase(),
      )
      setTimeout(() => {
        const {selectedHour, selectedMinute, selectedTime} =
          this.timeDropdownElement
        this.dispatchEvent(
          new CustomEvent('onTimeChange', {
            detail: {
              hour: selectedHour,
              minute: selectedMinute,
              time: selectedTime,
              displayValue: this.timeDropdownElement.getDisplayValue(),
            },
          }),
        )
      }, 0)
    }
  }

  handleInputTimeFocusIn() {
    if (
      window.innerHeight <
      this.anchorElement.getBoundingClientRect().bottom + TIME_DROPDOWN_HEIGHT
    ) {
      this.timeDropdownElement.classList.add('cdg-time-dropdown-top')
      this.timeDropdownElement.style.transform = `translateY(calc(-100% - ${
        this.anchorElement.clientHeight + 4
      }px))`
    }
    this.floatingElement.setAttribute('open', 'true')
    this.rootValue = this.anchorElement.value
  }

  handleInputTimeBlur() {
    if (this.anchorElement.value) {
      const isValidTime = this.regex.test(this.anchorElement.value)
      if (!isValidTime || this.rootValue !== this.anchorElement.value) {
        this.anchorElement.value = this.rootValue || ''
      } else {
        this.rootValue = this.anchorElement.value
      }
    } else {
      this.rootValue = ''
    }
    this.timeDropdownElement.setAttribute('value', this.rootValue)
    this.timeDropdownElement.classList.remove('cdg-time-dropdown-top')
    this.timeDropdownElement.style.transform = ''
    this.floatingElement.removeAttribute('open')
  }
}
