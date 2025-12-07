import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Camper } from "@/types/camper";

interface FavoritesState {
  favorites: Camper[];
  toggleFavorite: (camper: Camper) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (camper) => {
        set((state) => {
          const exists = state.favorites.some((c) => c.id === camper.id);

          if (exists) {
            return {
              favorites: state.favorites.filter((c) => c.id !== camper.id),
            };
          }

          return {
            favorites: [...state.favorites, camper],
          };
        });
      },

      isFavorite: (id) => get().favorites.some((c) => c.id === id),
    }),
    {
      name: "favorites-store",
    }
  )
);
