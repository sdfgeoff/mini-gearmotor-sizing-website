import { useState, useEffect } from "react";
import { calculateMotorRequirements, kphToMs } from "./utils/motorCalculations";
import type { MotorRequirements } from "./utils/motorCalculations";
import "./App.css";
import { findSuitableMotors, type MotorMatch } from "./utils/motors";
import {
  VehicleInputs,
  type SpeedUnit,
  type ForceUnit,
} from "./components/VehicleInputs";
import { MotorResults } from "./components/MotorResults";
import { MotorSuggestions } from "./components/MotorSuggestions";

function App() {
  // Input states
  const [speedValue, setSpeedValue] = useState<string>("10");
  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>("kph");
  const [forceValue, setForceValue] = useState<string>("1");
  const [forceUnit, setForceUnit] = useState<ForceUnit>("kgf");
  const [wheelDiameter, setWheelDiameter] = useState<string>("30");
  const [systemVoltage, setSystemVoltage] = useState<string>("");

  // Results state
  const [results, setResults] = useState<MotorRequirements | null>(null);
  const [motorSuggestions, setMotorSuggestions] = useState<MotorMatch[]>([]);

  // Calculate motor requirements whenever inputs change
  useEffect(() => {
    const speed = parseFloat(speedValue);
    const force = parseFloat(forceValue);
    const diameter = parseFloat(wheelDiameter);

    // Validate inputs
    if (
      isNaN(speed) ||
      isNaN(force) ||
      isNaN(diameter) ||
      speed <= 0 ||
      force <= 0 ||
      diameter <= 0
    ) {
      setResults(null);
      return;
    }

    // Convert to standard units (m/s, N, m)
    const speedMs = speedUnit === "kph" ? kphToMs(speed) : speed;
    const forceN = forceUnit === "kgf" ? force * 9.80665 : force; // kgf to N
    const diameterM = diameter / 100; // cm to m

    // Calculate motor requirements
    const motorReqs = calculateMotorRequirements({
      speedMs,
      forceN,
      wheelDiameterM: diameterM,
    });

    setResults(motorReqs);

    // Parse voltage filter (optional)
    const voltage = parseFloat(systemVoltage);
    const voltageFilter = !isNaN(voltage) && voltage > 0 ? voltage : undefined;

    // Find suitable motors from Pololu catalog with optional voltage filter
    const suggestions = findSuitableMotors(
      motorReqs.rpm,
      motorReqs.torqueNm,
      15,
      voltageFilter
    );

    setMotorSuggestions(suggestions);
  }, [
    speedValue,
    speedUnit,
    forceValue,
    forceUnit,
    wheelDiameter,
    systemVoltage,
  ]);

  return (
    <div className="app">
      <header className="header">
        <h1>🚗 Wheeled Vehicle Motor Picker</h1>
        <p className="subtitle">
          Calculate motor RPM and torque requirements for a wheeled vehicle (or
          any other system where the motor is used to move something linearly)
        </p>
      </header>

      <main className="main-content">
        <VehicleInputs
          speedValue={speedValue}
          setSpeedValue={setSpeedValue}
          speedUnit={speedUnit}
          setSpeedUnit={setSpeedUnit}
          forceValue={forceValue}
          setForceValue={setForceValue}
          forceUnit={forceUnit}
          setForceUnit={setForceUnit}
          wheelDiameter={wheelDiameter}
          setWheelDiameter={setWheelDiameter}
          systemVoltage={systemVoltage}
          setSystemVoltage={setSystemVoltage}
        />

        {results && <MotorResults results={results} />}

        <MotorSuggestions motorSuggestions={motorSuggestions} />

        {!results && (
          <div className="results-card placeholder">
            <p>Enter valid positive values to see motor requirements</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>
          <strong>Formula Reference:</strong> RPM = (Speed / (π × Diameter)) ×
          60 | Torque = Force × (Diameter / 2)
        </p>
      </footer>
    </div>
  );
}

export default App;
