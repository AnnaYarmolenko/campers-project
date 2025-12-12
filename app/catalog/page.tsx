"use client";

import { useEffect } from "react";
import { useCampersStore } from "@/lib/store/campers";
import { useFiltersStore } from "@/lib/store/filters";
import CamperCard from "@/components/CamperCard/CamperCard";
import FiltersPanel from "@/components/FiltersPanel/FiltersPanel";
import Loader from "@/components/Loader/Loader";
import css from "./CatalogPage.module.css";

export default function CatalogPage() {
  const { campers, fetchCampers, loadMore, isLoading, hasMore } =
    useCampersStore();
  const filters = useFiltersStore((state) => state.filters);

  useEffect(() => {
    fetchCampers(filters);
  }, [filters, fetchCampers]);

  return (
    <main className={`container ${css.catalogPage}`}>
      <div>
        <FiltersPanel />
      </div>
      <div className={css.catalogSection}>
        {/* 1) Перше завантаження - лише спінер */}
        {isLoading && campers.length === 0 && <Loader />}

        {/* 2) Якщо нічого не знайдено */}
        {campers.length === 0 && !isLoading ? (
          <p>No campers found.</p>
        ) : (
          <div className={css.catalogContent}>
            <div className={css.camperList}>
              {campers.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
            </div>

            {/* 3) Пагінація */}
            {hasMore && (
              <>
                {!isLoading && (
                  <button
                    type="button"
                    onClick={() => loadMore(filters)}
                    className={`btnShow ${css.loadMore}`}
                  >
                    Load more
                  </button>
                )}

                {/*  Loader замість кнопки */}
                {isLoading && campers.length > 0 && <Loader />}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
