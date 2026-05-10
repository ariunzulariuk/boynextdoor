"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = ["Танилцуулга", "Гишүүд", "Хөгжим", "Видео"];

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "10px 20px" : "10px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ flexShrink: 0 }}>
          <img
            src="/images/logo.png"
            alt="BOYNEXTDOOR"
            style={{ height: isMobile ? 28 : 34, objectFit: "contain", display: "block" }}
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.outerHTML = `<span style="font-family:'Bebas Neue',sans-serif;font-size:${isMobile ? 16 : 20}px;letter-spacing:3px;color:#00AEEF;font-weight:700">BOYNEXTDOOR</span>`;
            }}
          />
        </Link>

        {/* Desktop nav */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: 40 }}>
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href="#"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1a1a2e",
                  textDecoration: "none",
                  letterSpacing: "0.3px",
                }}
              >
                {link}
              </Link>
            ))}
          </nav>
        )}

        {/* Desktop social */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="#" style={iconBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#00AEEF">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" style={iconBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00AEEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                <polyline points="17 2 12 7 7 2" />
              </svg>
            </a>
          </div>
        )}

        {/* Mobile burger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="menu"
            style={{
              width: 36,
              height: 36,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              padding: 0,
            }}
          >
            <span
              style={{
                width: 22,
                height: 2,
                background: "#0a0a0a",
                transition: "transform 0.3s",
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <span
              style={{
                width: 22,
                height: 2,
                background: "#0a0a0a",
                transition: "opacity 0.3s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: 22,
                height: 2,
                background: "#0a0a0a",
                transition: "transform 0.3s",
                transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
          </button>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div
          style={{
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(10px)",
            padding: "20px 28px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            borderTop: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href="#"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: "#1a1a2e",
                textDecoration: "none",
                paddingBottom: 10,
                borderBottom: "1px solid #eee",
              }}
            >
              {link}
            </Link>
          ))}

          <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
            <a href="#" style={iconBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#00AEEF">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" style={iconBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00AEEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                <polyline points="17 2 12 7 7 2" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

const iconBtn: React.CSSProperties = {
  width: 34, height: 34, borderRadius: "50%",
  border: "1.5px solid rgba(0,174,239,0.5)",
  display: "flex", alignItems: "center", justifyContent: "center",
};