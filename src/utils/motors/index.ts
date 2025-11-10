/**
 * Pololu motor database - centralized exports
 */

export type { PololuMotor, MotorMatch } from "./common";
export { kgfcmToNm, ozInTokgfcm } from "./common";

// Micro Metal motors
export { hpcb12vMotors } from "./micro-metal/hpcb-12v";
export { hpcb6vMotors } from "./micro-metal/hpcb-6v";
export { hp6vMotors as microMetalHp6vMotors } from "./micro-metal/hp-6v";
export { mp6vMotors } from "./micro-metal/mp-6v";
export { lp6vMotors } from "./micro-metal/lp-6v";

// 20D motors
export { cb12vMotors } from "./20d/cb-12v";
export { cb6vMotors } from "./20d/cb-6v";

// 25D motors
export { hp12vMotors } from "./25d/hp-12v";
export { mp12vMotors } from "./25d/mp-12v";
export { hp6vMotors as motor25dHp6vMotors } from "./25d/hp-6v";

// 37D motors
export { motor12vMotors } from "./37d/12v";
export { motor24vMotors } from "./37d/24v";

// Import all motors to create the combined array
import { hpcb12vMotors } from "./micro-metal/hpcb-12v";
import { hpcb6vMotors } from "./micro-metal/hpcb-6v";
import { hp6vMotors as microMetalHp6v } from "./micro-metal/hp-6v";
import { mp6vMotors } from "./micro-metal/mp-6v";
import { lp6vMotors } from "./micro-metal/lp-6v";
import { cb12vMotors } from "./20d/cb-12v";
import { cb6vMotors } from "./20d/cb-6v";
import { hp12vMotors } from "./25d/hp-12v";
import { mp12vMotors } from "./25d/mp-12v";
import { hp6vMotors as motor25dHp6v } from "./25d/hp-6v";
import { motor12vMotors } from "./37d/12v";
import { motor24vMotors } from "./37d/24v";

import type { PololuMotor, MotorMatch } from "./common";

/**
 * All Pololu motors in a single array
 */
export const pololuMotors: PololuMotor[] = [
  ...hpcb12vMotors,
  ...hpcb6vMotors,
  ...microMetalHp6v,
  ...mp6vMotors,
  ...lp6vMotors,
  ...cb12vMotors,
  ...cb6vMotors,
  ...hp12vMotors,
  ...mp12vMotors,
  ...motor25dHp6v,
  ...motor12vMotors,
  ...motor24vMotors,
];

/**
 * Find suitable motors from the Pololu catalog
 */
export function findSuitableMotors(
  requiredRpm: number,
  requiredTorqueNm: number,
  maxResults: number = 5,
  filterVoltage?: number
): MotorMatch[] {
  const matches: MotorMatch[] = [];

  for (const motor of pololuMotors) {
    // Filter by voltage if specified
    if (filterVoltage !== undefined && motor.voltage !== filterVoltage) {
      continue;
    }

    // Motor should provide at least the required specs
    // RPM match: motor should have enough speed (allowing some headroom)
    const rpmRatio = motor.rpmNoLoad / requiredRpm;
    const rpmMatch =
      rpmRatio >= 0.8 && rpmRatio <= 2.0
        ? 100 - Math.abs(1 - rpmRatio) * 50
        : 0;

    // Torque match: motor should have enough torque (with safety margin)
    const torqueRatio = motor.torqueRatedNm / requiredTorqueNm;
    const torqueMatch =
      torqueRatio >= 1.0 && torqueRatio <= 3.0
        ? 100 - Math.abs(1.5 - torqueRatio) * 30
        : 0;

    // Skip motors that don't meet basic requirements
    if (rpmMatch === 0 || torqueMatch === 0) {
      continue;
    }

    // Calculate utilization (how close to motor limits)
    const rpmUtilization = (requiredRpm / motor.rpmNoLoad) * 100;
    const torqueUtilization = (requiredTorqueNm / motor.torqueRatedNm) * 100;

    // Overall score favors motors that match well without being oversized
    const overallScore = (rpmMatch + torqueMatch) / 2;

    matches.push({
      motor,
      rpmMatch,
      torqueMatch,
      overallScore,
      rpmUtilization,
      torqueUtilization,
    });
  }

  // Sort by overall score (best matches first)
  matches.sort((a, b) => b.overallScore - a.overallScore);

  return matches.slice(0, maxResults);
}
