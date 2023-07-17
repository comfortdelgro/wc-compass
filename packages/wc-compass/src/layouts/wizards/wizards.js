import {CdgBaseComponent} from '../../shared/base-component'

export class CdgWizards extends CdgBaseComponent {
  stepElements = []

  static get observedAttributes() {
    return ['steps', 'current']
  }

  get steps() {
    return this.getAttribute('steps').split(',')
  }

  set steps(steps) {
    this.setAttribute('steps', steps)
  }

  get current() {
    return Number(this.getAttribute('current'))
  }

  set current(current) {
    this.setAttribute('current', current)
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-wizards')
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'steps') {
      this.initSteps(newValue.split(','))
    } else if (attr === 'current') {
      this.updateSteps()
    }
  }

  initSteps(steps) {
    steps.forEach((text, index) => {
      const step = this.createStep(index + 1, text)
      this.stepElements.push(step)
      this.appendChild(step)
    })
  }

  updateSteps() {
    this.stepElements.forEach((element, index) => {
      if (index < this.current - 1) {
        element.status = 'completed'
      } else if (index === this.current - 1) {
        element.status = 'current'
      } else {
        element.status = 'remaining'
      }
    })
  }

  createStep(index, name) {
    const step = document.createElement('cdg-wizard-step')
    step.setAttribute('index', index)
    step.setAttribute('name', name)
    step.setAttribute('status', 'remaining')
    step.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('switchStep', {
          detail: {
            index,
            name,
          },
        }),
      )
    })
    return step
  }
}
