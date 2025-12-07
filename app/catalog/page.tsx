"use client";

import { useEffect } from "react";
import { useCampersStore } from "@/lib/store/campers";
import { useFiltersStore } from "@/lib/store/filters";
import CamperCard from "@/components/CamperCard/CamperCard";
import FiltersPanel from "@/components/FiltersPanel/FiltersPanel";

export default function CatalogPage() {
  const { campers, fetchCampers, loadMore, isLoading, error, hasMore } =
    useCampersStore();
  const filters = useFiltersStore((state) => state.filters);

  useEffect(() => {
    fetchCampers(filters);
  }, [filters, fetchCampers]);

  return (
    <main>
      <h1>Campers catalog</h1>

      <FiltersPanel />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isLoading && campers.length === 0 && <p>Loading campers...</p>}

      {campers.length === 0 && !isLoading ? (
        <p>No campers found.</p>
      ) : (
        <>
          <div>
            {campers.map((camper) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
          </div>

          {hasMore && (
            <button
              type="button"
              onClick={() => loadMore(filters)}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load more"}
            </button>
          )}
        </>
      )}
    </main>
  );
}
