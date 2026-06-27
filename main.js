// End Design Studios — Main JS
// SEO Build: Layer 8 (UX/Perf), Layer 9 (CRO), Layer 10 (Analytics hooks)

document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════════════════════════
     LAYER 10: Analytics — Page View + Engagement Tracking
     Replace 'GA_MEASUREMENT_ID' with real ID when connecting GSC/GA4
  ═══════════════════════════════════════════════════════ */
  const track = (eventName, params = {}) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, params)
    }
    // Dev logging — remove in production
    // console.log('[Analytics]', eventName, params)
  }

  // Track scroll depth milestones (Layer 10)
  const scrollMilestones = new Set()
  const MILESTONES = [25, 50, 75, 90]
  const trackScrollDepth = () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    MILESTONES.forEach(m => {
      if (scrolled >= m && !scrollMilestones.has(m)) {
        scrollMilestones.add(m)
        track('scroll_depth', { depth: m, page_title: document.title })
      }
    })
  }
  window.addEventListener('scroll', trackScrollDepth, { passive: true })

  // Track CTA clicks (Layer 9 + 10)
  document.querySelectorAll('.featured__btn, .who__btn, .collective__btn, .disc-detail__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      track('cta_click', {
        cta_text: btn.textContent.trim(),
        cta_location: btn.closest('section, article')?.id || 'unknown'
      })
    })
  })

  // Track time on page — engagement metric (Layer 10)
  const pageLoadTime = Date.now()
  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - pageLoadTime) / 1000)
    track('time_on_page', { seconds: timeSpent })
  })


  /* ═══════════════════════════════════════════════════════
     HERO: word-by-word cinematic fade-in
  ═══════════════════════════════════════════════════════ */
  const heroLines = document.querySelectorAll('.hero__line')
  let wordIndex = 0
  const BASE_DELAY   = 0.35
  const WORD_STAGGER = 0.16

  heroLines.forEach((line) => {
    const words = line.textContent.trim().split(/\s+/)
    line.innerHTML = words
      .map((word) => {
        const delay = BASE_DELAY + wordIndex++ * WORD_STAGGER
        return `<span class="hero__word" style="animation-delay:${delay}s">${word}</span>`
      })
      .join('<span style="display:inline-block;width:0.28em"></span>')
  })


  /* ═══════════════════════════════════════════════════════
     SCROLL REVEAL — Layer 8: UX
  ═══════════════════════════════════════════════════════ */
  const revealEls = document.querySelectorAll(
    '.who__heading, .who__img-wrap, .who__text-block, ' +
    '.collective__heading, .collective__right, ' +
    '.leadership__heading, .leader-card, ' +
    '.footer__left, .footer__right, .footer__nav'
  )

  revealEls.forEach((el) => el.classList.add('reveal'))

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          revealObserver.unobserve(entry.target)
          // Layer 10: track section visibility
          const sectionId = entry.target.closest('section, article, footer')?.id
          if (sectionId) {
            track('section_viewed', { section_id: sectionId })
          }
        }
      })
    },
    { threshold: 0.12 }
  )

  revealEls.forEach((el) => revealObserver.observe(el))


  /* ═══════════════════════════════════════════════════════
     STAGGER LEADER CARDS
  ═══════════════════════════════════════════════════════ */
  document.querySelectorAll('.leader-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`
  })


  /* ═══════════════════════════════════════════════════════
     DISCIPLINES INTERACTIVE LIST
     Layer 9: CRO — keyboard support added
  ═══════════════════════════════════════════════════════ */
  const discData = [
    { label: 'interiors',    img: 'images/disc-interiors.jpg',    body: 'Deeply considered spaces that unite architecture, material culture, and light into a single, cohesive narrative for every project.' },
    { label: 'architecture', img: 'images/disc-architecture.jpg', body: 'A global architecture practice, delivering transformative design solutions of lasting quality for a diverse range of clients.' },
    { label: 'art',          img: 'images/disc-art.jpg',          body: 'Curated art programs that elevate spaces and inspire.' },
    { label: 'digital',      img: 'images/disc-digital.jpg',      body: 'Innovative digital experiences integrated seamlessly into physical environments.' },
    { label: 'f&b',          img: 'images/disc-fb.jpg',           body: 'Food and beverage concepts where atmosphere and identity are as considered as the menu itself.' },
    { label: 'graphics',     img: 'images/disc-graphics.jpg',     body: 'Visual communication and branding that shape the identity of a place.' },
    { label: 'landscape',    img: 'images/disc-landscape.jpg',    body: 'Exterior environments that connect harmoniously with architecture and nature.' },
    { label: 'leisure',      img: 'images/disc-leisure.jpg',      body: 'Leisure and wellness destinations that place human experience at the centre of every design decision.' },
    { label: 'light',        img: 'images/disc-light.jpg',        body: 'Considered lighting design that sculpts space, evokes emotion, and elevates every environment.' },
    { label: 'procurement',  img: 'images/disc-procurement.jpg',  body: 'Strategic sourcing and procurement for unparalleled quality and value.' },
    { label: 'product',      img: 'images/disc-product.jpg',      body: 'Custom product and furniture design tailored to specific project narratives.' },
    { label: 'residential',  img: 'images/disc-residential.jpg',  body: 'Bespoke living environments crafted around the rhythms and rituals of the people who inhabit them.' },
    { label: 'resort',       img: 'images/disc-resort.jpg',       body: 'Immersive resort environments designed to redefine the guest experience across global destinations.' },
  ]

  const discItems   = document.querySelectorAll('.disc-list__item')
  const discBody    = document.getElementById('disc-body')
  const discBtn     = document.getElementById('disc-btn')
  const discImgWrap = document.getElementById('disc-img-wrap')
  const discDetail  = document.getElementById('disc-detail')

  if (discItems.length && discBody && discImgWrap && discDetail) {

    // Pre-populate image layers for crossfade
    discData.forEach((d, i) => {
      const img = document.createElement('img')
      img.src = d.img
      img.alt = `END Design Studios ${d.label} design — discipline showcase`
      img.className = 'disc-img'
      img.loading = 'lazy'
      img.width = 400
      img.height = 533
      if (i === 0) img.classList.add('is-active')
      discImgWrap.appendChild(img)
    })
    const placeholder = document.getElementById('disc-img')
    if (placeholder) placeholder.remove()

    const allImgs = discImgWrap.querySelectorAll('.disc-img')
    let activeIndex = 0

    const activate = (index) => {
      if (index === activeIndex) return
      activeIndex = index

      discItems.forEach((el, i) => el.classList.toggle('is-active', i === index))

      const activeItem = discItems[index]
      const offset = activeItem.offsetTop
      discDetail.style.transform = `translateY(${offset}px)`

      discBody.classList.remove('is-visible')
      discBtn.classList.remove('is-visible')
      setTimeout(() => {
        discBody.textContent = discData[index].body
        const label = discData[index].label.toUpperCase()
        const isEND = ['ARCHITECTURE', 'DIGITAL'].includes(label)
        discBtn.textContent = `VIEW ${isEND ? 'END ' : ''}${label}`
        discBtn.setAttribute('aria-label', `View our ${discData[index].label} design projects`)
        discBody.classList.add('is-visible')
        discBtn.classList.add('is-visible')
      }, 180)

      allImgs.forEach((img, i) => img.classList.toggle('is-active', i === index))

      // Layer 10: track discipline interest
      track('discipline_hover', { discipline: discData[index].label })
    }

    // Initialise
    discBody.classList.add('is-visible')
    discBtn.classList.add('is-visible')
    discBtn.textContent = 'VIEW INTERIORS'
    discBtn.setAttribute('aria-label', 'View our interiors design projects')
    discDetail.style.transform = `translateY(${discItems[0].offsetTop}px)`

    discItems.forEach((item) => {
      item.addEventListener('mouseenter', () => activate(+item.dataset.index))
      item.addEventListener('click',      () => activate(+item.dataset.index))
      // Layer 9: keyboard accessibility (CRO)
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          activate(+item.dataset.index)
        }
      })
    })

    // Scroll reveal for disciplines section
    const disciplinesSection = document.querySelector('.disciplines')
    if (disciplinesSection) {
      const discObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            disciplinesSection.classList.add('is-revealed')
          } else if (entry.boundingClientRect.top > 0) {
            disciplinesSection.classList.remove('is-revealed')
          }
        })
      }, {
        threshold: 0,
        rootMargin: '-40% 0px -40% 0px'
      })
      discObserver.observe(disciplinesSection)
    }
  }


  /* ═══════════════════════════════════════════════════════
     FEATURED: layers exit upward on scroll
  ═══════════════════════════════════════════════════════ */
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

      if (progress < L2_START) {
        featLayer2.style.transform = 'translateY(0)'
      } else if (progress < L2_END) {
        const t = (progress - L2_START) / (L2_END - L2_START)
        featLayer2.style.transform = `translateY(${-t * 100}%)`
      } else {
        featLayer2.style.transform = 'translateY(-100%)'
      }

      if (progress < L3_START) {
        featLayer3.style.transform = 'translateY(0)'
      } else {
        const t = (progress - L3_START) / (L3_END - L3_START)
        featLayer3.style.transform = `translateY(${-t * 100}%)`
      }

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


  /* ═══════════════════════════════════════════════════════
     LAYER 10: Core Web Vitals reporting stub
     Wire to GSC / GA4 / DataDog when live
  ═══════════════════════════════════════════════════════ */
  if ('PerformanceObserver' in window) {
    // LCP — Largest Contentful Paint
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lcp = entries[entries.length - 1]
        track('web_vital_lcp', {
          value: Math.round(lcp.startTime),
          rating: lcp.startTime < 2500 ? 'good' : lcp.startTime < 4000 ? 'needs-improvement' : 'poor'
        })
      }).observe({ type: 'largest-contentful-paint', buffered: true })
    } catch (e) {}

    // CLS — Cumulative Layout Shift
    try {
      let clsValue = 0
      new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (!entry.hadRecentInput) clsValue += entry.value
        })
        track('web_vital_cls', {
          value: Math.round(clsValue * 1000),
          rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
        })
      }).observe({ type: 'layout-shift', buffered: true })
    } catch (e) {}
  }

})
