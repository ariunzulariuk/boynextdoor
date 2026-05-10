"use client";
import { useEffect, useRef, useState } from "react";

const members = [
  { name: "SUNGHO",  nameMn: "Sungho",  dob: "2003.09.04", img: "/images/sungho.png" },
  { name: "RIWOO",   nameMn: "Riwoo",   dob: "2003.10.20", img: "/images/riwoo.png" },
  { name: "JAEHYUN", nameMn: "Jaehyun", dob: "2003.12.04", img: "/images/jaehyun.png" },
  { name: "TAESAN",  nameMn: "Taesan",  dob: "2004.08.10", img: "/images/taesan.png" },
  { name: "LEEHAN",  nameMn: "Leehan",  dob: "2004.10.22", img: "/images/leehan.png" },
  { name: "WOONHAK", nameMn: "Woonhak", dob: "2006.11.29", img: "/images/woonhak.png" },
];

export default function MemberLineup() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dragStartX = useRef<number | null>(null);
  const dragDelta = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll<HTMLElement>(".m-fade").forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, i * 100);
          });
        }
      }),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % members.length);
    }, 3500);
    return () => clearInterval(id);
  }, [paused]);

  const onDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    dragDelta.current = 0;
    setIsDragging(true);
    setPaused(true);
  };

  const onDragMove = (clientX: number) => {
    if (dragStartX.current === null) return;
    dragDelta.current = clientX - dragStartX.current;
    const clamped = Math.max(-200, Math.min(200, dragDelta.current));
    setDragOffset(clamped);
  };

  const onDragEnd = () => {
    if (dragStartX.current === null) return;
    const threshold = 60;
    if (dragDelta.current > threshold) {
      setActive((a) => (a - 1 + members.length) % members.length);
    } else if (dragDelta.current < -threshold) {
      setActive((a) => (a + 1) % members.length);
    }
    dragStartX.current = null;
    dragDelta.current = 0;
    setIsDragging(false);
    setDragOffset(0);
  };

  const imgHeight = isMobile ? 320 : 480;
  const carouselHeight = isMobile ? 380 : 540;
  const offsetStep = isMobile ? 130 : 220;

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: isMobile ? "20px 20px 60px" : "20px 48px 60px",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        if (isDragging) onDragEnd();
      }}
    >
      <Star style={{ top: 60, left: "6%", size: isMobile ? 40 : 70, opacity: 0.4 }} />
      <Star style={{ bottom: 60, right: "8%", size: isMobile ? 30 : 50, opacity: 0.35 }} />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          className="m-fade"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            transition: "all 0.6s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 0,
          }}
        >
          <span style={{ fontSize: 20, color: "#00AEEF" }}>★</span>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: isMobile ? 28 : 34,
              color: "#00AEEF",
              letterSpacing: 6,
            }}
          >
            MEMBERS
          </span>
          <span style={{ fontSize: 20, color: "#00AEEF" }}>★</span>
        </div>

        <div
          className="m-fade"
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseMove={(e) => {
            if (isDragging) onDragMove(e.clientX);
          }}
          onMouseUp={onDragEnd}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
          onTouchEnd={onDragEnd}
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            transition: "all 0.6s ease",
            position: "relative",
            height: carouselHeight,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
            touchAction: "pan-y",
          }}
        >
          {members.map((m, i) => {
            let diff = i - active;
            if (diff > members.length / 2) diff -= members.length;
            if (diff < -members.length / 2) diff += members.length;

            const isActive = diff === 0;
            const abs = Math.abs(diff);
            const visible = abs <= 2;

            const scale = isActive ? 1 : abs === 1 ? 0.65 : 0.45;
            const offset = diff * offsetStep + dragOffset;
            const opacity = !visible ? 0 : isActive ? 1 : abs === 1 ? 0.7 : 0.35;
            const blur = isActive ? 0 : abs === 1 ? 1 : 2;
            const z = 10 - abs;

            return (
              <div
                key={i}
                onClick={() => {
                  if (Math.abs(dragDelta.current) < 5) setActive(i);
                }}
                style={{
                  position: "absolute",
                  bottom: 60,
                  left: "50%",
                  transform: `translateX(calc(-50% + ${offset}px)) scale(${scale})`,
                  transformOrigin: "bottom center",
                  transition: isDragging
                    ? "none"
                    : "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                  opacity,
                  zIndex: z,
                  cursor: "pointer",
                  filter: `blur(${blur}px)`,
                  pointerEvents: visible ? "auto" : "none",
                }}
              >
                <img
                  src={m.img}
                  alt={m.name}
                  draggable={false}
                  style={{
                    height: imgHeight,
                    width: "auto",
                    objectFit: "contain",
                    objectPosition: "bottom",
                    display: "block",
                    pointerEvents: "none",
                    filter: isActive
                      ? "drop-shadow(0 24px 30px rgba(0,100,180,0.22))"
                      : "drop-shadow(0 8px 14px rgba(0,0,0,0.08))",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://via.placeholder.com/300x480/d8eaf5/00AEEF?text=${m.name}`;
                  }}
                />
              </div>
            );
          })}

          <div
            key={active}
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              animation: "info-fade 0.5s ease",
              zIndex: 20,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                fontFamily: "'Arimo', sans-serif",
                fontSize: isMobile ? 18 : 22,
                fontWeight: 800,
                color: "#0a0a0a",
                letterSpacing: 1,
              }}
            >
              {members[active].nameMn}
            </div>
            <div
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 12,
                color: "#888",
                marginTop: 4,
                letterSpacing: 2,
                fontWeight: 600,
              }}
            >
              {members[active].dob}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes info-fade {
          from { opacity: 0; transform: translate(-50%, 8px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </section>
  );
}

function Star({
  style,
}: {
  style: { size: number } & React.CSSProperties;
}) {
  const { size, ...rest } = style;
  return (
    <svg
      viewBox="0 0 24 24"
      style={{
        position: "absolute",
        width: size,
        height: size,
        fill: "#7CC8E8",
        ...rest,
      }}
    >
      <path d="M12 .587l3.668 7.568L24 9.75l-6 5.847L19.336 24 12 20.187 4.664 24 6 15.597 0 9.75l8.332-1.595z" />
    </svg>
  );
}