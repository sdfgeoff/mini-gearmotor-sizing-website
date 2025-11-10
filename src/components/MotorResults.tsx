import type { MotorRequirements } from "../utils/motorCalculations";
import { nmToKgfcm } from "../utils/motors/common";
import { Tooltip } from "./Tooltip";
import { WheelAnimation } from "./WheelAnimation";

interface MotorResultsProps {
  results: MotorRequirements;
}

export function MotorResults({ results }: MotorResultsProps) {
  return (
    <div className="results-card">
      <h2>Motor Requirements</h2>

      <div className="result-item">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div>
            <Tooltip text="The motor must rotate at this speed to achieve your target velocity with the specified wheel diameter.">
              <div className="result-label">Required RPM</div>
            </Tooltip>
            <div className="result-value">
              {results.rpm.toFixed(2)} <span className="result-unit">RPM</span>
            </div>
            <div className="result-secondary">
              ({((results.rpm * 2 * Math.PI) / 60).toFixed(2)} rad/s)
            </div>
          </div>
          <WheelAnimation rpm={results.rpm} size={50} />
        </div>
      </div>

      <div className="result-item">
        <Tooltip text="The motor must provide this much torque to generate your target linear force at the wheel.">
          <div className="result-label">Required Torque</div>
        </Tooltip>
        <div className="result-value">
          {results.torqueNm.toFixed(4)} <span className="result-unit">N·m</span>
        </div>
        <div className="result-secondary">
          ({nmToKgfcm(results.torqueNm).toFixed(4)} kgf·cm)
        </div>
      </div>

      <div className="result-item">
        <Tooltip text="The minimum mechanical power output required from the motor to achieve both the target speed and force simultaneously.">
          <div className="result-label">Required Motor Power</div>
        </Tooltip>
        <div className="result-value">
          {results.powerW.toFixed(2)} <span className="result-unit">W</span>
        </div>
        <div className="result-secondary">
          ({(results.powerW / 745.7).toFixed(3)} hp)
        </div>
      </div>
    </div>
  );
}
