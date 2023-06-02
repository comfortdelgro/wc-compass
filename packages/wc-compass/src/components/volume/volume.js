import {Pointer} from '../../shared/pointer'

const TEMPLATE = `
<button class="volume-range" arial-label="Volume range button">
    <div class="volume"></div>
</button>
<button is="cdg-button" class="icon ghost" arial-label="Mute / Loud button">
    <cdg-icon name="volumeLoud"></cdg-icon>
</button>
`

export class CdgVolume extends HTMLElement {
  static get observedAttributes() {
    return ['volume', 'mute']
  }

  get volume() {
    return Number(this.getAttribute('volume')) || 0
  }

  set volume(volume) {
    this.setAttribute('volume', volume)
  }

  get mute() {
    return this.hasAttribute('mute')
  }

  set mute(mute) {
    if (mute) {
      this.setAttribute('mute', mute)
    } else {
      this.removeAttribute('mute')
    }
  }

  button
  icon
  volumeBar
  currentVolume

  pointer = new Pointer()

  pointerMoveListener
  pointerUpListener
  keyListener

  startHeight
  lastVolume
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-volume')
    this.innerHTML = TEMPLATE
    this.button = this.querySelector('.cdg-button')
    this.icon = this.querySelector('cdg-icon')
    this.volumeBar = this.querySelector('.volume-range')
    this.currentVolume = this.querySelector('.volume')
    this.updateVolumeHeight()

    this.listenEvents()
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'volume':
        if (this.currentVolume) {
          this.updateVolumeHeight()
        }
        this.updateIcon()
        break

      case 'mute':
        this.updateIcon()
        if (this.mute) {
          this.lastVolume = this.volume
          this.volume = 0
        } else {
          this.volume = this.lastVolume
        }
        if (this.currentVolume) {
          this.updateVolumeHeight()
        }
        break

      default:
        break
    }
  }

  listenEvents() {
    this.button.addEventListener('click', this.toggleMute.bind(this))

    this.volumeBar.addEventListener(
      'pointerdown',
      this.handlePointerDown.bind(this),
    )
    this.volumeBar.addEventListener('focusin', this.handleFocusIn.bind(this))
    this.volumeBar.addEventListener('focusout', this.handleFocusOut.bind(this))
  }

  toggleMute() {
    this.mute = !this.mute
    this.dispatchEvent(new CustomEvent('mute', {detail: this.mute}))
  }

  handlePointerDown(event) {
    this.volumeBar.setPointerCapture(event.pointerId)
    this.pointer = new Pointer()
    this.pointer.start({x: event.pageX, y: event.pageY})

    this.startHeight = this.currentVolume.clientHeight

    this.pointerMoveListener = this.handlePointerMove.bind(this)
    this.pointerUpListener = this.handlePointerUp.bind(this)
    this.volumeBar.addEventListener('pointermove', this.pointerMoveListener)
    this.volumeBar.addEventListener('pointerup', this.pointerUpListener, {
      once: true,
    })
  }

  handlePointerMove(event) {
    this.pointer.update({x: event.pageX, y: event.pageY})
    let height = this.startHeight - this.pointer.distance.y
    // Keep height insize volume bar
    height = height < 0 ? 0 : height
    height =
      height > this.volumeBar.clientHeight
        ? this.volumeBar.clientHeight
        : height
    this.updatePosition(height)
  }

  handlePointerUp() {
    this.volumeBar.removeEventListener('pointermove', this.pointerMoveListener)
  }

  updatePosition(height) {
    this.currentVolume.style.height = height + 'px'
    const volume = Math.floor((height / this.volumeBar.clientHeight) * 100)
    if (volume !== this.volume) {
      this.volume = volume
      this.dispatchEvent(new CustomEvent('volumechange', {detail: this.volume}))
    }
  }

  updateVolumeHeight() {
    const height = (this.volumeBar.clientHeight / 100) * this.volume
    this.currentVolume.style.height = height + 'px'
  }

  updateIcon() {
    if (this.icon) {
      let icon =
        this.mute || this.volume === 0
          ? 'volumeMute'
          : this.volume < 50
          ? 'volumeLow'
          : 'volumeLoud'
      if (this.icon.name !== icon) {
        this.icon.name = icon
      }
    }
  }

  handleFocusIn() {
    this.keyListener = this.handleKeyPress.bind(this)
    this.volumeBar.addEventListener('keyup', this.keyListener)
  }

  handleFocusOut() {
    this.volumeBar.removeEventListener('keyup', this.keyListener)
  }

  handleKeyPress(event) {
    switch (event.key) {
      case 'ArrowUp':
        this.volumeUp()
        break

      case 'ArrowDown':
        this.volumeDown()
        break

      default:
        break
    }
  }

  volumeUp() {
    let volume = this.volume + 10
    volume = volume < 100 ? volume : 100
    if (volume !== this.volume) {
      this.volume = volume
      this.updateVolumeHeight()
      this.dispatchEvent(new CustomEvent('volumechange', {detail: this.volume}))
    }
  }

  volumeDown() {
    let volume = this.volume - 10
    volume = volume >= 0 ? volume : 0
    if (volume !== this.volume) {
      this.volume = volume
      this.updateVolumeHeight()
      this.dispatchEvent(new CustomEvent('volumechange', {detail: this.volume}))
    }
  }
}
