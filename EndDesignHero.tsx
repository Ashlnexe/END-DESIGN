// End Design Studios — Cinematic Hero Section
// Framer Code Component
// Paste this into Framer → Assets → Code → New Component
//
// Props you can control from the Framer canvas:
//   videoSrc    — URL or path to your looping background video
//   posterSrc   — Static fallback image shown before video loads
//   headline1   — Line 1 of the hero text  (default: "Design that")
//   headline2   — Line 2 (indented)        (default: "gives form")
//   headline3   — Line 3                   (default: "to emotion")

import { addPropertyControls, ControlType } from "framer"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"

// ─── Types ───────────────────────────────────────────────────────────────────
interface Props {
    videoSrc: string
    posterSrc: string
    headline1: string
    headline2: string
    headline3: string
    width: number
    height: number
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function EndDesignHero({
    videoSrc,
    posterSrc,
    headline1,
    headline2,
    headline3,
    width,
    height,
}: Props) {
    const controls = useAnimation()
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        controls.start("visible")
    }, [])

    // ── Animation variants ──────────────────────────────────────────────────
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
    }

    const lineVariants = {
        hidden: { opacity: 0, y: 32 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
        },
    }

    const fadeVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.0 },
        },
    }

    // ── Styles (inline for Framer portability) ──────────────────────────────
    const S = styles(width, height)

    return (
        <div style={S.hero}>

            {/* ── Video Background ───────────────────────────────────────── */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                poster={posterSrc}
                style={S.video}
            >
                <source src={videoSrc} type="video/mp4" />
            </video>

            {/* ── Cinematic Overlays ─────────────────────────────────────── */}
            <div style={S.overlayVignette} />
            <div style={S.overlayLeft} />
            <div style={S.overlayBottom} />

            {/* ── Navigation ────────────────────────────────────────────── */}
            <nav style={S.nav}>
                {/* Logo */}
                <div style={S.logo}>
                    <span style={S.logoEnd}>END</span>
                    <span style={S.logoSub}>DESIGN STUDIOS</span>
                </div>

                {/* Nav Links */}
                <div style={S.navLinks}>
                    {["PROJECTS", "EXPERTISE", "PRACTICE", "STUDIOS", "SPECIALISTS"].map(
                        (label) => (
                            <NavLink key={label} label={label} />
                        )
                    )}
                </div>

                {/* Search Icon */}
                <button style={S.searchBtn} aria-label="Search">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(245,240,234,0.7)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="10.5" cy="10.5" r="6.5" />
                        <line x1="15.5" y1="15.5" x2="22" y2="22" />
                    </svg>
                </button>
            </nav>

            {/* ── Hero Headline ──────────────────────────────────────────── */}
            <motion.div
                style={S.content}
                variants={containerVariants}
                initial="hidden"
                animate={controls}
            >
                <motion.span style={S.line1} variants={lineVariants}>
                    {headline1}
                </motion.span>
                <motion.span style={S.line2} variants={lineVariants}>
                    {headline2}
                </motion.span>
                <motion.span style={S.line3} variants={lineVariants}>
                    {headline3}
                </motion.span>
            </motion.div>

            {/* ── Footer Strip ──────────────────────────────────────────── */}
            <motion.div
                style={S.footer}
                variants={fadeVariants}
                initial="hidden"
                animate={controls}
            >
                {/* Scroll hint */}
                <div style={S.scrollHint}>
                    <div style={S.scrollLine} />
                    <span style={S.scrollText}>SCROLL</span>
                </div>

                {/* Tagline */}
                <span style={S.tagline}>Architecture · Interiors · Brand</span>
            </motion.div>
        </div>
    )
}

// ─── Nav Link sub-component ───────────────────────────────────────────────────
function NavLink({ label }: { label: string }) {
    return (
        <motion.a
            href="#"
            style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                fontWeight: 300,
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                color: "rgba(245,240,234,0.6)",
                textDecoration: "none",
                cursor: "pointer",
                padding: "4px 0",
                position: "relative" as const,
            }}
            whileHover={{ color: "rgba(245,240,234,1)" }}
            transition={{ duration: 0.25 }}
        >
            {label}
        </motion.a>
    )
}

// ─── Style factory ────────────────────────────────────────────────────────────
function styles(w: number, h: number) {
    const vw = w || 1440
    const vh = h || 900

    const headlineSize = Math.max(56, Math.min(140, vw * 0.085))
    const gutter = Math.max(32, Math.min(80, vw * 0.05))

    return {
        hero: {
            position: "relative" as const,
            width: "100%",
            height: "100%",
            minHeight: vh,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column" as const,
            justifyContent: "space-between",
            backgroundColor: "#0a0806",
            fontFamily: "'Inter', system-ui, sans-serif",
        },

        // ── Video ──────────────────────────────────────────────────────────
        video: {
            position: "absolute" as const,
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover" as const,
            objectPosition: "center",
            filter: "brightness(0.52) saturate(0.75) sepia(0.2)",
            zIndex: 0,
        },

        // ── Overlays ───────────────────────────────────────────────────────
        overlayVignette: {
            position: "absolute" as const,
            inset: 0,
            zIndex: 1,
            background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 25%, rgba(8,5,2,0.35) 55%, rgba(5,3,1,0.75) 100%)",
            pointerEvents: "none" as const,
        },
        overlayLeft: {
            position: "absolute" as const,
            inset: 0,
            zIndex: 1,
            background:
                "linear-gradient(105deg, rgba(8,5,2,0.72) 0%, rgba(8,5,2,0.45) 35%, rgba(8,5,2,0.10) 60%, transparent 80%)",
            pointerEvents: "none" as const,
        },
        overlayBottom: {
            position: "absolute" as const,
            inset: 0,
            zIndex: 1,
            background:
                "linear-gradient(to top, rgba(8,5,2,0.85) 0%, rgba(8,5,2,0.3) 18%, transparent 40%)",
            pointerEvents: "none" as const,
        },

        // ── Navigation ─────────────────────────────────────────────────────
        nav: {
            position: "relative" as const,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "88px",
            padding: `0 ${gutter}px`,
        },

        // Logo
        logo: {
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "flex-start",
            gap: "3px",
            lineHeight: 1,
            cursor: "pointer",
        },
        logoEnd: {
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: `clamp(22px, ${vw * 0.028}px, 36px)`,
            fontWeight: 400,
            letterSpacing: "0.28em",
            color: "rgba(245,240,234,1)",
            textShadow: "0 0 40px rgba(200,160,80,0.2)",
        },
        logoSub: {
            fontFamily: "'Inter', sans-serif",
            fontSize: "8px",
            fontWeight: 200,
            letterSpacing: "0.45em",
            color: "rgba(245,240,234,0.5)",
            textTransform: "uppercase" as const,
        },

        // Nav links
        navLinks: {
            display: "flex",
            alignItems: "center",
            gap: `${Math.max(24, Math.min(52, vw * 0.035))}px`,
            marginLeft: "auto",
            marginRight: `${Math.max(32, Math.min(64, vw * 0.04))}px`,
        },

        // Search
        searchBtn: {
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
        },

        // ── Headline ───────────────────────────────────────────────────────
        content: {
            position: "relative" as const,
            zIndex: 10,
            flex: 1,
            display: "flex",
            flexDirection: "column" as const,
            justifyContent: "center",
            padding: `0 ${gutter}px`,
            paddingBottom: "6vh",
        },

        // Shared line base
        lineBase: {
            display: "block",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: `${headlineSize}px`,
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
            color: "rgba(245,240,234,1)",
            textShadow:
                "0 2px 80px rgba(0,0,0,0.6), 0 0 120px rgba(180,120,50,0.12)",
        },

        get line1() {
            return { ...this.lineBase }
        },
        get line2() {
            return {
                ...this.lineBase,
                paddingLeft: `${Math.max(30, vw * 0.045)}px`,
            }
        },
        get line3() {
            return { ...this.lineBase }
        },

        // ── Footer ─────────────────────────────────────────────────────────
        footer: {
            position: "relative" as const,
            zIndex: 10,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: `0 ${gutter}px 40px`,
        },

        scrollHint: {
            display: "flex",
            alignItems: "center",
            gap: "14px",
        },
        scrollLine: {
            width: "1px",
            height: "52px",
            background:
                "linear-gradient(to bottom, transparent 0%, rgba(245,240,234,0.5) 100%)",
        },
        scrollText: {
            fontFamily: "'Inter', sans-serif",
            fontSize: "9px",
            fontWeight: 300,
            letterSpacing: "0.32em",
            color: "rgba(245,240,234,0.35)",
            writingMode: "vertical-rl" as const,
            transform: "rotate(180deg)",
        },

        tagline: {
            fontFamily: "'Inter', sans-serif",
            fontSize: "9px",
            fontWeight: 300,
            letterSpacing: "0.28em",
            textTransform: "uppercase" as const,
            color: "rgba(245,240,234,0.35)",
        },
    }
}

// ─── Framer Property Controls ─────────────────────────────────────────────────
addPropertyControls(EndDesignHero, {
    videoSrc: {
        type: ControlType.File,
        title: "Video",
        allowedFileTypes: ["mp4", "webm", "mov"],
    },
    posterSrc: {
        type: ControlType.Image,
        title: "Poster / Fallback",
    },
    headline1: {
        type: ControlType.String,
        title: "Line 1",
        defaultValue: "Design that",
    },
    headline2: {
        type: ControlType.String,
        title: "Line 2 (indented)",
        defaultValue: "gives form",
    },
    headline3: {
        type: ControlType.String,
        title: "Line 3",
        defaultValue: "to emotion",
    },
})
