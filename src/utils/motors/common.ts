/**
 * Common types and utilities for Pololu motors
 */

export interface PololuMotor {
  id: string;
  series: "Micro Metal" | "20D" | "25D" | "37D";
  voltage: number; // Nominal voltage in V
  motorType: string; // e.g., "HP 6V", "HPCB 12V", "MP 12V"
  gearRatio: string; // e.g., "100:1"
  rpmNoLoad: number; // RPM at no load
  torqueRatedNm: number; // Rated torque in N·m
  stallCurrentA: number; // Stall current in A
  freeRunCurrentA: number; // Free run current in A
  outputShaftDiameter: number; // in mm
  supplier: string;
  url: string; // Product URL
}

// Helper function to convert kgf·cm to N·m
export const kgfcmToNm = (kgfcm: number) => kgfcm * 0.0980665;
export const nmToKgfcm = (nm: number) => nm / 0.0980665;

export const ozInTokgfcm = (ozin: number) => ozin * 0.070307;

export interface MotorMatch {
  motor: PololuMotor;
  rpmMatch: number; // 0-100% how well RPM matches
  torqueMatch: number; // 0-100% how well torque matches
  overallScore: number; // Combined score
  rpmUtilization: number; // % of motor's max RPM being used
  torqueUtilization: number; // % of motor's max torque being used
}
