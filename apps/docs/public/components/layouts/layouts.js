import {CdgDocumentComponent} from '../../shared/document-component'
import template from './layouts.html'

export class CdgLayoutsDemo extends CdgDocumentComponent {
  stretch = false
  alignment = ''
  direction = ''

  sample
  children = []

  alignmentDropdown
  sampleCode

  constructor() {
    super()
    this.template = template
  }

  onInit() {
    this.sample = this.querySelector('.sample-parent > .cdg-layout')
    this.children = this.querySelectorAll('.sample-parent > .cdg-layout > div')

    this.alignmentDropdown = this.querySelector('#alignmentDropdown')
    this.sampleCode = this.querySelector('.sample-code')

    const checkbox = this.querySelector('#stretchCheckbox')
    checkbox.addEventListener('change', this.toggleStretch.bind(this))

    const checkbox0 = this.querySelector('#fillParentCheckbox0')
    checkbox0.addEventListener('change', this.fillParent.bind(this, 0))

    const checkbox1 = this.querySelector('#fillParentCheckbox1')
    checkbox1.addEventListener('change', this.fillParent.bind(this, 1))

    const checkbox2 = this.querySelector('#fillParentCheckbox2')
    checkbox2.addEventListener('change', this.fillParent.bind(this, 2))

    const radios = this.querySelectorAll('[name="direction"]')
    if (radios.length) {
      for (let radio of radios) {
        radio.addEventListener('change', this.changeDirection.bind(this))
      }
    }
    checkbox2.addEventListener('change', this.fillParent.bind(this, 2))

    this.alignmentDropdown.addEventListener('onchangevalue', (event) => {
      if (this.alignment) {
        this.sample.classList.remove(this.alignment)
      }
      this.alignment = event.detail
      if (this.alignment) {
        this.sample.classList.add(this.alignment)
      }
      this.rebuildTemplate()
    })

    this.rebuildTemplate()
  }

  toggleStretch(event) {
    this.stretch = event.target.checked
    if (event.target.checked) {
      this.sample.classList.add('stretch')
    } else {
      this.sample.classList.remove('stretch')
    }
    this.rebuildTemplate()
  }

  fillParent(child, event) {
    if (event.target.checked) {
      this.children[child].classList.add('grow')
    } else {
      this.children[child].removeAttribute('class')
    }
    this.rebuildTemplate()
  }

  changeDirection(event) {
    if (this.direction) {
      this.sample.classList.remove(this.direction)
    }
    this.direction = event.target.value
    this.sample.classList.add(this.direction)
    this.rebuildTemplate()
  }

  rebuildTemplate() {
    this.sampleCode.textContent = this.sample.parentElement.innerHTML
    hljs.highlightElement(this.sampleCode)
  }
}
