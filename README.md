# Wheeled Vehicle Motor Picker

A web-based calculator for selecting the right motor for wheeled vehicles (robots, go-karts, electric vehicles, etc.). Enter your desired speed, force requirements, and wheel diameter, and the tool will calculate the necessary motor RPM and torque, then suggest compatible Pololu micro gearmotors from their catalog.

**Live Site**: https://sdfgeoff.github.io/mini-gearmotor-sizing-website/

## Features

- **Motor Requirements Calculator**: Calculates required motor RPM and torque based on vehicle parameters
- **Unit Flexibility**: Supports multiple units for speed (km/h, m/s) and force (kgf, N)
- **Motor Recommendations**: Suggests suitable Pololu micro gearmotors that meet your requirements
- **Voltage Filtering**: Optional system voltage filter to narrow down motor suggestions
- **Interactive UI**: Real-time calculations as you adjust parameters
- **Comprehensive Motor Database**: Includes various Pololu gearmotor series (micro metal, 20D, 25D, 37D)

## How It Works

The calculator uses the following formulas:

- **RPM** = (Speed / (π × Diameter)) × 60
- **Torque** = Force × (Diameter / 2)

Based on these requirements, it searches through a database of Pololu gearmotors and recommends motors that can deliver the necessary performance, showing you the load percentage for each suggested motor.

## Tech Stack

Built with React + TypeScript + Vite for a fast, type-safe development experience.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
