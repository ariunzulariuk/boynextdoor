"use client";

const items = [
  "BOYNEXTDOOR",
  "★",
  "WHO'S THERE?",
  "★",
  "LEEHAN",
  "★",
  "SANG",
  "★",
  "RIWOO",
  "★",
  "JAEHYUN",
  "★",
  "TAESAN",
  "★",
  "MYUNGJAE",
  "★",
  "KOZ ENTERTAINMENT",
  "★",
  "2023 DEBUT",
  "★",
];

export default function InfoBand() {
  return (
    <div
      style={{
        background: "#00AEEF",
        padding: "14px 0",
        overflow: "hidden",
        position: "relative",
        borderTop: "2px solid rgba(255,255,255,0.2)",
        borderBottom: "2px solid rgba(255,255,255,0.2)",
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marquee 25s linear infinite",
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "16px",
              letterSpacing: "3px",
              color: "#fff",
              padding: "0 20px",
              opacity: item === "★" ? 0.6 : 1,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}