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

  /* ── Disciplines interactive list ─────────────────────── */
  const discData = [
    { label: 'interiors',    img: 'images/WhatsApp Image 2026-06-25 at 3.58.41 PM (1).jpeg',      body: 'Deeply considered spaces that unite architecture, material culture, and light into a single, cohesive narrative for every project.' },
    { label: 'architecture', img: 'images/WhatsApp Image 2026-06-25 at 3.58.41 PM (2).jpeg',  body: 'A global architecture practice, delivering transformative design solutions of lasting quality for a diverse range of clients' },
    { label: 'art',          img: 'images/WhatsApp Image 2026-06-25 at 3.58.41 PM.jpeg',      body: 'Curated art programs that elevate spaces and inspire.' },
    { label: 'digital',      img: 'images/WhatsApp Image 2026-06-25 at 3.58.42 PM (1).jpeg',      body: 'Innovative digital experiences integrated seamlessly into physical environments.' },
    { label: 'f&b',          img: 'images/WhatsApp Image 2026-06-25 at 3.58.42 PM (2).jpeg',      body: 'Food and beverage concepts where atmosphere and identity are as considered as the menu itself.' },
    { label: 'graphics',     img: 'images/WhatsApp Image 2026-06-25 at 3.58.42 PM.jpeg',  body: 'Visual communication and branding that shape the identity of a place.' },
    { label: 'landscape',    img: 'images/WhatsApp Image 2026-06-25 at 3.58.43 PM (1).jpeg',      body: 'Exterior environments that connect harmoniously with architecture and nature.' },
    { label: 'leisure',      img: 'images/WhatsApp Image 2026-06-25 at 3.58.43 PM (2).jpeg',      body: 'Leisure and wellness destinations that place human experience at the centre of every design decision.' },
    { label: 'light',        img: 'images/WhatsApp Image 2026-06-25 at 3.58.43 PM.jpeg',      body: 'Considered lighting design that sculpts space, evokes emotion, and elevates every environment.' },
    { label: 'procurement',  img: 'images/WhatsApp Image 2026-06-25 at 3.58.44 PM (1).jpeg',  body: 'Strategic sourcing and procurement for unparalleled quality and value.' },
    { label: 'product',      img: 'images/WhatsApp Image 2026-06-25 at 3.58.44 PM.jpeg',      body: 'Custom product and furniture design tailored to specific project narratives.' },
    { label: 'residential',  img: 'images/WhatsApp Image 2026-06-25 at 3.58.45 PM (1).jpeg',      body: 'Bespoke living environments crafted around the rhythms and rituals of the people who inhabit them.' },
    { label: 'resort',       img: 'images/WhatsApp Image 2026-06-25 at 3.58.45 PM.jpeg',  body: 'Immersive resort environments designed to redefine the guest experience across global destinations.' },
  ]

  const discItems  = document.querySelectorAll('.disc-list__item')
  const discBody   = document.getElementById('disc-body')
  const discBtn    = document.getElementById('disc-btn')
  const discImgWrap = document.getElementById('disc-img-wrap')
  const discDetail = document.getElementById('disc-detail')

  if (discItems.length && discBody && discImgWrap && discDetail) {

    // Pre-populate image layers for crossfade
    discData.forEach((d, i) => {
      const img = document.createElement('img')
      img.src = d.img
      img.alt = d.label
      img.className = 'disc-img'
      if (i === 0) img.classList.add('is-active')
      discImgWrap.appendChild(img)
    })
    // Remove the original placeholder img
    const placeholder = document.getElementById('disc-img')
    if (placeholder) placeholder.remove()

    const allImgs = discImgWrap.querySelectorAll('.disc-img')

    let activeIndex = 0

    const activate = (index) => {
      if (index === activeIndex) return
      activeIndex = index

      // Update list
      discItems.forEach((el, i) => el.classList.toggle('is-active', i === index))

      // Move the description container to align with the active item
      const activeItem = discItems[index]
      const offset = activeItem.offsetTop
      discDetail.style.transform = `translateY(${offset}px)`

      // Update description (fade out → update → fade in)
      discBody.classList.remove('is-visible')
      discBtn.classList.remove('is-visible')
      setTimeout(() => {
        discBody.textContent = discData[index].body
        
        // Dynamically update button text based on label
        const label = discData[index].label.toUpperCase()
        const isHBA = ['ARCHITECTURE', 'DIGITAL'].includes(label)
        discBtn.textContent = `VIEW ${isHBA ? 'HBA ' : ''}${label}`
        
        discBody.classList.add('is-visible')
        discBtn.classList.add('is-visible')
      }, 180)

      // Crossfade image
      allImgs.forEach((img, i) => img.classList.toggle('is-active', i === index))
    }

    // Initialise first item
    discBody.classList.add('is-visible')
    discBtn.classList.add('is-visible')
    discBtn.textContent = `VIEW INTERIORS`
    discDetail.style.transform = `translateY(${discItems[0].offsetTop}px)`

    discItems.forEach((item) => {
      item.addEventListener('mouseenter', () => activate(+item.dataset.index))
      item.addEventListener('click',      () => activate(+item.dataset.index))
    })

    // Scroll reveal logic for disciplines section
    const disciplinesSection = document.querySelector('.disciplines')
    if (disciplinesSection) {
      // Trigger when the top of the section reaches 40% down the screen
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            disciplinesSection.classList.add('is-revealed')
          } else if (entry.boundingClientRect.top > 0) {
            // Remove class when scrolling back up
            disciplinesSection.classList.remove('is-revealed')
          }
        })
      }, { 
        threshold: 0,
        rootMargin: "-40% 0px -40% 0px" 
      })
      observer.observe(disciplinesSection)
    }
  }

  /* ── Featured: layers exit upward on scroll (all instances) ─ */
  document.querySelectorAll('.featured-scroll-wrapper').forEach((featWrapper) => {
    const featLayer2 = featWrapper.querySelector('.featured__img-layer--2')
    const featLayer3 = featWrapper.querySelector('.featured__img-layer--3')
    const imgFade    = featWrapper.querySelector('.featured__img-fade')

    if (!featLayer2 || !featLayer3) return

    const onFeatScroll = () => {
      const rect      = featWrapper.getBoundingClientRect()
      const maxScroll = featWrapper.offsetHeight - window.innerHeight
      const scrolled  = Math.max(0, -rect.top)
      const progress  = Math.min(1, scrolled / maxScroll)

      const L2_START = 1 / 3, L2_END = 2 / 3
      const L3_START = 2 / 3, L3_END = 1.0

      // Layer 2 exits upward
      if (progress < L2_START) {
        featLayer2.style.transform = 'translateY(0)'
      } else if (progress < L2_END) {
        const t = (progress - L2_START) / (L2_END - L2_START)
        featLayer2.style.transform = `translateY(${-t * 100}%)`
      } else {
        featLayer2.style.transform = 'translateY(-100%)'
      }

      // Layer 3 exits upward
      if (progress < L3_START) {
        featLayer3.style.transform = 'translateY(0)'
      } else {
        const t = (progress - L3_START) / (L3_END - L3_START)
        featLayer3.style.transform = `translateY(${-t * 100}%)`
      }

      // Layer 1 bg fades to #091d1e as layer 2 slides up
      if (imgFade) {
        if (progress < L2_START) {
          imgFade.style.opacity = 0
        } else if (progress < L2_END) {
          const t = (progress - L2_START) / (L2_END - L2_START)
          imgFade.style.opacity = t
        } else {
          imgFade.style.opacity = 1
        }
      }
    }

    window.addEventListener('scroll', onFeatScroll, { passive: true })
  })

})
