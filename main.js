// End Design Studios — Main JS
// Scroll reveal + nav transparency on scroll

document.addEventListener('DOMContentLoaded', () => {

  /* ── Hero: word-by-word cinematic fade-in ──────────────────── */
  const heroLines = document.querySelectorAll('.hero__line')
  let wordIndex = 0
  const BASE_DELAY  = 0.35  // seconds before first word appears
  const WORD_STAGGER = 0.16  // seconds between each word

  heroLines.forEach((line) => {
    const words = line.textContent.trim().split(/\s+/)
    line.innerHTML = words
      .map((word) => {
        const delay = BASE_DELAY + wordIndex++ * WORD_STAGGER
        return `<span class="hero__word" style="animation-delay:${delay}s">${word}</span>`
      })
      .join('<span style="display:inline-block;width:0.28em"></span>')
  })

  /* ── Scroll Reveal ─────────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.who__heading, .who__img-wrap, .who__text-block, ' +
    '.collective__heading, .collective__right, ' +
    '.leadership__heading, .leader-card, ' +
    '.footer__left, .footer__right'
  )

  revealEls.forEach((el) => el.classList.add('reveal'))

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 }
  )

  revealEls.forEach((el) => observer.observe(el))



  /* ── Stagger leader cards ──────────────────────────────── */
  document.querySelectorAll('.leader-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`
  })

})
