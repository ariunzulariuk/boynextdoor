"use client";
import { useEffect, useRef, useState } from "react";

const videos = [
  { title: "BOYNEXTDOOR 'WHO!' MV",          thumb: "/images/yt1.jpg", date: "2023.05.30" },
  { title: "BOYNEXTDOOR 'WANTED' Performance", thumb: "/images/yt2.jpg", date: "2023.07.15" },
  { title: "'Serenade' Dance Practice",       thumb: "/images/yt3.jpg", date: "2023.09.04" },
  { title: "BOYNEXTDOOR Reality Show",        thumb: "/images/yt4.jpg", date: "2024.01.22" },
];

export default function MiniGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll<HTMLElement>(".v-fade").forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, i * 120);
          });
        }
      }),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: "60px 32px 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span style={{ position: "absolute", top: 40, left: "8%", fontSize: 50, color: "#7AB8D6", opacity: 0.4 }}>★</span>
      <span style={{ position: "absolute", bottom: 60, right: "6%", fontSize: 36, color: "#7AB8D6", opacity: 0.5 }}>★</span>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="v-fade" style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease", textAlign: "center", marginBottom: 50 }}>
          <span
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 11,
              letterSpacing: 6,
              color: "#00AEEF",
              fontWeight: 800,
            }}
          >
            YOUTUBE
          </span>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 48,
              color: "#0a0a0a",
              letterSpacing: 3,
              margin: "8px 0 0",
            }}
          >
            НЭВТРҮҮЛГҮҮД
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}
        >
          {videos.map((v, i) => (
            <div
              key={i}
              className="v-fade"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s",
                borderRadius: 14,
                overflow: "hidden",
                cursor: "pointer",
                background: "#fff",
                boxShadow:
                  hovered === i
                    ? "0 16px 40px rgba(0,174,239,0.25)"
                    : "0 6px 22px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
                <img
                  src={v.thumb}
                  alt={v.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    transform: hovered === i ? "scale(1.06)" : "scale(1)",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/600x338/d8eaf5/00AEEF?text=${encodeURIComponent(v.title)}`;
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: hovered === i ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.3s",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "rgba(0,174,239,0.95)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      color: "#fff",
                      transform: hovered === i ? "scale(1.1)" : "scale(1)",
                      transition: "transform 0.3s",
                      boxShadow: "0 8px 24px rgba(0,174,239,0.4)",
                    }}
                  >
                    ▶
                  </div>
                </div>
              </div>
              <div style={{ padding: "14px 18px" }}>
                <div
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#0a0a0a",
                    marginBottom: 4,
                  }}
                >
                  {v.title}
                </div>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#999" }}>
                  {v.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}