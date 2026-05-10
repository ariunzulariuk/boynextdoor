"use client";
import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [year, setYear] = useState(0);
  const [members, setMembers] = useState(0);
  const [albums, setAlbums] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const animate = (target: number, setter: (v: number) => void, dur = 1400) => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setter(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    animate(2023, setYear, 1600);
    animate(6, setMembers, 1200);
    animate(6, setAlbums, 1400);
  }, [visible]);

  const onImgMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const el = imgWrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(0)`;
  };
  const onImgLeave = () => {
    if (imgWrapRef.current) {
      imgWrapRef.current.style.transform =
        "perspective(1000px) rotateY(0) rotateX(0) translateZ(0)";
    }
  };

  const titleWords = ["BOY", "NEXT", "DOOR"];

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: isMobile ? "30px 20px 20px" : "40px 0 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes about-float {
          0%,100% { transform: translateY(0) rotate(var(--r,0deg)); }
          50%     { transform: translateY(-12px) rotate(var(--r,0deg)); }
        }
        @keyframes about-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? 0 : "0 48px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1.05fr",
          gap: isMobile ? 50 : 80,
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* ============ LEFT ============ */}
        <div
          style={{
            position: "relative",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
            maxWidth: isMobile ? 400 : "100%",
            margin: isMobile ? "0 auto" : 0,
            width: "100%",
          }}
        >
          {/* Floating year badge */}
          <div
            style={{
              position: "absolute",
              top: -10,
              right: isMobile ? 10 : 30,
              zIndex: 3,
              background: "#00AEEF",
              color: "#fff",
              padding: isMobile ? "10px 14px" : "12px 18px",
              borderRadius: 14,
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: 2,
              boxShadow: "0 12px 30px rgba(0,174,239,0.35)",
              ["--r" as any]: "-4deg",
              animation: "about-float 4s ease-in-out infinite",
            }}
          >
            <div style={{ fontSize: 10, opacity: 0.85 }}>DEBUT</div>
            <div style={{ fontSize: isMobile ? 18 : 22 }}>2023.05.30</div>
          </div>

          <svg
            viewBox="0 0 24 24"
            style={{
              position: "absolute",
              top: 20,
              left: -20,
              width: 32,
              height: 32,
              fill: "#7CC8E8",
              opacity: 0.55,
              animation: "about-float 6s ease-in-out infinite",
            }}
          >
            <path d="M12 .587l3.668 7.568L24 9.75l-6 5.847L19.336 24 12 20.187 4.664 24 6 15.597 0 9.75l8.332-1.595z" />
          </svg>

          <div
            ref={imgWrapRef}
            onMouseMove={onImgMove}
            onMouseLeave={onImgLeave}
            style={{
              position: "relative",
              transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -20,
                background: "radial-gradient(circle at 50% 60%, rgba(0,174,239,0.18), transparent 70%)",
                filter: "blur(20px)",
                zIndex: 0,
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                borderRadius: 24,
                overflow: "hidden",
                aspectRatio: "4 / 5",
                background: "#E3F1F4",
                boxShadow: "0 30px 60px rgba(0,100,180,0.18)",
              }}
            >
              <img
                src="/images/about.png"
                alt="BOYNEXTDOOR"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/500x625/E3F1F4/00AEEF?text=BOYNEXTDOOR";
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "60px 20px 18px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                  color: "#fff",
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <span style={{ fontSize: isMobile ? 18 : 22 }}>BOYNEXTDOOR</span>
                <span style={{ fontSize: 11, opacity: 0.8 }}>K-POP / 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============ RIGHT ============ */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 14,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: "all 0.7s ease",
            }}
          >
            <div
              style={{
                width: 36,
                height: 2,
                background: "#00AEEF",
                transformOrigin: "left",
                animation: visible ? "about-line-grow 0.7s ease forwards" : "none",
              }}
            />
            <span
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 11,
                letterSpacing: 5,
                color: "#00AEEF",
                fontWeight: 800,
              }}
            >
              ABOUT
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(36px, 6vw, 68px)",
              color: "#0a0a0a",
              letterSpacing: 3,
              margin: 0,
              lineHeight: 1,
              display: "flex",
              gap: isMobile ? 8 : 14,
              flexWrap: "wrap",
            }}
          >
            {titleWords.map((w, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.12}s`,
                  color: i === 1 ? "#00AEEF" : "#0a0a0a",
                }}
              >
                {w}
              </span>
            ))}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: isMobile ? 10 : 14,
              marginTop: 24,
            }}
          >
            {[
              { label: "ДЕБЮТ ОН", value: year, suffix: "" },
              { label: "ГИШҮҮН", value: members, suffix: "" },
              { label: "АЛЬБОМ", value: albums, suffix: "+" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? "14px 10px" : "18px 16px",
                  borderRadius: 14,
                  background: "rgba(0,174,239,0.05)",
                  border: "1px solid rgba(0,174,239,0.15)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${0.5 + i * 0.1}s`,
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: isMobile ? 26 : 36,
                    color: "#0a0a0a",
                    letterSpacing: 1,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                  <span style={{ color: "#00AEEF" }}>{s.suffix}</span>
                </div>
                <div
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: 10,
                    color: "#888",
                    fontWeight: 700,
                    letterSpacing: 2,
                    marginTop: 6,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: "'Arimo', sans-serif",
              fontSize: 14,
              lineHeight: 1.85,
              color: "#444",
              fontWeight: 500,
              marginTop: 24,
              marginBottom: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.85s",
            }}
          >
            BOYNEXTDOOR хамтлаг нь 2023 оны 5 дугаар сарын 30-нд KOZ
            энтертайнментийн дор <b>One and Only</b> дуугаараа дебют хийсэн билээ.
            Одоогоор 5 мини альбом, 1 дижитал single гаргасан бөгөөд
            <b> If I Say I Love You</b> дуугаараа олон хүний хайрыг татсан.
            Дэбют хийсэн цагаасаа ам барьж байгаагүйгээрээ алдартай юм.
          </p>

          <div
            style={{
              marginTop: 28,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 1s",
            }}
          >
            <button
              style={{
                background: "#00AEEF",
                color: "#fff",
                border: "none",
                padding: "13px 24px",
                borderRadius: 999,
                fontFamily: "'Arimo', sans-serif",
                fontWeight: 800,
                fontSize: 13,
                cursor: "pointer",
                letterSpacing: "0.5px",
                boxShadow: "0 8px 24px rgba(0,174,239,0.35)",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#0097cc";
                el.style.transform = "translateY(-2px)";
                const arr = el.querySelector(".arr") as HTMLElement;
                if (arr) arr.style.transform = "translateX(6px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#00AEEF";
                el.style.transform = "translateY(0)";
                const arr = el.querySelector(".arr") as HTMLElement;
                if (arr) arr.style.transform = "translateX(0)";
              }}
            >
              Дэлгэрэнгүй мэдээлэл
              <span
                className="arr"
                style={{
                  display: "inline-block",
                  transition: "transform 0.3s",
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}