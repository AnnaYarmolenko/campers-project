import type { Filters } from "@/lib/store/filters";

export type EquipmentKey = keyof Filters;

export type EquipmentConfig = {
  key: EquipmentKey;
  label: string;
  icon: string;
  type?: "string";
  value?: string;
};

export const EQUIPMENT_FILTERS: EquipmentConfig[] = [
  { key: "AC", label: "AC", icon: "icon-ac" },
  {
    key: "transmission",
    value: "automatic",
    label: "Automatic",
    icon: "icon-automatic",
    type: "string",
  },
  { key: "kitchen", label: "Kitchen", icon: "icon-kitchen" },
  { key: "TV", label: "TV", icon: "icon-tv" },
  { key: "bathroom", label: "Bathroom", icon: "icon-bathroom" },
  { key: "radio", label: "Radio", icon: "icon-radio" },
  { key: "microwave", label: "Microwave", icon: "icon-microwave" },
  { key: "refrigerator", label: "Refrigerator", icon: "icon-refrigerator" },
  { key: "water", label: "Water", icon: "icon-water" },
  {
    key: "engine",
    value: "diesel",
    label: "Diesel",
    icon: "icon-patrol",
    type: "string",
  },
  {
    key: "engine",
    value: "petrol",
    label: "Petrol",
    icon: "icon-patrol",
    type: "string",
  },
  { key: "gas", label: "Gas", icon: "icon-gas" },
];

export const EQUIPMENT_FEATURES: EquipmentConfig[] = [
  { key: "AC", label: "AC", icon: "icon-ac" },
  { key: "kitchen", label: "Kitchen", icon: "icon-kitchen" },
  { key: "bathroom", label: "Bathroom", icon: "icon-bathroom" },
  { key: "TV", label: "TV", icon: "icon-tv" },
  { key: "radio", label: "Radio", icon: "icon-radio" },
  { key: "refrigerator", label: "Refrigerator", icon: "icon-refrigerator" },
  { key: "microwave", label: "Microwave", icon: "icon-microwave" },
  { key: "gas", label: "Gas", icon: "icon-gas" },
  { key: "water", label: "Water", icon: "icon-water" },
  { key: "transmission", label: "Transmission", icon: "icon-automatic" },
  { key: "engine", label: "Engine", icon: "icon-patrol" },
];
