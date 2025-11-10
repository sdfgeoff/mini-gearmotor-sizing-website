import type { MotorMatch } from "../utils/motors";
import { nmToKgfcm } from "../utils/motors/common";

interface MotorSuggestionsProps {
  motorSuggestions: MotorMatch[];
}

function UtilizationBadge({ utilization }: { utilization: number }) {
  const getBackgroundColor = (util: number) => {
    if (util <= 100) {
      // Green gradient: lighter green at 0%, darker green at 100%
      const intensity = Math.min(util / 100, 1);
      const lightness = 85 - intensity * 35; // 85% to 50%
      return `hsl(120, 60%, ${lightness + 20}%)`;
    } else {
      // Orange to red gradient: orange at 100%, red at 150%+
      const excess = Math.min((util - 100) / 50, 1); // 0 to 1 over 100-150%
      const hue = 30 - excess * 30; // 30 (orange) to 0 (red)
      return `hsl(${hue}, 85%, 80%)`;
    }
  };

  return (
    <span
      className="spec-utilization"
      style={{
        backgroundColor: getBackgroundColor(utilization),
        padding: "2px 6px",
        borderRadius: "4px",
        fontWeight: "500",
      }}
    >
      ({utilization.toFixed(0)}% utilized)
    </span>
  );
}

export function MotorSuggestions({ motorSuggestions }: MotorSuggestionsProps) {
  if (motorSuggestions.length === 0) {
    return null;
  }

  return (
    <div
      className="results-card"
      style={{
        gridColumn: "span 2",
      }}
    >
      <h2>📦 Motor Suggestions</h2>

      <div className="motor-suggestions">
        {motorSuggestions.map((match) => (
          <div key={match.motor.id} className="motor-card">
            <h3>
              <a
                href={match.motor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="motor-link"
              >
                {match.motor.supplier} {match.motor.series} -{" "}
                {match.motor.gearRatio} {match.motor.motorType}
              </a>
            </h3>
            <div className="motor-details">
              <div className="motor-specs">
                <div className="spec-row">
                  <span className="spec-label">No-Load RPM:</span>
                  <span className="spec-value">
                    {match.motor.rpmNoLoad} RPM
                  </span>
                  <UtilizationBadge utilization={match.rpmUtilization} />
                </div>
                <div className="spec-row">
                  <span className="spec-label">Rated Torque:</span>
                  <span className="spec-value">
                    {match.motor.torqueRatedNm.toFixed(3)} N·m
                    {nmToKgfcm(match.motor.torqueRatedNm).toFixed(1)} kgf·cm
                  </span>
                  <UtilizationBadge utilization={match.torqueUtilization} />
                </div>
                <div className="spec-row">
                  <span className="spec-label">Voltage:</span>
                  <span className="spec-value">{match.motor.voltage}V</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Current:</span>
                  <span className="spec-value">
                    {match.motor.freeRunCurrentA.toFixed(2)}A free-run,{" "}
                    {match.motor.stallCurrentA.toFixed(2)}A stall
                  </span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Shaft Diameter:</span>
                  <span className="spec-value">
                    {match.motor.outputShaftDiameter}mm
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
