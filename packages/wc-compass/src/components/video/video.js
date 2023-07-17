import {CdgBaseComponent} from '../../shared/base-component'
import {isIphone} from '../../shared/browser'

const IDLE_TIME = 10000

export class CdgVideoPlayer extends CdgBaseComponent {
  get controls() {
    return this.getAttribute('controls')
  }

  set controls(controls) {
    if (controls) {
      this.setAttribute('controls', controls)
    } else {
      this.removeAttribute('controls')
    }
  }

  get idle() {
    return this.getAttribute('idle')
  }

  set idle(idle) {
    if (idle) {
      this.setAttribute('idle', idle)
    } else {
      this.removeAttribute('idle')
    }
  }

  get volume() {
    return Number(this.getAttribute('volume')) || 0
  }

  set volume(volume) {
    this.setAttribute('volume', volume)
  }

  video
  videoControls
  timer

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-video-player')
    // We will not support custom controls for Safari on iOS
    // Let's use the default browser behavior
    if (isIphone()) {
      this.video = this.querySelector('video')
      this.video.controls = true
      return
    } else {
      this.addEventListener('pointermove', this.handlePointerMove.bind(this))
      this.addEventListener('pointerleave', this.handlePointerLeave.bind(this))

      this.video = this.querySelector('video')
      this.video.addEventListener(
        'timeupdate',
        this.handleTimeUpdate.bind(this),
      )
      this.video.addEventListener('progress', this.handleProgress.bind(this))
      this.video.addEventListener('suspend', this.handleSuspend.bind(this))
      this.video.addEventListener('loadedmetadata', this.handleLoad.bind(this))

      this.attachControls()
    }
  }

  attachControls() {
    this.videoControls = document.createElement('cdg-video-controls')
    this.videoControls.classList.add('hidden')
    this.videoControls.addEventListener('seek', this.handleSeek.bind(this))
    this.videoControls.addEventListener('toggle', this.handleToggle.bind(this))
    this.videoControls.addEventListener(
      'navigate',
      this.handleNavigate.bind(this),
    )
    this.videoControls.addEventListener(
      'adjustvolume',
      this.handleVolume.bind(this),
    )
    this.videoControls.addEventListener('mute', this.handleMute.bind(this))
    this.appendChild(this.videoControls)
    this.videoControls.playing = this.video.hasAttribute('autoplay')
    this.videoControls.volume = this.volume
    this.setVolume(this.volume)
  }

  handleTimeUpdate(event) {
    this.videoControls.currentTime = this.video.currentTime
    this.videoControls.duration = this.video.duration
  }

  handleSeek(event) {
    this.video.currentTime = event.detail
  }

  handleToggle() {
    if (this.video.paused) {
      this.video.play()
      this.videoControls.playing = true
    } else {
      this.video.pause()
      this.videoControls.playing = false
      clearTimeout(this.timer)
    }

    this.dispatchEvent(
      new CustomEvent('play', {detail: this.videoControls.playing}),
    )
  }

  handleProgress() {
    if (this.video.paused) {
      return
    }

    this.videoControls.buffering =
      (this.video.buffered.end(0) / this.video.duration) * 100
  }

  handleSuspend(event) {
    // console.log(event);
  }

  handleNavigate(event) {
    this.dispatchEvent(new CustomEvent('navigate', {detail: event.detail}))
  }

  handleLoad() {
    this.videoControls.classList.remove('hidden')
  }

  handleMute(event) {
    this.video.muted = event.detail
  }

  handleVolume(event) {
    this.setVolume(event.detail)
  }

  setVolume(volume) {
    this.video.volume = volume / 100
  }

  handlePointerMove() {
    this.idle = false
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.idle = this.videoControls.playing
    }, IDLE_TIME)
  }

  handlePointerLeave() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.idle = this.videoControls.playing
    }, IDLE_TIME)
  }
}
