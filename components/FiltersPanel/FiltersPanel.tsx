"use client";

import { useFiltersStore } from "@/lib/store/filters";

export default function FiltersPanel() {
  const { filters, setFilter, resetFilters } = useFiltersStore();

  return (
    <aside>
      <div>
        <label>Location</label>
        <input
          type="text"
          placeholder="City"
          value={filters.location || ""}
          onChange={(e) => setFilter("location", e.target.value)}
        />
      </div>

      <div>
        <p>Vehicle type</p>
        <div>
          {["panelTruck", "integrated", "alcove"].map((form) => (
            <button
              key={form}
              type="button"
              onClick={() =>
                setFilter("form", filters.form === form ? "" : form)
              }
              className={`${
                filters.form === form ? "bg-black text-white" : "bg-white"
              }`}
            >
              {form}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p>Amenities</p>
        <div>
          <label>
            <input
              type="checkbox"
              checked={!!filters.AC}
              onChange={(e) => setFilter("AC", e.target.checked)}
            />
            AC
          </label>
          <label>
            <input
              type="checkbox"
              checked={!!filters.bathroom}
              onChange={(e) => setFilter("bathroom", e.target.checked)}
            />
            Bathroom
          </label>
          <label>
            <input
              type="checkbox"
              checked={!!filters.kitchen}
              onChange={(e) => setFilter("kitchen", e.target.checked)}
            />
            Kitchen
          </label>
        </div>
      </div>

      <button type="button" onClick={resetFilters}>
        Reset filters
      </button>
    </aside>
  );
}
