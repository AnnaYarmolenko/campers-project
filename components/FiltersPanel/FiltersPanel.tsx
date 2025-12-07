"use client";

import { EQUIPMENT_FILTERS } from "@/lib/constants/equipment";
import { useFiltersStore } from "@/lib/store/filters";
import css from "./FiltersPanel.module.css";
import "../../app/globals.css";

export default function FiltersPanel() {
  const { draftFilters, setDraftFilter, applyFilters } = useFiltersStore();

  const vehicleTypes = [
    { value: "panelTruck", label: "Van", icon: "icon-van" },
    { value: "integrated", label: "Fully Integrated", icon: "icon-fully" },
    { value: "alcove", label: "Alcove", icon: "icon-alcove" },
  ];

  return (
    <aside className={css.wrapper}>
      {/* Location */}
      <div className={css.field}>
        <label className={css.label}>Location</label>
        <div className={css.inputWrapper}>
          <svg width="20" height="20" className={css.locationIcon}>
            <use href="/sprite.svg#icon-map" />
          </svg>
          <input
            type="text"
            placeholder="City"
            value={draftFilters.location || ""}
            onChange={(e) => setDraftFilter("location", e.target.value)}
            className={css.input}
          />
        </div>
      </div>

      <p className={`${css.label} ${css.labelFilters}`}>Filters</p>

      {/* Vehicle equipment */}
      <div className={css.field}>
        <p className={css.filterText}>Vehicle equipment</p>

        <svg width="360" height="1" className={css.divider}>
          <use href="/sprite.svg#icon-divider" />
        </svg>

        <div className={css.typeGrid}>
          {EQUIPMENT_FILTERS.map((item) => {
            const active =
              item.type === "string"
                ? draftFilters[item.key] === item.value
                : Boolean(draftFilters[item.key]);

            return (
              <button
                key={`${item.key}-${item.value ?? "bool"}`}
                type="button"
                onClick={() => {
                  if (item.type === "string") {
                    setDraftFilter(item.key, active ? "" : item.value || "");
                  } else {
                    setDraftFilter(item.key, !active);
                  }
                }}
                className={active ? css.typeButtonActive : css.typeButton}
              >
                <svg width="32" height="32" className={css.equipmentIcon}>
                  <use href={`/sprite.svg#${item.icon}`} />
                </svg>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vehicle type */}
      <div className={css.field}>
        <p className={css.filterText}>Vehicle type</p>

        <svg width="360" height="1" className={css.divider}>
          <use href="/sprite.svg#icon-divider" />
        </svg>

        <div className={css.typeGrid}>
          {vehicleTypes.map((type) => {
            const active = draftFilters.form === type.value;

            return (
              <div key={type.value} className={css.typeCard}>
                <button
                  type="button"
                  onClick={() =>
                    setDraftFilter("form", active ? "" : type.value)
                  }
                  className={active ? css.typeButtonActive : css.typeButton}
                >
                  <svg width="40" height="28" className={css.typeIcon}>
                    <use href={`/sprite.svg#${type.icon}`} />
                  </svg>
                  <span>{type.label}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={applyFilters}
          className={`btnShow ${css.searchButton}`}
        >
          Search
        </button>
      </div>
    </aside>
  );
}
