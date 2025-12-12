"use client";

import { Camper } from "@/types/camper";
import { EQUIPMENT_FEATURES } from "@/lib/constants/equipment";
import css from "./FeaturesList.module.css";

interface FeaturesListProps {
  camper: Camper;
  className?: string;
}

export default function FeaturesList({ camper, className }: FeaturesListProps) {
  return (
    <ul className={`${css.featuresList} ${className ?? ""}`}>
      {EQUIPMENT_FEATURES.map((item) => {
        const value = camper[item.key as keyof Camper];
        if (!value) return null;

        const content =
          item.key === "engine" || item.key === "transmission"
            ? String(value)
            : item.label;

        return (
          <li
            key={`${item.key}-${content}`}
            className={css.featureItem}
          >
            <svg width="20" height="20">
              <use href={`/sprite.svg#${item.icon}`} />
            </svg>
            <span>{content}</span>
          </li>
        );
      })}
    </ul>
  );
}
