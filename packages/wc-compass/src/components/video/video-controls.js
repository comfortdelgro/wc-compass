import {CdgBaseComponent} from '../../shared/base-component'
import {toDisplayTime} from './video.util'

const CONTROLS_TEMPLATE = `
<cdg-volume></cdg-volume>
<div class="video-time-control">
    <span class="current-time">00:00</span>
    <span class="video-progressbar">
        <cdg-range-slider min="0" max="100" hidePopup></cdg-range-slider>
    </span>
    <span class="total-time">00:00</span>
</div>
<div class="video-navigation">
    <button is="cdg-button"
            class="video-button icon backward"
            size="small"
            aria-label="Backward button">
        <cdg-icon name="backward"></cdg-icon>
    </button>
    <button is="cdg-button"
            class="video-button icon play-pause"
            aria-label="Play / Pause button">
        <cdg-icon name="caretRight"></cdg-icon>
    </button>
    <button is="cdg-button"
            class="video-button icon forward"
            size="small"
            aria-label="Forward button">
        <cdg-icon name="forward"></cdg-icon>
    </button>
    <button is="cdg-button"
            class="video-button icon setting"
            size="small"
            aria-label="Video setting button">
        <cdg-icon name="setting"></cdg-icon>
    </button>
</div>
`

export class CdgVideoControls extends CdgBaseComponent {
  static get observedAttributes() {
    return ['current-time', 'duration', 'playing', 'buffering', 'volume']
  }

  get playing() {
    return this.hasAttribute('playing')
  }

  set playing(playing) {
    if (playing) {
      this.setAttribute('playing', playing)
    } else {
      this.removeAttribute('playing')
    }
  }

  get volume() {
    return Number(this.getAttribute('volume')) || 0
  }

  set volume(volume) {
    this.setAttribute('volume', volume)
  }

  get currentTime() {
    return Number(this.getAttribute('current-time')) || 0
  }

  set currentTime(currentTime) {
    this.setAttribute('current-time', currentTime)
  }

  get duration() {
    return Number(this.getAttribute('duration')) || 0
  }

  set duration(duration) {
    this.setAttribute('duration', duration)
  }

  get buffering() {
    return Number(this.getAttribute('buffering'))
  }

  set buffering(buffering) {
    this.setAttribute('buffering', buffering)
  }

  currentTimeElement
  durationElement
  seekBar
  btnPlayPause
  btnBackward
  btnForward
  btnSetting
  volumeBar

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-video-controls')
    this.innerHTML = CONTROLS_TEMPLATE

    this.currentTimeElement = this.querySelector('.current-time')
    this.durationElement = this.querySelector('.total-time')
    this.seekBar = this.querySelector('cdg-range-slider')
    this.volumeBar = this.querySelector('cdg-volume')
    this.volumeBar.volume = this.volume
    this.volumeBar.addEventListener(
      'volumechange',
      this.handleVolume.bind(this),
    )
    this.volumeBar.addEventListener('mute', this.handleMute.bind(this))

    this.seekBar.addEventListener('change', this.handleSeekbar.bind(this))

    this.btnPlayPause = this.querySelector('.play-pause')
    this.btnPlayPause.addEventListener('click', this.handlePlayPause.bind(this))

    this.updatePlayIcon()

    this.btnBackward = this.querySelector('.backward')
    this.btnBackward.addEventListener('click', this.handleBackward.bind(this))

    this.btnForward = this.querySelector('.forward')
    this.btnForward.addEventListener('click', this.handleForward.bind(this))

    this.btnSetting = this.querySelector('.setting')
    this.btnSetting.addEventListener('click', this.handleSetting.bind(this))
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'current-time':
        if (this.currentTimeElement) {
          this.currentTimeElement.textContent = toDisplayTime(this.currentTime)
        }
        if (this.seekBar && this.duration) {
          this.seekBar.setAttribute(
            'value',
            (this.currentTime / this.duration) * 100,
          )
        }
        break

      case 'duration':
        if (this.durationElement) {
          this.durationElement.textContent = toDisplayTime(this.duration)
        }
        break

      case 'playing':
        if (this.btnPlayPause) {
          this.updatePlayIcon()
        }
        break

      case 'buffering':
        this.seekBar.buffering = this.buffering
        break

      case 'volume':
        this.volumeBar.volume = this.volume
        break

      default:
        break
    }
  }

  handleSeekbar(event) {
    const percent = event.detail.value
    const target = (this.duration / 100) * percent
    this.dispatchEvent(new CustomEvent('seek', {detail: target}))
  }

  handlePlayPause() {
    this.dispatchEvent(new CustomEvent('toggle'))
  }

  handleBackward() {
    this.dispatchEvent(new CustomEvent('navigate', {detail: 'previous'}))
  }

  handleForward() {
    this.dispatchEvent(new CustomEvent('navigate', {detail: 'next'}))
  }

  handleSetting() {
    this.dispatchEvent(new CustomEvent('setting'))
  }

  updatePlayIcon() {
    const iconElement = this.btnPlayPause.querySelector('cdg-icon')
    const iconName = this.playing ? 'pause' : 'caretRight'

    iconElement.name = iconName
  }

  handleVolume(event) {
    this.dispatchEvent(new CustomEvent('adjustvolume', {detail: event.detail}))
  }

  handleMute(event) {
    this.dispatchEvent(new CustomEvent('mute', {detail: event.detail}))
  }
}
