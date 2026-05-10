"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  const socials = [
    { name: "Twitter", link: "#" },
    { name: "Instagram", link: "#" },
    { name: "YouTube", link: "#" },
    { name: "TikTok", link: "#" },
  ];

  return (
    <footer
      style={{
        background: "#05071a",
        padding: isMobile ? "40px 20px 24px" : "60px 32px 32px",
        borderTop: "1px solid rgba(0,174,239,0.15)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isMobile ? 22 : 28,
            letterSpacing: 4,
            color: "#00AEEF",
          }}
        >
          BOYNEXTDOOR
        </div>

        <div
          style={{
            display: "flex",
            gap: isMobile ? 12 : 16,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                letterSpacing: 1,
                fontWeight: 600,
                transition: "0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#00AEEF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              }}
            >
              {s.name}
            </a>
          ))}
        </div>

        <div
          style={{
            width: "100%",
            height: 1,
            background: "rgba(255,255,255,0.06)",
          }}
        />

        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 11,
            color: "rgba(255,255,255,0.25)",
            textAlign: "center",
            letterSpacing: 1,
            margin: 0,
          }}
        >
          © 2024 BOYNEXTDOOR FAN SITE · Монгол фэн сайт · KOZ
          ENTERTAINMENT
        </p>
      </div>
    </footer>
  );
}