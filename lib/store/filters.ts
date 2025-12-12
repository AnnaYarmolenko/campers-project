import { create } from "zustand";

export interface Filters {
  location?: string;
  form?: string;

  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;

  transmission?: string;
  engine?: string;
  gas?: boolean;

  TV?: boolean;
  radio?: boolean;
  microwave?: boolean;
  refrigerator?: boolean;
  water?: boolean;
}

const initialFilters: Filters = {
  location: "",
  form: "",
  AC: false,
  bathroom: false,
  kitchen: false,
  transmission: "",
  TV: false,
  radio: false,
  microwave: false,
  refrigerator: false,
  water: false,
  engine: "",
  gas: false,
};

interface FiltersStore {
  filters: Filters;
  draftFilters: Filters;

  setDraftFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;

  applyFilters: () => void;
  resetDraftFilters: () => void;
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  filters: initialFilters,
  draftFilters: initialFilters,

  setDraftFilter: (key, value) =>
    set((state) => ({
      draftFilters: { ...state.draftFilters, [key]: value },
    })),

applyFilters: () =>
  set((state) => {
    const draft = state.draftFilters;

    return {
      filters: {
        ...draft,
        location: draft.location ? draft.location.trim() : "",
      },
    };
  }),

  resetDraftFilters: () =>
    set(() => ({
      draftFilters: initialFilters,
    })),
}));
