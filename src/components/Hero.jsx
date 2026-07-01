import { useState, useEffect, useRef, useCallback } from "react";

// ── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(words, typingSpeed = 85, deletingSpeed = 55, pauseMs = 1800) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), pauseMs);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    }, deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return text;
}

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1200, delay = 500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const steps = 60;
      const step = target / steps;
      const iv = setInterval(() => {
        start = Math.min(start + step, target);
        setCount(Math.round(start));
        if (start >= target) clearInterval(iv);
      }, duration / steps);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, duration, delay]);
  return count;
}

// ── Live clock ────────────────────────────────────────────────────────────────
function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime([n.getHours(), n.getMinutes(), n.getSeconds()]
        .map((x) => String(x).padStart(2, "0"))
        .join(":"));
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);
  return time;
}

// ── Photo — paste your base64 or URL here ────────────────────────────────────
const PHOTO_SRC = "/favicon.svg"; // ← replace with your image path or base64

// ── Stats data ────────────────────────────────────────────────────────────────
const STATS = [
  { target: 42, label: "Projects" },
  { target: 5,  label: "Yrs Exp"  },
  { target: 28, label: "Clients"  },
];

const ROLES = [
  "Frontend Developer",
  "Full-Stack Engineer",
  "UI Craftsman",
  "React Specialist",
  "Problem Solver",
];

// ── Glitch text ───────────────────────────────────────────────────────────────
function GlitchText({ text }) {
  return (
    <span className="relative inline-block glitch-wrap" data-text={text}>
      {text}
      <style>{`
        .glitch-wrap {
          color: transparent;
          -webkit-text-stroke: 1.5px #fff;
        }
        .glitch-wrap::before,
        .glitch-wrap::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          color: transparent;
          -webkit-text-stroke: 1.5px #fff;
          width: 100%;
        }
        .glitch-wrap::before {
          left: 2px;
          -webkit-text-stroke: 1.5px #00ffff;
          animation: glitch1 3s infinite;
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
        }
        .glitch-wrap::after {
          left: -2px;
          -webkit-text-stroke: 1.5px #a000ff;
          animation: glitch2 3s infinite;
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
        }
        @keyframes glitch1 {
          0%,90%,100%{ transform:translate(0) }
          91%{ transform:translate(-3px,1px) }
          93%{ transform:translate(3px,-1px) }
          95%{ transform:translate(-2px,2px) }
          97%{ transform:translate(2px,0) }
        }
        @keyframes glitch2 {
          0%,88%,100%{ transform:translate(0) }
          89%{ transform:translate(3px,-1px) }
          91%{ transform:translate(-3px,1px) }
          94%{ transform:translate(2px,-2px) }
          96%{ transform:translate(-1px,2px) }
        }
        @keyframes gridDrift {
          from { background-position: 0 0 }
          to   { background-position: 44px 44px }
        }
        @keyframes blink {
          0%,100%{ opacity:1 }
          50%{ opacity:0.15 }
        }
        @keyframes blinkCursor {
          0%,100%{ opacity:1 }
          50%{ opacity:0 }
        }
        @keyframes pulseOrb {
          0%,100%{ transform:scale(1); opacity:1 }
          50%{ transform:scale(1.12); opacity:0.6 }
        }
        @keyframes scrollLine {
          0%  { transform:scaleY(0); transform-origin:top }
          50% { transform:scaleY(1); transform-origin:top }
          51% { transform:scaleY(1); transform-origin:bottom }
          100%{ transform:scaleY(0); transform-origin:bottom }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg) }
          to   { transform: rotate(360deg) }
        }
        .grid-drift {
          animation: gridDrift 22s linear infinite;
        }
        .dot-blink {
          animation: blink 2s ease-in-out infinite;
        }
        .cursor-blink {
          animation: blinkCursor 0.8s step-end infinite;
        }
        .orb1 {
          animation: pulseOrb 5s ease-in-out infinite;
        }
        .orb2 {
          animation: pulseOrb 7s ease-in-out infinite reverse;
        }
        .scroll-line-anim {
          animation: scrollLine 1.5s ease-in-out infinite;
        }
        /* Cursor circle - no border, just glow */
        .cursor-circle {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease;
          border-radius: 50%;
          overflow: hidden;
          box-shadow:
            0 0 18px 6px rgba(0,255,255,0.45),
            0 0 36px 10px rgba(160,0,255,0.25);
        }
        .cursor-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          filter: saturate(0.85) contrast(1.08);
          display: block;
          border-radius: 50%;
        }
        /* scanline overlay on cursor */
        .cursor-scan {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0,0,0,0.1) 3px,
            rgba(0,0,0,0.1) 4px
          );
        }
        .scanlines-bg {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.1) 2px,
            rgba(0,0,0,0.1) 4px
          );
        }
        /* responsive */
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .right-zone { display: none; }
          .hero-name-size { font-size: 52px !important; }
        }
      `}</style>
    </span>
  );
}

// ── Stat item ─────────────────────────────────────────────────────────────────
function Stat({ target, label }) {
  const count = useCountUp(target);
  return (
    <div>
      <div className="text-xl font-bold text-white font-sans leading-none">
        <span className="text-cyan-400">{count}</span>+
      </div>
      <div className="text-[10px] text-neutral-600 tracking-widest uppercase mt-1"
        style={{ fontFamily: "'Share Tech Mono', monospace" }}>
        {label}
      </div>
    </div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function PortfolioHero() {
  const roleText = useTypewriter(ROLES);
  const clock = useClock();

  // Cursor circle
  const circleRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const inRight = useRef(false);

  const animate = useCallback(() => {
    const speed = 0.12;
    circlePos.current.x += (mousePos.current.x - circlePos.current.x) * speed;
    circlePos.current.y += (mousePos.current.y - circlePos.current.y) * speed;
    if (circleRef.current) {
      circleRef.current.style.left = circlePos.current.x + "px";
      circleRef.current.style.top  = circlePos.current.y + "px";
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  const handleRightEnter = () => {
    inRight.current = true;
    if (circleRef.current) circleRef.current.style.opacity = "1";
  };
  const handleRightLeave = () => {
    inRight.current = false;
    if (circleRef.current) circleRef.current.style.opacity = "0";
  };

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap"
        rel="stylesheet"
      />

      {/* Cursor circle — no ring border, pure glow */}
      <div
        ref={circleRef}
        className="cursor-circle"
        style={{ width: 110, height: 110, opacity: 0 }}
      >
        <img src={PHOTO_SRC} alt="Developer" />
        <div className="cursor-scan" />
      </div>

      {/* Hero */}
      <section
        className="relative w-full overflow-hidden bg-[#050505]"
        style={{ minHeight: "100vh", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {/* Animated grid */}
        <div
          className="grid-drift absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Scanlines */}
        <div className="scanlines-bg absolute inset-0 z-[1] pointer-events-none" />

        {/* Orbs */}
        <div
          className="orb1 absolute pointer-events-none z-0"
          style={{
            top: -100, right: -100, width: 420, height: 420,
            background: "radial-gradient(circle, rgba(0,255,255,0.06) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="orb2 absolute pointer-events-none z-0"
          style={{
            bottom: -80, left: 0, width: 320, height: 320,
            background: "radial-gradient(circle, rgba(160,0,255,0.05) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-5 h-5 z-10 border-t border-l border-cyan-400" />
        <div className="absolute bottom-4 right-4 w-5 h-5 z-10 border-b border-r border-purple-600" />

        {/* Main grid */}
        <div
          className="hero-grid relative z-[2] w-full h-full"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "100vh",
          }}
        >
          {/* ── LEFT ── */}
          <div className="flex flex-col justify-center px-10 py-16 lg:px-14">

            {/* Status */}
            <div className="flex items-center gap-2 mb-7">
              <span
                className="dot-blink w-[7px] h-[7px] rounded-full bg-cyan-400"
                style={{ boxShadow: "0 0 8px #00ffff" }}
              />
              <span
                className="text-cyan-400 uppercase tracking-[0.18em] text-[11px]"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                Available for hire
              </span>
              <span className="text-neutral-800 mx-1">—</span>
              <span
                className="text-neutral-700 text-[11px] tracking-widest"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                {clock}
              </span>
            </div>

            {/* Name */}
            <div
              className="hero-name-size leading-[0.9] font-bold tracking-[-0.03em] mb-1 select-none"
              style={{ fontSize: 68 }}
            >
              <span className="block text-white">JOHN</span>
              <span className="block">
                <GlitchText text="DOE." />
              </span>
            </div>

            {/* Role typewriter */}
            <div className="flex items-center gap-2 my-4">
              <span
                className="text-neutral-600 text-[13px]"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                ~/
              </span>
              <span
                className="text-cyan-400 text-[14px] tracking-wide"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                {roleText}
              </span>
              <span
                className="cursor-blink inline-block w-[2px] h-[15px] bg-cyan-400 ml-[2px]"
              />
            </div>

            {/* Tagline */}
            <p
              className="text-[14px] text-neutral-500 leading-relaxed mb-7 max-w-xs border-l-2 border-purple-700 pl-4"
            >
              I don't follow trends —{" "}
              <span className="text-neutral-600">I build what hasn't been built yet.</span>
            </p>

            {/* CTA */}
            <div className="flex items-center gap-4 flex-wrap">
              <button
                className="bg-cyan-400 text-black px-6 py-[10px] text-[12px] font-bold uppercase tracking-widest transition-all duration-200 hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] active:scale-95"
                style={{ clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}
              >
                View my work
              </button>
              <button
                className="border border-neutral-800 text-neutral-500 px-5 py-[9px] text-[12px] uppercase tracking-widest transition-all duration-200 hover:border-purple-600 hover:text-purple-400 active:scale-95 bg-transparent"
              >
                Contact me
              </button>
            </div>

            {/* Stats */}
            <div
              className="flex gap-8 mt-8 pt-6"
              style={{ borderTop: "1px solid #0e0e0e" }}
            >
              {STATS.map((s) => (
                <Stat key={s.label} target={s.target} label={s.label} />
              ))}
            </div>
          </div>

          {/* ── RIGHT — hover zone ── */}
          <div
            className="right-zone relative flex items-center justify-center overflow-hidden cursor-none"
            onMouseEnter={handleRightEnter}
            onMouseLeave={handleRightLeave}
          >
            {/* Crosshair lines */}
            <div
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                top: "50%",
                height: 1,
                background: "linear-gradient(90deg, transparent, #111 30%, #111 70%, transparent)",
              }}
            />
            <div
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{
                left: "50%",
                width: 1,
                background: "linear-gradient(180deg, transparent, #111 30%, #111 70%, transparent)",
              }}
            />

            {/* Hint text */}
            <div
              className="absolute select-none pointer-events-none text-center z-10 transition-opacity duration-300"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 11,
                color: "#1c1c1c",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                lineHeight: 2.2,
              }}
            >
              move cursor<br />here
            </div>

            {/* Decorative corner dots */}
            {[
              { top: "20%", left: "20%" },
              { top: "20%", right: "20%" },
              { bottom: "20%", left: "20%" },
              { bottom: "20%", right: "20%" },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-neutral-800 pointer-events-none"
                style={pos}
              />
            ))}

            {/* Code-like floating labels */}
            <div
              className="absolute bottom-8 left-8 pointer-events-none"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 10,
                color: "#1a1a1a",
                letterSpacing: "0.15em",
              }}
            >
              &lt;dev /&gt;
            </div>
            <div
              className="absolute top-8 right-8 pointer-events-none"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 10,
                color: "#1a1a1a",
                letterSpacing: "0.15em",
              }}
            >
              v1.0.0
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[6px] z-10">
          <div
            className="scroll-line-anim"
            style={{
              width: 1,
              height: 28,
              background: "linear-gradient(#00ffff, transparent)",
            }}
          />
          <span
            className="text-[9px] text-neutral-800 tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
          >
            scroll
          </span>
        </div>
      </section>
    </>
  );
}