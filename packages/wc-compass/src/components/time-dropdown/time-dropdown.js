import {CdgBaseComponent} from '../../shared/base-component'
export const TIME_REGEX =
  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\s(AM|aM|Am|am|PM|Pm|pM|pm)$/

const timeDropdownControlPaddingTop = 4

export class CdgTimeDropdown extends CdgBaseComponent {
  contentElement
  hourListElement
  minuteListElement
  timeListElement
  bottomElement

  _value
  set value(newValue) {
    this._value = newValue
    if (this._value) {
      this.setAttribute('value', this._value)
      if (TIME_REGEX.test(this._value)) {
        // Spilt value "hh:mm AA" to string
        const [hhmm, time] = this._value.split(' ')
        const [hour, minute] = hhmm.split(':')

        if (`${Number(hour)}` !== this.selectedHour) {
          this.selectedHour = `${Number(hour)}`
        }
        if (`${Number(minute)}` !== this.selectedMinute) {
          this.selectedMinute = `${Number(minute)}`
        }
        if (time !== this.selectedTime) {
          this.selectedTime = time.toLocaleLowerCase()
        }
      }
    } else {
      this.resetSelectedItems()
      this.removeAttribute('value', this._value)
    }
  }
  get value() {
    return this._value
  }

  _selectedHour = ''
  set selectedHour(value) {
    this._selectedHour = value
    this.addActiveClass(value, this.hourListElement)
  }
  get selectedHour() {
    return this._selectedHour
  }

  _selectedMinute = ''
  set selectedMinute(value) {
    this._selectedMinute = value
    this.addActiveClass(value, this.minuteListElement)
  }
  get selectedMinute() {
    return this._selectedMinute
  }

  _selectedTime = ''
  set selectedTime(value) {
    this._selectedTime = value
    this.addActiveClass(value, this.timeListElement)
  }
  get selectedTime() {
    return this._selectedTime
  }

  set hasBottom(value) {
    if (value) {
      if (!this.contains(this.bottomElement) && this.bottomElement) {
        this.append(this.bottomElement)
      }
      this.setAttribute('has-bottom', '')
    } else {
      if (this.contains(this.bottomElement) && this.bottomElement) {
        this.removeChild(this.bottomElement)
      }
      this.removeAttribute('has-bottom', '')
    }
  }

  get hasBottom() {
    return this.hasAttribute('has-bottom')
  }

  static get observedAttributes() {
    return ['value', 'has-bottom', 'minute-step']
  }

  constructor() {
    super()
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    if (attr === 'has-bottom') {
      this.hasBottom = this.hasAttribute('has-bottom')
      return
    }
    this[attr] = newValue
  }

  connectedCallback() {
    this.classList.add('cdg-time-dropdown')
    this.classList.remove('cdg-time-dropdown-display')
    this.createTimeDropdownElement()
    this.hasBottom = this.hasAttribute('has-bottom')
  }

  resetSelectedItems() {
    this.selectedHour = ''
    this.selectedMinute = ''
    this.selectedTime = ''
    if (this.hourListElement) {
      const oldSelectedItem = this.hourListElement.querySelector(
        '.cdg-time-dropdown-item-active',
      )
      if (oldSelectedItem) {
        oldSelectedItem.classList.remove('cdg-time-dropdown-item-active')
      }
    }
    if (this.minuteListElement) {
      const oldSelectedItem = this.minuteListElement.querySelector(
        '.cdg-time-dropdown-item-active',
      )
      if (oldSelectedItem) {
        oldSelectedItem.classList.remove('cdg-time-dropdown-item-active')
      }
    }
    if (this.timeListElement) {
      const oldSelectedItem = this.timeListElement.querySelector(
        '.cdg-time-dropdown-item-active',
      )
      if (oldSelectedItem) {
        oldSelectedItem.classList.remove('cdg-time-dropdown-item-active')
      }
    }
  }

  addActiveClass(value, listElement, behavior = 'smooth') {
    if (value && listElement) {
      const oldSelectedItem = listElement.querySelector(
        '.cdg-time-dropdown-item-active',
      )
      if (oldSelectedItem) {
        oldSelectedItem.classList.remove('cdg-time-dropdown-item-active')
      }
      const selectedItem = listElement.querySelector(
        `.cdg-time-dropdown-item[value="${value}"]`,
      )
      if (selectedItem) {
        selectedItem.classList.add('cdg-time-dropdown-item-active')
        listElement.scroll({
          behavior,
          top: selectedItem.offsetTop - timeDropdownControlPaddingTop,
        })
      }
    }
  }

  handleDropdownItemClick(event) {
    if (!event.target) {
      return
    }
    const currentActiveItem = event.target.parentElement.querySelector(
      '.cdg-time-dropdown-item-active',
    )
    if (currentActiveItem !== event.target) {
      event.target.classList.add('cdg-time-dropdown-item-active')
      if (currentActiveItem) {
        currentActiveItem.classList.remove('cdg-time-dropdown-item-active')
      }
      const type = event.target.getAttribute('type')
      const value = event.target.getAttribute('value')
      switch (type) {
        case 'hour':
          this.selectedHour = value
          if (!this.selectedMinute) {
            this.selectedMinute = '0'
          }
          if (!this.selectedTime) {
            this.selectedTime = 'am'
          }
          break
        case 'minute':
          this.selectedMinute = value
          if (!this.selectedHour) {
            this.selectedHour = '1'
          }
          if (!this.selectedTime) {
            this.selectedTime = 'am'
          }
          break
        case 'time':
          this.selectedTime = value
          if (!this.selectedHour) {
            this.selectedHour = '1'
          }
          if (!this.selectedMinute) {
            this.selectedMinute = '0'
          }
          break
        default:
          break
      }
      this.dispatchEvent(
        new CustomEvent('onTimeClick', {
          detail: {
            hour: this.selectedHour,
            minute: this.selectedMinute,
            time: this.selectedTime,
            displayValue: this.getDisplayValue(),
          },
        }),
      )
    }
  }

  handleButtonOKClick() {
    this.dispatchEvent(
      new CustomEvent('onTimeChange', {
        detail: {
          hour: this.selectedHour,
          minute: this.selectedMinute,
          time: this.selectedTime,
          displayValue: this.getDisplayValue(),
        },
      }),
    )
  }

  getDisplayValue() {
    return `${this.selectedHour.padStart(
      2,
      '0',
    )}:${this.selectedMinute.padStart(
      2,
      '0',
    )} ${this.selectedTime.toUpperCase()}`
  }

  createTimeDropdownElement() {
    if (!this.contentElement) {
      this.contentElement = document.createElement('div')
      this.contentElement.classList.add('cdg-time-dropdown-content')

      this.createHourDropdowns()
      this.createMinuteDropdowns()
      this.createDropdownTime()

      this.appendChild(this.contentElement)
    }

    if (this.selectedHour) {
      this.addActiveClass(this.selectedHour, this.hourListElement, 'auto')
    }
    if (this.selectedMinute) {
      this.addActiveClass(this.selectedMinute, this.minuteListElement, 'auto')
    }
    if (this.selectedTime) {
      this.addActiveClass(this.selectedTime, this.timeListElement, 'auto')
    }

    if (!this.bottomElement) {
      this.createBottom()
    }

    const dropdownItems = this.querySelectorAll('.cdg-time-dropdown-item')
    dropdownItems.forEach((dropdownItem) => {
      dropdownItem.addEventListener(
        'click',
        this.handleDropdownItemClick.bind(this),
      )
    })

    setTimeout(() => {
      this.classList.add('cdg-time-dropdown-display')
    }, 0)
  }

  createHourDropdowns() {
    if (!this.hourListElement) {
      this.hourListElement = document.createElement('div')
      this.hourListElement.classList.add(
        'cdg-time-dropdown-control',
        'cdg-time-dropdown-hours',
      )
      this.createDropdownList(1, 12, 1, this.hourListElement, 'hour')
      this.contentElement.appendChild(this.hourListElement)
    }
  }

  createMinuteDropdowns() {
    if (!this.minuteListElement) {
      this.minuteListElement = document.createElement('div')
      this.minuteListElement.classList.add(
        'cdg-time-dropdown-control',
        'cdg-time-dropdown-minutes',
      )
      const minuteStep = this.getAttribute('minute-step') || '1'
      this.createDropdownList(
        0,
        59,
        Number(minuteStep),
        this.minuteListElement,
        'minute',
      )
      this.contentElement.appendChild(this.minuteListElement)
    }
  }

  createDropdownTime() {
    if (!this.timeListElement) {
      this.timeListElement = document.createElement('div')
      this.timeListElement.classList.add(
        'cdg-time-dropdown-control',
        'cdg-time-dropdown-times',
      )

      const itemOptionAM = this.createDropdownItem('am', 'time', 'AM')
      this.timeListElement.appendChild(itemOptionAM)
      const itemOptionPM = this.createDropdownItem('pm', 'time', 'PM')
      this.timeListElement.appendChild(itemOptionPM)

      this.contentElement.appendChild(this.timeListElement)
    }
  }

  createBottom() {
    this.bottomElement = document.createElement('div')
    this.bottomElement.classList.add('cdg-time-dropdown-bottom')
    const bottomButton = document.createElement('button')
    bottomButton.classList.add('ghost', 'cdg-button')
    bottomButton.innerHTML = 'OK'
    bottomButton.addEventListener('click', this.handleButtonOKClick.bind(this))
    this.bottomElement.appendChild(bottomButton)
    this.appendChild(this.bottomElement)
  }

  createDropdownList(min, max, step, element, type) {
    const arr = []
    while (min <= max) {
      arr.push(min)
      const itemOption = this.createDropdownItem(
        min,
        type,
        `${min}`.padStart(2, '0'),
      )
      element.appendChild(itemOption)
      min = min + step
    }
  }

  createDropdownItem(value, type, displayValue) {
    const itemOption = document.createElement('div')
    itemOption.classList.add('cdg-time-dropdown-item')
    itemOption.setAttribute('value', value)
    itemOption.setAttribute('type', type)
    itemOption.innerHTML = displayValue || value
    return itemOption
  }
}
