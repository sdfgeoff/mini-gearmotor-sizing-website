/**
 * Motor calculation utilities for wheeled vehicle design
 */

export interface MotorRequirements {
  rpm: number;
  torqueNm: number;
  powerW: number; // Power in Watts
}

export interface VehicleSpecs {
  speedMs: number; // Linear speed in m/s
  forceN: number; // Linear force in Newtons
  wheelDiameterM: number; // Wheel diameter in meters
}

/**
 * Convert kph to m/s
 */
export function kphToMs(kph: number): number {
  return kph / 3.6;
}

/**
 * Convert m/s to kph
 */
export function msToKph(ms: number): number {
  return ms * 3.6;
}

/**
 * Calculate motor requirements based on vehicle specifications
 *
 * @param specs - Vehicle specifications
 * @returns Motor RPM and torque requirements
 */
export function calculateMotorRequirements(
  specs: VehicleSpecs
): MotorRequirements {
  const { speedMs, forceN, wheelDiameterM } = specs;

  // Calculate wheel radius in meters
  const wheelRadiusM = wheelDiameterM / 2;

  // Calculate wheel circumference in meters
  const circumferenceM = Math.PI * wheelDiameterM;

  // Calculate wheel rotations per second needed to achieve target speed
  // speed (m/s) = circumference (m) * rotations per second
  const rotationsPerSecond = speedMs / circumferenceM;

  // Convert to RPM (rotations per minute)
  const rpm = rotationsPerSecond * 60;

  // Calculate required torque
  // Force = Torque / radius
  // Therefore: Torque = Force * radius
  const torqueNm = forceN * wheelRadiusM;

  // Calculate required power
  // Power (W) = Torque (N·m) × Angular velocity (rad/s)
  // Angular velocity (rad/s) = RPM × (2π / 60)
  const angularVelocityRadS = (rpm * 2 * Math.PI) / 60;
  const powerW = torqueNm * angularVelocityRadS;

  return {
    rpm,
    torqueNm,
    powerW,
  };
}
