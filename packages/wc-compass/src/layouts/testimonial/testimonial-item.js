export class CdgTestimonialItem extends HTMLElement {
  testimonialContentRatingEl

  static get observedAttributes() {
    return []
  }

  constructor() {
    super()
    this.testimonialContentRatingEl = this.querySelector(
      '[testimonialContentRating]',
    )

    if (this.testimonialContentRatingEl) {
      this.testimonialContentRatingEl.classList.add(
        'cdg-testimonial-content-rating',
      )
      this.maxStars = this.testimonialContentRatingEl.getAttribute('max-star')
      this.starValue = this.testimonialContentRatingEl.getAttribute('value')
      const starContainerEl = document.createElement('div')
      const backdropStarEl = document.createElement('div')
      starContainerEl.classList.add('cdg-testimonial-star-container')
      backdropStarEl.classList.add('cdg-testimonial-star-backdrop')
      const starEl = document.createElement('cdg-icon')
      starEl.setAttribute('name', 'star')
      starEl.setAttribute('size', '32')
      starEl.setAttribute('source', 'host')
      const starColor =
        this.testimonialContentRatingEl.getAttribute('star-color')
      if (starColor) {
        this.testimonialContentRatingEl.style.color = starColor
      }
      for (let index = 0; index < Number(this.maxStars); index++) {
        starContainerEl.appendChild(starEl.cloneNode(true))
      }
      backdropStarEl.style.width = `${
        ((this.maxStars - this.starValue) / this.maxStars) * 100
      }%`
      starContainerEl.appendChild(backdropStarEl)
      this.testimonialContentRatingEl.appendChild(starContainerEl)
    }
  }

  connectedCallback() {
    this.classList.add('cdg-testimonial-box')
  }
}
