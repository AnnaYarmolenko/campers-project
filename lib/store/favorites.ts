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
        const { favorites } = get();
        const exists = favorites.some((c) => c.id === camper.id);

        if (exists) {
          set({
            favorites: favorites.filter((c) => c.id !== camper.id),
          });
        } else {
          set({
            favorites: [...favorites, camper],
          });
        }
      },

      isFavorite: (id) => get().favorites.some((c) => c.id === id),
    }),
    {
      name: "favorites-store",
    }
  )
);
