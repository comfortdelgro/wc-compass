import {isElement} from '../../shared/utilities'

const template = document.createElement('template')
template.innerHTML = `
    <button class="cdg-dropdown-button">
        <div class="cdg-dropdown-button-text"></div>
        <cdg-icon name="arrow-down" class="cdg-dropdown-button-icon" size="16"></cdg-icon>
    </button>
`

function createSelectedItem(value, text, displayEl) {
  const templateSelectedItem = document.createElement('template')
  templateSelectedItem.innerHTML = `
      <button class="cdg-dropdown-button-selected-item" tabindex="-1">
          <span class="cdg-dropdown-button-selected-item-text">${
            displayEl ? displayEl.outerHTML : text
          }</span>
          <cdg-icon name="close" size="10" class="cdg-dropdown-button-selected-item-icon" data-value="${value}"></cdg-icon>
      </button>
  `
  return templateSelectedItem
}

export class CdgDropdown extends HTMLElement {
  isOpen = false
  _placeholder = ''
  _width = '100%'
  labelElement
  displayInputElement
  buttonTextElement
  contentElement
  _isMultiple = false
  selectedItems = []
  loadingElement
  dropdownOptionElements

  static get observedAttributes() {
    return ['placeholder', 'width', 'multiple', 'is-loading', 'disabled']
  }

  get placeholder() {
    return this._placeholder
  }

  set placeholder(value) {
    this._placeholder = value
    if (this.displayInputElement) {
      this.buttonTextElement.classList.add('placeholder')
      this.buttonTextElement.textContent = this._placeholder
    }
  }

  get width() {
    return this._width
  }

  set width(value) {
    this._width = value
    if (this.displayInputElement) {
      this.displayInputElement.style.width = this._width
    }
  }

  constructor() {
    super()
    this.prepend(template.content.cloneNode(true))
    this.contentElement = document.createElement('cdg-dropdown-select')
    this.contentElement.setAttribute('multiple', 'true')
    this._isMultiple = this.hasAttribute('multiple')
    this.loadingElement = document.createElement('cdg-icon')
    this.loadingElement.setAttribute('name', 'spinner')
    this.loadingElement.setAttribute('size', '16')

    if (this.hasAttribute('select-class')) {
      this.contentElement.classList.add(
        ...this.getAttribute('select-class').split(' '),
      )
    }

    this.contentElement.addEventListener(
      'onDropdownSelectClose',
      this.handleCloseContent.bind(this),
    )

    this.contentElement.addEventListener(
      'onDropdownClear',
      this.handleClearButtonClick.bind(this),
    )

    this.childNodes.forEach((item) => {
      // Add event click for each dropdown option
      item.addEventListener('click', (event) => {
        this.handleDropdownOptionClick(event, item)
      })

      // Set selected value to current variable
      if (isElement(item)) {
        const checkbox = document.createElement('input')
        if (this._isMultiple) {
          item.setAttribute('multiple', 'true')
          item.classList.add('cdg-dropdown-option-flex')
          checkbox.classList.add('cdg-dropdown-option-checkbox')
          checkbox.type = 'checkbox'
          checkbox.addEventListener('change', (event) => {
            event.preventDefault()
          })
          item.appendChild(checkbox)
        }

        if (item.hasAttribute('selected')) {
          checkbox.checked = true
          setTimeout(() => {
            let selectedDisplayElement = item.querySelector('[displaySelect]')
            if (!selectedDisplayElement && item.hasAttribute('current-color')) {
              selectedDisplayElement = item.querySelector(
                '.cdg-dropdown-option-color',
              )
            }
            this.selectedItems.push({
              value: item.getAttribute('value'),
              text: item.textContent,
              displayEl: selectedDisplayElement
                ? selectedDisplayElement.cloneNode(true)
                : null,
            })
          })
        }
      }
      this.contentElement.appendChild(item)
    })

    if (this.hasAttribute('header-title')) {
      this.contentElement.setAttribute(
        'header-title',
        this.getAttribute('header-title'),
      )
    }
    this.appendChild(this.contentElement)
    this.dropdownOptionElements = this.contentElement.querySelectorAll(
      'cdg-dropdown-option',
    )
  }

  connectedCallback() {
    this.classList.add('cdg-dropdown')
    this._isMultiple && this.classList.add('cdg-dropdown-multiple')

    this.displayInputElement = this.querySelector('button.cdg-dropdown-button')
    this.buttonTextElement = this.displayInputElement.querySelector(
      'div.cdg-dropdown-button-text',
    )
    if (!this.test) {
      this.test = this.handleToggle.bind(this)
    }
    if (!this.hasAttribute('disabled')) {
      this.displayInputElement.addEventListener('click', this.test, true)
    }
    this.displayInputElement.addEventListener(
      'blur',
      this.handleCloseContent.bind(this),
    )
    this.displayInputElement.style.width = this.width
    setTimeout(() => {
      this.setNewTextButton(false)
    })
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    this[attr] = newValue
    if (attr === 'is-loading' && this.loadingElement) {
      if (newValue) {
        // Hide all option items
        this.dropdownOptionElements.forEach((item) => {
          this.contentElement.removeChild(item)
        })
        this.contentElement.classList.add('isLoading')
        this.contentElement.appendChild(this.loadingElement)
      } else {
        // Add option items again
        this.dropdownOptionElements.forEach((item) => {
          this.contentElement.appendChild(item)
        })
        this.contentElement.classList.remove('isLoading')
        this.contentElement.removeChild(this.loadingElement)
      }
    } else if (attr === 'disabled') {
      if (this.hasAttribute('disabled')) {
        this.classList.add('disabled')
        this.displayInputElement &&
          this.displayInputElement.removeEventListener('click', this.test, true)
      } else {
        this.classList.remove('disabled')
        this.displayInputElement &&
          this.displayInputElement.addEventListener('click', this.test, true)
      }
    }
  }

  handleClearButtonClick() {
    const dropdownOptions = this.contentElement.querySelectorAll(
      'cdg-dropdown-option',
    )
    dropdownOptions.forEach((item) => {
      item.removeAttribute('selected')
      if (this._isMultiple) {
        const checkbox = item.querySelector('input[type="checkbox"]')
        checkbox.checked = false
      }
    })

    this.selectedItems = []
    this.setNewTextButton()

    if (!this._isMultiple) {
      this.handleCloseContent()
    }
  }

  setNewTextButton(dispatchEvent = true) {
    if (this.selectedItems.length > 0) {
      if (this._isMultiple) {
        this.displayInputElement.classList.add('has-value')
      }
      this.buttonTextElement.classList.remove('placeholder')
      if (this._isMultiple) {
        this.buttonTextElement.innerHTML = ''
        this.selectedItems.forEach((item) => {
          this.buttonTextElement.append(
            createSelectedItem(
              item.value,
              item.text,
              item.displayEl,
            ).content.cloneNode(true),
          )
          const icon = this.buttonTextElement.querySelector(
            `cdg-icon.cdg-dropdown-button-selected-item-icon[data-value="${item.value}"]`,
          )
          if (icon) {
            icon.addEventListener('click', (event) => {
              this.handleIconRemoveItemClick(event, item)
            })
          }
        })
      } else {
        if (this.selectedItems[0].displayEl) {
          this.buttonTextElement.innerHTML = ''
          this.buttonTextElement.appendChild(this.selectedItems[0].displayEl)
        } else {
          this.buttonTextElement.textContent = this.selectedItems[0].text
        }
      }
    } else {
      if (this._isMultiple) {
        this.buttonTextElement.innerHTML = ''
        this.displayInputElement.classList.remove('has-value')
      }
      if (this._placeholder) {
        this.buttonTextElement.classList.add('placeholder')
        this.buttonTextElement.textContent = this._placeholder
      }
    }

    const returnData = this._isMultiple
      ? this.selectedItems.map((item) => item.value)
      : this.selectedItems.length
      ? this.selectedItems[0].value
      : null

    if (dispatchEvent) {
      this.dispatchEvent(
        new CustomEvent('onchangevalue', {
          detail: returnData,
        }),
      )
    }
  }

  handleIconRemoveItemClick(event, item) {
    event.preventDefault()
    event.stopPropagation()
    this.selectedItems = this.selectedItems.filter(
      (selectedItem) => selectedItem.value !== item.value,
    )
    const dropdownItem = this.contentElement.querySelector(
      `cdg-dropdown-option[value="${item.value}"]`,
    )
    dropdownItem.classList.remove('cdg-dropdown-option-selected')
    dropdownItem.removeAttribute('selected')
    const checkbox = dropdownItem.querySelector('input[type="checkbox"]')
    checkbox.checked = false
    this.setNewTextButton()
  }

  handleDropdownOptionClick(event, dropdownOption) {
    const selectedValue = dropdownOption.getAttribute('value')
    const selectedText = dropdownOption.textContent
    let selectedDisplayElement = dropdownOption.querySelector('[displaySelect]')
    if (
      !selectedDisplayElement &&
      dropdownOption.hasAttribute('current-color')
    ) {
      selectedDisplayElement = dropdownOption.querySelector(
        '.cdg-dropdown-option-color',
      )
    }
    if (!this._isMultiple) {
      if (!dropdownOption.hasAttribute('selected')) {
        // Remove all previous selected options
        document
          .querySelectorAll('cdg-dropdown-option')
          .forEach((b) => b.removeAttribute('selected'))

        dropdownOption.setAttribute('selected', 'true')
        this.selectedItems = [
          {
            value: selectedValue,
            text: selectedText,
            displayEl: selectedDisplayElement
              ? selectedDisplayElement.cloneNode(true)
              : null,
          },
        ]
      }
      this.handleCloseContent()
    } else {
      const checkbox = dropdownOption.querySelector('input[type="checkbox"')
      if (checkbox) {
        if (event.target !== dropdownOption) {
          checkbox.checked = checkbox.checked
        } else {
          checkbox.checked = !checkbox.checked
        }
        if (checkbox.checked) {
          this.selectedItems.push({
            value: selectedValue,
            text: selectedText,
            displayEl: selectedDisplayElement
              ? selectedDisplayElement.cloneNode(true)
              : null,
          })
          dropdownOption.setAttribute('selected', 'true')
          dropdownOption.classList.add('cdg-dropdown-option-selected')
        } else {
          const selectedIndex = this.selectedItems.findIndex(
            (item) => item.value == selectedValue,
          )
          this.selectedItems.splice(selectedIndex, 1)
          dropdownOption.classList.remove('cdg-dropdown-option-selected')
          dropdownOption.removeAttribute('selected')
        }
      }
    }
    this.setNewTextButton()
  }

  handleCloseContent() {
    this.isOpen = false
    this.classList.remove('opening')
    this.contentElement.removeAttribute('opening')
  }

  handleToggle() {
    this.isOpen = !this.isOpen
    if (this.isOpen) {
      this.classList.add('opening')
      this.contentElement.setAttribute('opening', 'true')
      this.addEventListener('keydown', this.handleKeydown, true)
    } else {
      this.removeEventListener('keydown', this.handleKeydown, true)
      this.classList.remove('opening')
      this.contentElement.removeAttribute('opening')
    }
    this.dispatchEvent(new CustomEvent('onToggle', {detail: this.isOpen}))
  }

  handleKeydown(event) {
    if (event.key === 'Tab' || !this.isOpen) return
    event.preventDefault()
    event.stopPropagation()
    if (!this.hasAttribute('multiple')) {
      const currentSelected = this.contentElement.querySelector(
        'cdg-dropdown-option[selected="true"]',
      )
      if (!currentSelected) {
        const nodes = this.contentElement.querySelectorAll(
          'cdg-dropdown-option',
        )
        if (nodes.length > 0) {
          const first = nodes[0]
          const last = nodes[nodes.length - 1]
          if (event.key === 'ArrowDown') {
            first.setAttribute('selected', 'true')
          } else if (event.key === 'ArrowUp') {
            last.setAttribute('selected', 'true')
          }
        }
      } else {
        if (event.key === ' ' || event.key === 'Enter') {
          this.handleToggle()
          return
        }
        if (
          event.key === 'ArrowUp' &&
          isElement(currentSelected.previousSibling)
        ) {
          this.handleSelectSingleItem(currentSelected.previousSibling)
        } else if (
          event.key === 'ArrowDown' &&
          isElement(currentSelected.nextSibling)
        ) {
          this.handleSelectSingleItem(currentSelected.nextSibling)
        }
      }
    }
  }

  handleSelectSingleItem(element) {
    // Remove all previous selected options
    document
      .querySelectorAll('cdg-dropdown-option')
      .forEach((b) => b.removeAttribute('selected'))
    element.setAttribute('selected', 'true')
    this.selectedItems = [
      {
        value: element.getAttribute('value'),
        text: element.textContent,
      },
    ]
    this.setNewTextButton()
  }
}
