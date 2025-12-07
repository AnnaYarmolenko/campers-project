import { create } from "zustand";

export interface Filters {
  location?: string;
  form?: string;
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
}

interface FiltersStore {
  filters: Filters;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  filters: {
    location: "",
    form: "",
    AC: false,
    bathroom: false,
    kitchen: false,
  },

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  resetFilters: () =>
    set({
      filters: {
        location: "",
        form: "",
        AC: false,
        bathroom: false,
        kitchen: false,
      },
    }),
}));
