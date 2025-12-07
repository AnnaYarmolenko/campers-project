import { create } from "zustand";
import { Camper } from "@/types/camper";
import { getCampers, CampersResponse } from "@/lib/api";
import { Filters } from "./filters";

interface CampersState {
  campers: Camper[];
  total: number;
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  fetchCampers: (filters?: Filters) => Promise<void>;
  loadMore: (filters?: Filters) => Promise<void>;
  reset: () => void;
}

const PAGE_LIMIT = 5;
export const useCampersStore = create<CampersState>((set, get) => ({
  campers: [],
  total: 0,
  page: 1,
  hasMore: true,
  isLoading: false,
  error: null,

  fetchCampers: async (filters) => {
    set({
      isLoading: true,
      error: null,
      campers: [],
      total: 0,
      page: 1,
      hasMore: true,
    });

    try {
      const params: Record<string, string | number | boolean> = {
        page: 1,
        limit: PAGE_LIMIT,
      };

      if (filters) {
        if (filters.location) params.location = filters.location;
        if (filters.form) params.form = filters.form;
        if (filters.AC) params.AC = true;
        if (filters.bathroom) params.bathroom = true;
        if (filters.kitchen) params.kitchen = true;
      }

      const data: CampersResponse = await getCampers(params);

      set({
        campers: data.items,
        total: data.total,
        isLoading: false,
        page: 1,
        hasMore: data.items.length < data.total,
      });
    } catch {
      set({ error: "Failed to load campers", isLoading: false });
    }
  },

  loadMore: async (filters) => {
    const { page, campers, total, hasMore } = get();
    if (!hasMore) return;

    const nextPage = page + 1;

    if (campers.length >= total) {
      set({ hasMore: false });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const params: Record<string, string | number | boolean> = {
        page: nextPage,
        limit: PAGE_LIMIT,
      };

      if (filters) {
        if (filters.location) params.location = filters.location;
        if (filters.form) params.form = filters.form;
        if (filters.AC) params.AC = true;
        if (filters.bathroom) params.bathroom = true;
        if (filters.kitchen) params.kitchen = true;
      }

      const data: CampersResponse = await getCampers(params);

      set((state) => {
        const newCampers = [...state.campers, ...data.items];
        return {
          campers: newCampers,
          total: data.total,
          isLoading: false,
          page: nextPage,
          hasMore: newCampers.length < data.total,
        };
      });
    } catch {
      set({ error: "Failed to load campers", isLoading: false });
    }
  },

  reset: () =>
    set({
      campers: [],
      total: 0,
      page: 1,
      hasMore: true,
      isLoading: false,
      error: null,
    }),
}));
