"use client";
import { useEffect, useRef } from "react";

export default function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting && ref.current) {
          ref.current.style.opacity = "1";
          ref.current.style.transform = "translateY(0)";
        }
      }),
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      style={{
        background: "#fff",
        padding: "80px 32px",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: 900,
          margin: "0 auto",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "all 0.7s ease",
        }}
      >
        <div style={{ fontSize: 28, color: "#00AEEF", marginBottom: 16 }}>★ ★ ★</div>
        <p
          style={{
            fontFamily: "'Arimo', sans-serif",
            fontSize: 26,
            lineHeight: 1.5,
            color: "#00AEEF",
            fontWeight: 800,
            letterSpacing: "0.3px",
            margin: 0,
          }}
        >
          “Хэн миний хөршүүд бэ, өөрсдийгөө гэхээс илүү шинэхэн бүтээгчид байна!”
        </p>
      </div>
    </section>
  );
}