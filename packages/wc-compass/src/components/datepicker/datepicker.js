import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {createFloating} from '../floating-content/floating-content'

// const customParseFormat = window.dayjs_plugin_customParseFormat;
dayjs.extend(customParseFormat)

function createInputs(isDouble, disabled, startTitle = '', endTitle = '') {
  const template = document.createElement('template')
  template.innerHTML = `
<div class="cdg-datepicker-input-container">
    <div class="cdg-datepicker-input-content">
        <label class="cdg-input-group" style="width: 197px">
            <span class="cdg-input-label">${startTitle}</span>
            <div class="cdg-input-with-icon right">
                <input class="cdg-input" data-type="start-date" ${
                  disabled ? 'disabled' : ''
                } />
                <cdg-icon name="filledArrowDown" size="16"></cdg-icon>
            </div>
        </label>
    </div>
    ${
      isDouble
        ? `
        <div class="cdg-datepicker-input-content">
            <label class="cdg-input-group" style="width: 197px">
                <span class="cdg-input-label">${endTitle}</span>
                <div class="cdg-input-with-icon right">
                    <input class="cdg-input" data-type="end-date" ${
                      disabled ? 'disabled' : ''
                    } />
                    <cdg-icon name="filledArrowDown" size="16"></cdg-icon>
                </div>
            </label>
        </div>`
        : ''
    }
</div>
`
  return template
}

function createCalendar(isDouble, format, min, max) {
  const templateCalendar = document.createElement('template')
  templateCalendar.innerHTML = `
    <div class="cdg-calendar-container">
        <cdg-calendar
        has-bottom
        ${isDouble ? 'double' : ''}
        format="${format}"
        ${min ? `min=${min}` : ''}
        ${max ? `max=${max}` : ''}
        >
        </cdg-calendar>
    </div>
    `
  return templateCalendar
}

export class CdgDatePicker extends HTMLElement {
  inputDateElement
  floatingElement
  anchorElement
  calendarContainerElement
  calendarElement
  inputContentElements

  format = 'YYYY-MM-DD'
  _selectedStartDate
  _selectedEndDate
  isDouble = true

  get min() {
    return this.getAttribute('min')
  }

  set min(value) {
    if (value) {
      this.setAttribute('min', value)
      this.calendarElement.setAttribute('min', value)
    } else {
      this.removeAttribute('min')
      this.calendarElement.removeAttribute('min')
    }
  }

  get max() {
    return this.getAttribute('max')
  }

  set max(value) {
    if (value) {
      this.setAttribute('max', value)
      this.calendarElement.setAttribute('max', value)
    } else {
      this.removeAttribute('max')
      this.calendarElement.removeAttribute('max')
    }
  }

  get selectedStartDate() {
    return this._selectedStartDate
  }

  set selectedStartDate(value) {
    this._selectedStartDate = value
    if (value) {
      this.inputContentElements.item(0).querySelector('input').value = dayjs(
        value,
      ).format(this.format)
      this.calendarElement.setAttribute(
        'start-date',
        dayjs(value).format('YYYY-MM-DD'),
      )
      if (!this.isDouble) return
      if (
        this.floatingElement &&
        this.floatingElement.hasAttribute('opening')
      ) {
        this.inputContentElements.item(1).querySelector('input').focus()
      }
    } else {
      this.inputContentElements.item(0).querySelector('input').value = ''
      this.calendarElement.setAttribute('start-date', '')
      if (!this.isDouble) return
      this.inputContentElements.item(1).querySelector('input').value = ''
      if (
        this.floatingElement &&
        this.floatingElement.hasAttribute('opening')
      ) {
        this.inputContentElements.item(0).querySelector('input').focus()
      }
    }
  }

  get selectedEndDate() {
    return this._selectedEndDate
  }

  set selectedEndDate(value) {
    this._selectedEndDate = value
    if (value) {
      this.inputContentElements.item(1).querySelector('input').value = dayjs(
        value,
      ).format(this.format)
      this.calendarElement.setAttribute(
        'end-date',
        dayjs(value).format('YYYY-MM-DD'),
      )
    } else {
      this.inputContentElements.item(1).querySelector('input').value = ''
      this.calendarElement.setAttribute('end-date', '')
    }
  }

  static get observedAttributes() {
    return [
      'format',
      'double',
      'start-date',
      'date',
      'end-date',
      'min',
      'max',
      'disabled',
    ]
  }

  constructor() {
    super()
    this.isDouble = !!this.hasAttribute('double')
    this.disabled = this.getAttribute('disabled') === 'true'
    // Create inputs
    this.append(
      createInputs(
        this.isDouble,
        this.disabled,
        this.getAttribute('start-title') || '',
        this.getAttribute('end-title') || '',
      ).content.cloneNode(true),
    )

    if (this.hasAttribute('format')) {
      this.format = this.getAttribute('format')
    }

    // Create calendar
    this.append(
      createCalendar(
        this.isDouble,
        this.format,
        this.min,
        this.max,
      ).content.cloneNode(true),
    )
    this.bindCalendarEventHandler()
    this.bindInputsHandler()
  }

  connectedCallback() {
    this.classList.add('cdg-datepicker')

    if (!this.floatingElement) {
      this.floatingElement = createFloating.bind(this)(
        this.anchorElement,
        this.calendarContainerElement,
        'bottomLeft',
        'cdg-datepicker-floating-container',
        false,
        false,
        true,
        false,
      )
    }
  }

  bindCalendarEventHandler() {
    this.calendarContainerElement = this.querySelector(
      '.cdg-calendar-container',
    )
    this.calendarElement =
      this.calendarContainerElement.querySelector('cdg-calendar')
    this.calendarElement.addEventListener(
      'ondateclick',
      this.handleDateClick.bind(this),
    )
    this.calendarElement.addEventListener(
      'onClearClick',
      this.handleClearClick.bind(this),
    )
  }

  bindInputsHandler() {
    if (!this.anchorElement) {
      this.anchorElement = this.querySelector('.cdg-datepicker-input-container')
      this.inputContentElements = this.anchorElement.querySelectorAll(
        '.cdg-datepicker-input-content',
      )
      const currentComponent = this
      for (let index = 0; index < this.inputContentElements.length; index++) {
        const inputContentElement = this.inputContentElements.item(index)
        const inputElement = inputContentElement.querySelector('input')
        inputElement.setAttribute('placeholder', this.format)

        inputElement.addEventListener('focus', function () {
          currentComponent.floatingElement.setAttribute('opening', 'true')
          currentComponent.calendarElement.setAttribute('open', 'true')
          setTimeout(() => {
            currentComponent.floatingElement.style.opacity = 1
          }, 300)
        })
        inputElement.addEventListener('blur', this.handleInputBlur.bind(this))
      }
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    this[attr] = newValue

    switch (attr) {
      case 'start-date':
      case 'date':
        this.selectedStartDate = this.convertToDay(newValue)
        break

      case 'end-date':
        this.selectedEndDate = this.convertToDay(newValue)
        break
      case 'min':
        newValue &&
          this.calendarElement.setAttribute('min', dayjs(newValue, this.format))
        break

      case 'max':
        newValue &&
          this.calendarElement.setAttribute('max', dayjs(newValue, this.format))
        break

      case 'disabled':
        for (let index = 0; index < this.inputContentElements.length; index++) {
          const element = this.inputContentElements.item(index)
          const input = element.querySelector('input')
          if (newValue) {
            input.setAttribute('disabled', 'disabled')
          } else {
            input.removeAttribute('disabled')
          }
        }
        break

      default:
        break
    }
  }

  convertToDay(str) {
    if (!str) return null
    const isValidDate = dayjs(str, this.format).isValid()
    const newDateValue = isValidDate ? new Date(str) : null
    return newDateValue
  }

  handleInputBlur(event) {
    const isValidDate = dayjs(event.target.value, this.format, true).isValid()
    const isStartDateInput =
      event.target.getAttribute('data-type') === 'start-date'
    if (isValidDate) {
      this.setDataForCalendar(event, isStartDateInput)
    } else {
      const oldValue = isStartDateInput
        ? this.selectedStartDate
        : this.selectedEndDate
      const oldDate = dayjs(oldValue).isValid()
        ? dayjs(oldValue).format(this.format)
        : dayjs(oldValue, this.format).isValid()
        ? dayjs(oldValue, this.format)
        : ''
      event.target.value = oldValue ? oldDate : ''
    }
    if (!this.anchorElement.contains(event.relatedTarget)) {
      this.floatingElement.style.opacity = 0
      setTimeout(() => {
        this.floatingElement.removeAttribute('opening')
        this.calendarElement.removeAttribute('open')
      }, 300)
    }
  }

  setDataForCalendar(event, isStartDateInput) {
    if (!event.target) return
    const valueDate = new Date(dayjs(event.target.value, this.format))
    if (isStartDateInput) {
      this.selectedStartDate = valueDate
      if (this.selectedStartDate > this.selectedEndDate) {
        this.selectedEndDate = null
      }
    } else {
      if (this.selectedStartDate > valueDate) {
        this.selectedEndDate = null
        this.selectedStartDate = valueDate
      } else {
        this.selectedEndDate = valueDate
      }
    }
  }

  handleClearClick() {
    this.selectedStartDate = null
    let detail = {
      startDate: null,
      endDate: null,
    }
    if (this.isDouble) {
      this.selectedEndDate = null
    } else {
      detail = {
        date: null,
      }
    }
    this.emitDateChange(detail)
  }

  handleDateClick(event) {
    const selectedDate = new Date(dayjs(event.detail).format('YYYY-MM-DD'))
    if (!this.isDouble) {
      this.selectedStartDate = selectedDate
      this.floatingElement.removeAttribute('opening')
      this.calendarElement.removeAttribute('open')

      this.emitDateChange({
        date: this.selectedStartDate,
      })
      return
    }
    if (this.selectedStartDate && this.selectedEndDate) {
      this.selectedStartDate = selectedDate
      this.selectedEndDate = null
      return
    }

    if (this.isLessThanStartDate(selectedDate)) {
      this.selectedStartDate = selectedDate
    } else {
      this.selectedEndDate = selectedDate
      this.floatingElement.removeAttribute('opening')
      this.calendarElement.removeAttribute('open')

      this.emitDateChange({
        startDate: this.selectedStartDate,
        endDate: this.selectedEndDate,
      })
    }
  }

  isLessThanStartDate(date) {
    return (
      !this.selectedStartDate ||
      (this.selectedStartDate &&
        date.getTime() < this.selectedStartDate.getTime())
    )
  }

  emitDateChange(detail) {
    for (let index = 0; index < this.inputContentElements.length; index++) {
      const inputContentElement = this.inputContentElements.item(index)
      const input = inputContentElement.querySelector('input')
      if (input) {
        input.blur()
      }
    }
    this.dispatchEvent(
      new CustomEvent('onDateChange', {
        detail,
      }),
    )
  }
}
