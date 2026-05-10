"use client";
import { useEffect, useRef, useState } from "react";

const albums = [
  {
    title: "WHO!",
    year: "2023",
    desc: "Оролцсон гишүүд: Жэхён, Тэсан, Үнхаг",
    cover: "/images/whoa.png",
    spotifyId: "0wesgG3gMPRK5awyZFEPU2", // WHO! album
    tracks: [
      { n: 1, title: "But I Like You", dur: "3:12" },
      { n: 2, title: "One and Only", dur: "3:24" },
      { n: 3, title: "Serenade", dur: "2:58" },
    ],
  },
  {
    title: "WHY..",
    year: "2023",
    desc: "Оролцсон гишүүд: Жэхён, Тэсан, Үнхаг",
    cover: "/images/why.png",
    spotifyId: "45skMBkupbWiAxTeZ77rVa", // WHY..
    tracks: [
      { n: 1, title: "But Sometimes", dur: "3:18" },
      { n: 2, title: "Crying", dur: "2:54" },
      { n: 3, title: "ABCDLOVE", dur: "3:05" },
      { n: 4, title: "But I Like You", dur: "3:12" },
      { n: 5, title: "One and Only", dur: "3:24" },
      { n: 6, title: "Serenade", dur: "2:58" },
    ],
  },
  {
    title: "HOW?",
    year: "2024",
    desc: "Оролцсон гишүүд: Жэхён, Тэсан, Үнхаг",
    cover: "/images/how.png",
    spotifyId: "2p5IDUbayBHcmcgSNIQx6V", // HOW?
    tracks: [
      { n: 1, title: "Earth, Wind & Fire", dur: "3:14" },
      { n: 2, title: "OUR", dur: "2:48" },
      { n: 3, title: "Amnesia", dur: "3:30" },
      { n: 4, title: "So let's go see the stars", dur: "3:01" },
      { n: 5, title: "l i f e i s c o o l", dur: "3:12" },
      { n: 6, title: "Dear. My Darling", dur: "3:26" },
      { n: 7, title: "Earth, Wind & Fire (English ver)", dur: "3:12" },
    ],
  },
  {
    title: "19.99",
    year: "2024",
    desc: "Оролцсон гишүүд: Жэхён, Тэсан, Үнхаг",
    cover: "/images/1999.png",
    spotifyId: "4AvNQasUXJ4uHHmtypy6BF",
    tracks: [
      { n: 1, title: "Dangerous", dur: "3:10" },
      { n: 2, title: "Gonna Be A Rock", dur: "3:08" },
      { n: 3, title: "SKIT", dur: "2:56" },
      { n: 4, title: "Nice Guy", dur: "3:18" },
      { n: 5, title: "20", dur: "3:22" },
      { n: 6, title: "Call Me", dur: "3:05" },
      { n: 7, title: "Nice Guy (English ver)", dur: "3:08" },
    ],
  },
  {
    title: "If I say I love you",
    year: "2025",
    desc: "Оролцсон гишүүд: Жэхён, Тэсан, Үнхаг",
    cover: "/images/love.png",
    spotifyId: "0oG7GdJqiwdDcVfz1FwZEe",
    tracks: [
      { n: 1, title: "If I Say I Love You", dur: "3:10" },
    ],
  },
  {
    title: "No Genre",
    year: "2025",
    desc: "Оролцсон гишүүд: Жэхён, Тэсан, Үнхаг",
    cover: "/images/no.png",
    spotifyId: "2E8hkTJKnSCv69mjVAh6hL", // No Genre
    tracks: [
      { n: 1, title: "123-78", dur: "3:10" },
      { n: 2, title: "I Feel Good", dur: "3:08" },
      { n: 3, title: "Step By Step", dur: "2:56" },
      { n: 4, title: "Is That True?", dur: "3:18" },
      { n: 5, title: "Next Mistake", dur: "3:22" },
      { n: 6, title: "If I Say I Love You", dur: "3:05" },
      { n: 7, title: "I Feel Good (English ver)", dur: "3:08" },
    ],
  },
  {
    title: "The Action",
    year: "2025",
    desc: "Оролцсон гишүүд: Жэхён, Тэсан, Ихан,  Үнхаг",
    cover: "/images/action.png",
    spotifyId: "6NKAKKTVPPE85NIDY9u6QD",
    tracks: [
      { n: 1, title: "Live In Paris", dur: "3:10" },
      { n: 2, title: "Hollywood Action", dur: "3:08" },
      { n: 3, title: "JAM!", dur: "2:56" },
      { n: 4, title: "Bathroom", dur: "3:18" },
      { n: 5, title: "As Time Goes By", dur: "3:22" },
    ],
  },
];

export default function MusicGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showSpotify, setShowSpotify] = useState(false);

  // Drag state
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const startAngle = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragAngle, setDragAngle] = useState(0);

  // Responsive
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll<HTMLElement>(".mg-fade").forEach((el, i) => {
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

  // Lock body scroll when modal open
  useEffect(() => {
    if (showSpotify) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSpotify]);

  const album = albums[activeIdx];

  // Sizes scale by viewport
  const ringSize = isMobile ? 280 : 380;
  const discSize = isMobile ? 220 : 300;
  const coverSize = isMobile ? 80 : 110;
  const playSize = isMobile ? 42 : 50;

  const stepAngle = 360 / albums.length;
  const activeAngle = activeIdx * stepAngle;

  const getAngleFromCenter = (clientX: number, clientY: number) => {
    if (!ringRef.current) return 0;
    const r = ringRef.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
  };

  const onDragStart = (clientX: number, clientY: number) => {
    dragStart.current = { x: clientX, y: clientY };
    startAngle.current = getAngleFromCenter(clientX, clientY);
    setIsDragging(true);
  };

  const onDragMove = (clientX: number, clientY: number) => {
    if (!dragStart.current) return;
    const currentAngle = getAngleFromCenter(clientX, clientY);
    let delta = currentAngle - startAngle.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    setDragAngle(delta);
  };

  const onDragEnd = () => {
    if (!dragStart.current) return;
    const totalAngle = activeAngle + dragAngle;
    const snappedIdx = Math.round(totalAngle / stepAngle);
    const newIdx = ((snappedIdx % albums.length) + albums.length) % albums.length;
    setActiveIdx(newIdx);
    dragStart.current = null;
    setIsDragging(false);
    setDragAngle(0);
  };

  const visualAngle = isDragging ? activeAngle + dragAngle : activeAngle;

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: isMobile ? "20px 20px" : "0px 48px 0px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes mg-cover-pop {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes mg-modal-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes mg-modal-pop {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Decorative stars */}
      <span
        style={{
          position: "absolute",
          top: 40,
          left: "5%",
          fontSize: isMobile ? 36 : 60,
          color: "#7CC8E8",
          opacity: 0.4,
        }}
      >
        ★
      </span>
      <span
        style={{
          position: "absolute",
          bottom: 60,
          right: "6%",
          fontSize: isMobile ? 50 : 80,
          color: "#7CC8E8",
          opacity: 0.35,
        }}
      >
        ★
      </span>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          className="mg-fade"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            transition: "all 0.7s ease",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr",
            gap: isMobile ? 30 : 80,
            alignItems: "center",
          }}
        >
          {/* ============ LEFT: Disc + draggable ring with play button ============ */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: ringSize + 40,
            }}
          >
            <div
              ref={ringRef}
              onMouseDown={(e) => onDragStart(e.clientX, e.clientY)}
              onMouseMove={(e) => isDragging && onDragMove(e.clientX, e.clientY)}
              onMouseUp={onDragEnd}
              onMouseLeave={() => isDragging && onDragEnd()}
              onTouchStart={(e) =>
                onDragStart(e.touches[0].clientX, e.touches[0].clientY)
              }
              onTouchMove={(e) => onDragMove(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchEnd={onDragEnd}
              style={{
                position: "relative",
                width: ringSize,
                height: ringSize,
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
                touchAction: "none",
              }}
            >
              {/* Outer dashed ring */}
              <svg
                viewBox={`0 0 ${ringSize} ${ringSize}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              >
                <circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={ringSize / 2 - 1}
                  fill="none"
                  stroke="#cfe3ec"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />
              </svg>

              {/* Vinyl disc */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: discSize,
                  height: discSize,
                  borderRadius: "50%",
                  overflow: "hidden",
                  transform: "translate(-50%, -50%)",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))",
                  pointerEvents: "none",
                }}
              >
                <img
                  src="/images/disc.png"
                  alt="vinyl"
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    const parent = el.parentElement;
                    if (parent && !parent.querySelector(".vinyl-fallback")) {
                      const div = document.createElement("div");
                      div.className = "vinyl-fallback";
                      div.style.cssText = `
                        width:100%;height:100%;border-radius:50%;
                        background:radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000 70%);
                      `;
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>

              {/* Center album cover */}
              <div
                key={activeIdx}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: coverSize,
                  height: coverSize,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "4px solid #fff",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
                  zIndex: 4,
                  transform: "translate(-50%, -50%)",
                  animation: "mg-cover-pop 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                  pointerEvents: "none",
                }}
              >
                <img
                  src={album.cover}
                  alt={album.title}
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://via.placeholder.com/${coverSize}/00AEEF/fff?text=${album.title}`;
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow: "0 0 0 2px #0a0a0a",
                  }}
                />
              </div>

              {/* TRAVELING PLAY BUTTON ON RING */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pointerEvents: "none",
                  transform: `rotate(${visualAngle}deg)`,
                  transition: isDragging
                    ? "none"
                    : "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                  zIndex: 8,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -playSize / 2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    pointerEvents: "auto",
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSpotify(true);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    aria-label="play"
                    style={{
                      width: playSize,
                      height: playSize,
                      borderRadius: "50%",
                      background: "#00AEEF",
                      border: "4px solid #fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 16,
                      transform: `rotate(${-visualAngle}deg)`,
                      transition: isDragging
                        ? "none"
                        : "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                      boxShadow: "0 10px 22px rgba(0,174,239,0.5)",
                    }}
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ============ RIGHT: Tracklist ============ */}
          <div
            style={{
              position: "relative",
              zIndex: 5,
              minWidth: 0,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <div
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 11,
                letterSpacing: 4,
                color: "#00AEEF",
                fontWeight: 800,
                marginBottom: 4,
              }}
            >
              BOYNEXTDOOR · {album.year}
            </div>
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: isMobile ? 38 : 56,
                color: "#0a0a0a",
                letterSpacing: 3,
                margin: "0 0 10px",
                lineHeight: 0.95,
              }}
            >
              {album.title}
            </h3>

            <p
              style={{
                fontFamily: "'Arimo', sans-serif",
                fontSize: 13,
                lineHeight: 1.6,
                color: "#666",
                fontWeight: 500,
                margin: isMobile ? "0 auto 20px" : "0 0 20px",
                maxWidth: 480,
              }}
            >
              {album.desc}
            </p>

            <div
              style={{
                borderTop: "1px solid #eef2f6",
                textAlign: "left",
              }}
            >
              {album.tracks.map((t) => (
                <div
                  key={t.n}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 0",
                    borderBottom: "1px solid #eef2f6",
                    cursor: "pointer",
                    transition: "background 0.2s, padding 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(0,174,239,0.05)";
                    el.style.paddingLeft = "10px";
                    el.style.paddingRight = "10px";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "transparent";
                    el.style.paddingLeft = "0";
                    el.style.paddingRight = "0";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 18,
                      color: "#00AEEF",
                      width: 24,
                      letterSpacing: 1,
                    }}
                  >
                    {String(t.n).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontFamily: "'Arimo', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#0a0a0a",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: 12,
                      color: "#999",
                    }}
                  >
                    {t.dur}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowSpotify(true)}
              style={{
                marginTop: 24,
                background: "#00AEEF",
                color: "#fff",
                border: "none",
                padding: "12px 28px",
                borderRadius: 999,
                fontFamily: "'Arimo', sans-serif",
                fontWeight: 800,
                fontSize: 13,
                cursor: "pointer",
                letterSpacing: 1.5,
                boxShadow: "0 8px 22px rgba(0,174,239,0.4)",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <span style={{ fontSize: 14 }}>▶</span>
              Сонсох
            </button>
          </div>
        </div>
      </div>

      {/* ============ SPOTIFY MODAL ============ */}
      {showSpotify && (
        <div
          onClick={() => setShowSpotify(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 20,
            animation: "mg-modal-fade-in 0.3s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#191414",
              borderRadius: 16,
              padding: isMobile ? 16 : 24,
              maxWidth: 600,
              width: "100%",
              position: "relative",
              animation: "mg-modal-pop 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowSpotify(false)}
              aria-label="close"
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                zIndex: 2,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
              }}
            >
              ✕
            </button>

            {/* Modal title */}
            <div
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 12,
                letterSpacing: 4,
                color: "#1DB954",
                fontWeight: 800,
                marginBottom: 4,
              }}
            >
              ▶ SPOTIFY
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28,
                color: "#fff",
                letterSpacing: 2,
                marginBottom: 16,
              }}
            >
              {album.title}
            </div>

            {/* Spotify Embed iframe */}
            <iframe
              key={album.spotifyId}
              src={`https://open.spotify.com/embed/album/${album.spotifyId}?utm_source=generator&theme=0`}
              width="100%"
              height={isMobile ? 380 : 420}
              style={{
                border: "none",
                borderRadius: 12,
                display: "block",
              }}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={`${album.title} on Spotify`}
            />

            <div
              style={{
                marginTop: 14,
                fontFamily: "'Nunito', sans-serif",
                fontSize: 11,
                color: "rgba(255,255,255,0.5)",
                textAlign: "center",
                letterSpacing: 1,
              }}
            >
              Powered by Spotify
            </div>
          </div>
        </div>
      )}
    </section>
  );
}