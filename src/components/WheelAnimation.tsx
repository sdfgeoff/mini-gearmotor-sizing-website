interface WheelAnimationProps {
  rpm: number;
  size?: number;
}

export function WheelAnimation({ rpm, size = 60 }: WheelAnimationProps) {
  // Calculate rotation duration from RPM
  // Duration in seconds = 60 / RPM
  const duration = rpm > 0 ? 60 / rpm : 0;

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: "relative",
        display: "inline-block",
        marginLeft: "12px",
        verticalAlign: "middle",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{
          animation:
            duration > 0 ? `spin ${duration}s linear infinite` : "none",
        }}
      >
        {/* Outer tire */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#1e293b"
          strokeWidth="8"
        />

        {/* Wheel rim */}
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="#64748b"
          strokeWidth="4"
        />

        {/* Center hub */}
        <circle cx="50" cy="50" r="8" fill="#1e293b" />

        {/* Spokes */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke="#64748b"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="50"
          x2="75"
          y2="35"
          stroke="#64748b"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="50"
          x2="75"
          y2="65"
          stroke="#64748b"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="80"
          stroke="#64748b"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="50"
          x2="25"
          y2="65"
          stroke="#64748b"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="50"
          x2="25"
          y2="35"
          stroke="#64748b"
          strokeWidth="2"
        />

        {/* Tread marks on tire */}
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={angle}
            x1={50 + 40 * Math.cos((angle * Math.PI) / 180)}
            y1={50 + 40 * Math.sin((angle * Math.PI) / 180)}
            x2={50 + 48 * Math.cos((angle * Math.PI) / 180)}
            y2={50 + 48 * Math.sin((angle * Math.PI) / 180)}
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </svg>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
