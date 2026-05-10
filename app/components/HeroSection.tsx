"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mouse parallax (only desktop)
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      if (imgRef.current) {
        imgRef.current.style.transform = `translate(-50%, 0) translate3d(${x * 16}px, ${y * 16}px, 0)`;
      }
      if (titleRef.current) {
        titleRef.current.style.transform = `translate3d(${x * -8}px, ${y * -8}px, 0)`;
      }
      if (subtitleRef.current) {
        subtitleRef.current.style.transform = `translate3d(${x * 6}px, ${y * 6}px, 0)`;
      }
    };
    const sec = sectionRef.current;
    sec?.addEventListener("mousemove", onMove);
    return () => sec?.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  const renderLetters = (text: string, baseDelay: number) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          opacity: 0,
          transform: "translateY(60px)",
          animation: mounted
            ? `hero-letter 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${baseDelay + i * 0.05}s forwards`
            : "none",
          whiteSpace: "pre",
        }}
      >
        {char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#fff",
        position: "relative",
        minHeight: isMobile ? "auto" : 600,
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes hero-letter {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-img-enter-desktop {
          from { opacity: 0; transform: translateX(-50%) scale(0.92) translateY(40px); }
          to   { opacity: 1; transform: translateX(-50%) scale(1) translateY(0); }
        }
        @keyframes hero-img-enter-mobile {
          from { opacity: 0; transform: scale(0.92) translateY(40px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "100px 20px 0" : "120px 48px 0",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* WHO'S THERE? */}
          <div
            ref={subtitleRef}
            style={{
              zIndex: 4,
              textAlign: "center",
              transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              pointerEvents: "none",
              marginBottom: isMobile ? -6 : -10,
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(22px, 4.5vw, 60px)",
                fontWeight: 700,
                color: "#00AEEF",
                letterSpacing: isMobile ? 4 : 8,
                lineHeight: 1,
                textShadow: "0 4px 20px rgba(255,255,255,0.8)",
              }}
            >
              {renderLetters("WHO'S THERE?", 1.3)}
            </div>
          </div>

          {/* BOYNEXTDOOR */}
          <div
            ref={titleRef}
            style={{
              position: "relative",
              zIndex: 2,
              transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              pointerEvents: "none",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(54px, 16.5vw, 250px)",
                fontWeight: 700,
                color: "#0a0a0a",
                letterSpacing: isMobile ? 3 : 6,
                lineHeight: 0.85,
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              {renderLetters("BOYNEXTDOOR", 0.5)}
            </h1>
          </div>

          {/* IMAGE */}
          <div
            ref={imgRef}
            style={{
              position: isMobile ? "relative" : "absolute",
              left: isMobile ? "auto" : "50%",
              bottom: isMobile ? "auto" : "-60%",
              transform: isMobile ? "none" : "translateX(-50%)",
              width: isMobile ? "100%" : "55%",
              height: isMobile ? "auto" : "140%",
              marginTop: isMobile ? -20 : 0,
              zIndex: 3,
              opacity: 0,
              animation: mounted
                ? isMobile
                  ? "hero-img-enter-mobile 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards"
                  : "hero-img-enter-desktop 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards"
                : "none",
              transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              pointerEvents: "none",
            }}
          >
            <img
              src="/images/bnd.png"
              alt="BOYNEXTDOOR"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center bottom",
                display: "block",
                filter: "drop-shadow(0 30px 50px rgba(0,100,180,0.18))",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/700x900/E3F1F4/00AEEF?text=BOYNEXTDOOR";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}