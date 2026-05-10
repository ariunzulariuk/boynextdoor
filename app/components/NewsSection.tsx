"use client";
import { useEffect, useRef } from "react";

const news = [
  { title: "BOYNEXTDOOR 5 сард шинэ дугаараа эргэн гарсан зар" },
  { title: "BOYNEXTDOOR-ийн идэвхгүй жил…" },
  { title: "Шинэхэнгийн хөгийн дуу шиг Үнэн шинэ онцгой агуулга." },
];

export default function NewsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll<HTMLElement>(".n-fade").forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateX(0)";
            }, i * 130);
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
      <span style={{ position: "absolute", top: 60, left: "5%", fontSize: 44, color: "#7AB8D6", opacity: 0.4 }}>★</span>
      <span style={{ position: "absolute", bottom: 100, right: "4%", fontSize: 56, color: "#7AB8D6", opacity: 0.4 }}>★</span>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2
          className="n-fade"
          style={{
            opacity: 0,
            transform: "translateX(-20px)",
            transition: "all 0.6s ease",
            fontFamily: "'Arimo', sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: "#0a0a0a",
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          BOYNEXTDOOR — <span style={{ color: "#00AEEF" }}>шинэ артан тайралаар</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* LEFT: photo */}
          <div
            className="n-fade"
            style={{
              opacity: 0,
              transform: "translateX(-30px)",
              transition: "all 0.6s ease",
              borderRadius: 16,
              overflow: "hidden",
              aspectRatio: "4/5",
              boxShadow: "0 24px 60px rgba(0,100,180,0.18)",
            }}
          >
            <img
              src="/images/news.jpg"
              alt="BOYNEXTDOOR"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/500x625/d8eaf5/00AEEF?text=BOYNEXTDOOR";
              }}
            />
          </div>

          {/* RIGHT: cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {news.map((item, i) => (
              <div
                key={i}
                className="n-fade"
                style={{
                  opacity: 0,
                  transform: "translateX(30px)",
                  transition: "all 0.6s ease",
                  padding: "20px 24px",
                  background: "rgba(0,174,239,0.06)",
                  borderLeft: "4px solid #00AEEF",
                  borderRadius: "0 10px 10px 0",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#00AEEF",
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "#222",
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}