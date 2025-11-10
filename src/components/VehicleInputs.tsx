export type SpeedUnit = "m/s" | "kph";
export type ForceUnit = "N" | "kgf";

interface VehicleInputsProps {
  speedValue: string;
  setSpeedValue: (value: string) => void;
  speedUnit: SpeedUnit;
  setSpeedUnit: (unit: SpeedUnit) => void;
  forceValue: string;
  setForceValue: (value: string) => void;
  forceUnit: ForceUnit;
  setForceUnit: (unit: ForceUnit) => void;
  wheelDiameter: string;
  setWheelDiameter: (value: string) => void;
  systemVoltage: string;
  setSystemVoltage: (value: string) => void;
}

export function VehicleInputs({
  speedValue,
  setSpeedValue,
  speedUnit,
  setSpeedUnit,
  forceValue,
  setForceValue,
  forceUnit,
  setForceUnit,
  wheelDiameter,
  setWheelDiameter,
  systemVoltage,
  setSystemVoltage,
}: VehicleInputsProps) {
  return (
    <div className="calculator-card">
      <h2>Vehicle Specifications</h2>

      <div className="input-group">
        <label htmlFor="speed">Target Speed</label>
        <div className="input-with-unit">
          <input
            id="speed"
            type="number"
            value={speedValue}
            onChange={(e) => setSpeedValue(e.target.value)}
            min="0"
            step="0.1"
            placeholder="10"
          />
          <select
            value={speedUnit}
            onChange={(e) => setSpeedUnit(e.target.value as SpeedUnit)}
            className="unit-selector"
          >
            <option value="kph">kph</option>
            <option value="m/s">m/s</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="force">Target Linear Force</label>
        <div className="input-with-unit">
          <input
            id="force"
            type="number"
            value={forceValue}
            onChange={(e) => setForceValue(e.target.value)}
            min="0"
            step="0.1"
            placeholder="50"
          />
          <select
            value={forceUnit}
            onChange={(e) => setForceUnit(e.target.value as ForceUnit)}
            className="unit-selector"
          >
            <option value="N">N</option>
            <option value="kgf">kgf</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="diameter">Wheel Diameter</label>
        <div className="input-with-unit">
          <input
            id="diameter"
            type="number"
            value={wheelDiameter}
            onChange={(e) => setWheelDiameter(e.target.value)}
            min="0"
            step="0.1"
            placeholder="30"
          />
          <span className="unit-label">cm</span>
        </div>
      </div>

      <h2>Electrical Specifications</h2>

      <div className="input-group">
        <label htmlFor="voltage">System Voltage (optional)</label>
        <div className="input-with-unit">
          <input
            id="voltage"
            type="number"
            value={systemVoltage}
            onChange={(e) => setSystemVoltage(e.target.value)}
            min="0"
            step="1"
            placeholder="All voltages"
          />
          <span className="unit-label">V</span>
        </div>
      </div>
    </div>
  );
}
