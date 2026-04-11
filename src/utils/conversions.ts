export type Category =
  | "length"
  | "weight"
  | "temperature"
  | "volume"
  | "speed"
  | "area";

export interface UnitCategory {
  label: string;
  emoji: string;
  units: string[];
  unitLabels?: Record<string, string>;
  toBase?: Record<string, number>; // multiply to get base unit
  quickRefs: { val: string; label: string }[];
}

export const CATEGORIES: Record<Category, UnitCategory> = {
  length: {
    label: "Length",
    emoji: "📏",
    units: ["m", "km", "cm", "mm", "mi", "ft", "in", "yd", "nm"],
    unitLabels: {
      m: "Metre",
      km: "Kilometre",
      cm: "Centimetre",
      mm: "Millimetre",
      mi: "Mile",
      ft: "Foot",
      in: "Inch",
      yd: "Yard",
      nm: "Nanometre",
    },
    toBase: {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      mi: 1609.344,
      ft: 0.3048,
      in: 0.0254,
      yd: 0.9144,
      nm: 1e-9,
    },
    quickRefs: [
      { val: "1 ft = 0.305 m", label: "Feet → Metres" },
      { val: "1 mi = 1.609 km", label: "Miles → Kilometres" },
      { val: "1 in = 2.54 cm", label: "Inches → Centimetres" },
      { val: "1 yd = 0.914 m", label: "Yards → Metres" },
    ],
  },
  weight: {
    label: "Weight",
    emoji: "⚖️",
    units: ["kg", "g", "lb", "oz", "mg", "t", "st"],
    unitLabels: {
      kg: "Kilogram",
      g: "Gram",
      lb: "Pound",
      oz: "Ounce",
      mg: "Milligram",
      t: "Tonne",
      st: "Stone",
    },
    toBase: {
      kg: 1,
      g: 0.001,
      lb: 0.453592,
      oz: 0.028349,
      mg: 1e-6,
      t: 1000,
      st: 6.35029,
    },
    quickRefs: [
      { val: "1 lb = 0.454 kg", label: "Pounds → Kilograms" },
      { val: "1 oz = 28.35 g", label: "Ounces → Grams" },
      { val: "1 st = 6.35 kg", label: "Stone → Kilograms" },
      { val: "1 t = 1000 kg", label: "Tonnes → Kilograms" },
    ],
  },
  temperature: {
    label: "Temp",
    emoji: "🌡",
    units: ["°C", "°F", "K"],
    unitLabels: {
      "°C": "Celsius",
      "°F": "Fahrenheit",
      K: "Kelvin",
    },
    quickRefs: [
      { val: "0°C = 32°F", label: "Freezing point" },
      { val: "100°C = 212°F", label: "Boiling point" },
      { val: "37°C = 98.6°F", label: "Body temperature" },
      { val: "20°C = 68°F", label: "Room temperature" },
    ],
  },
  volume: {
    label: "Volume",
    emoji: "🧪",
    units: ["L", "mL", "gal", "pt", "qt", "fl oz", "m³", "cm³"],
    unitLabels: {
      L: "Litre",
      mL: "Millilitre",
      gal: "Gallon",
      pt: "Pint",
      qt: "Quart",
      "fl oz": "Fluid Ounce",
      "m³": "Cubic Metre",
      "cm³": "Cubic Centimetre",
    },
    toBase: {
      L: 1,
      mL: 0.001,
      gal: 3.78541,
      pt: 0.473176,
      qt: 0.946353,
      "fl oz": 0.029574,
      "m³": 1000,
      "cm³": 0.001,
    },
    quickRefs: [
      { val: "1 gal = 3.785 L", label: "Gallons → Litres" },
      { val: "1 pt = 473 mL", label: "Pints → Millilitres" },
      { val: "1 fl oz = 29.6 mL", label: "Fluid oz → mL" },
      { val: "1 m³ = 1000 L", label: "Cubic metres → L" },
    ],
  },
  speed: {
    label: "Speed",
    emoji: "💨",
    units: ["m/s", "km/h", "mph", "knot", "ft/s"],
    unitLabels: {
      "m/s": "Metres per second",
      "km/h": "Kilometres per hour",
      mph: "Miles per hour",
      knot: "Knot",
      "ft/s": "Feet per second",
    },
    toBase: {
      "m/s": 1,
      "km/h": 0.27778,
      mph: 0.44704,
      knot: 0.51444,
      "ft/s": 0.3048,
    },
    quickRefs: [
      { val: "1 mph = 1.609 km/h", label: "Miles per hour" },
      { val: "1 knot = 1.852 km/h", label: "Nautical speed" },
      { val: "100 km/h = 62 mph", label: "Highway speed" },
      { val: "1 m/s = 3.6 km/h", label: "SI → km/h" },
    ],
  },
  area: {
    label: "Area",
    emoji: "▦",
    units: ["m²", "km²", "cm²", "mm²", "ha", "acre", "ft²", "in²"],
    unitLabels: {
      "m²": "Square metre",
      "km²": "Square kilometre",
      "cm²": "Square centimetre",
      "mm²": "Square millimetre",
      ha: "Hectare",
      acre: "Acre",
      "ft²": "Square foot",
      "in²": "Square inch",
    },
    toBase: {
      "m²": 1,
      "km²": 1e6,
      "cm²": 1e-4,
      "mm²": 1e-6,
      ha: 1e4,
      acre: 4046.86,
      "ft²": 0.092903,
      "in²": 0.000645,
    },
    quickRefs: [
      { val: "1 ha = 10,000 m²", label: "Hectares → sq metres" },
      { val: "1 acre = 4,047 m²", label: "Acres → sq metres" },
      { val: "1 km² = 100 ha", label: "Sq km → hectares" },
      { val: "1 ft² = 929 cm²", label: "Sq feet → sq cm" },
    ],
  },
};

/**
 * Core conversion engine.
 * Returns null if conversion is not possible (e.g. same unit, invalid input).
 */
export function convert(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: Category,
): number | null {
  if (fromUnit === toUnit) return value;
  if (isNaN(value)) return null;

  if (category === "temperature") {
    return convertTemperature(value, fromUnit, toUnit);
  }

  const cat = CATEGORIES[category];
  if (!cat.toBase) return null;

  const baseValue = value * cat.toBase[fromUnit];
  const result = baseValue / cat.toBase[toUnit];
  return result;
}

function convertTemperature(
  value: number,
  from: string,
  to: string,
): number | null {
  if (from === "°C" && to === "°F") return (value * 9) / 5 + 32;
  if (from === "°F" && to === "°C") return ((value - 32) * 5) / 9;
  if (from === "°C" && to === "K") return value + 273.15;
  if (from === "K" && to === "°C") return value - 273.15;
  if (from === "°F" && to === "K") return ((value - 32) * 5) / 9 + 273.15;
  if (from === "K" && to === "°F") return ((value - 273.15) * 9) / 5 + 32;
  return null;
}

/**
 * Format a result number cleanly for display.
 */
export function formatResult(value: number): string {
  if (Math.abs(value) < 0.000001 && value !== 0) {
    return value.toExponential(4);
  }
  // Remove trailing zeros up to 8 decimal places
  return parseFloat(value.toFixed(8)).toString();
}
