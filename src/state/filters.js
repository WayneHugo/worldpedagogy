import { useMemo } from "react";
import { create } from "zustand";

// Defines all the filters the app can have and the functions to change them.
const useFilterStore = create((set) => ({
  regions: new Set(),
  families: new Set(),
  types: new Set(),
  streams: new Set(),
  search: "",
  time: { start_ce: -4000, end_ce: 2100 },

  // Actions to update the state
  setRegions: (fn) => set((state) => ({ regions: fn(state.regions) })),
  setFamilies: (fn) => set((state) => ({ families: fn(state.families) })),
  setTypes: (fn) => set((state) => ({ types: fn(state.types) })),
  setStreams: (fn) => set((state) => ({ streams: fn(state.streams) })),
  setSearch: (search) => set({ search }),
  setTime: (time) => set({ time }),
}));

// This is the hook that our components use to access the filter state and functions.
export function useFilters() {
  const store = useFilterStore();

  const api = useMemo(
    () => ({
      toggle(setter, value) {
        setter((prev) => {
          const next = new Set(prev);
          next.has(value) ? next.delete(value) : next.add(value);
          return next;
        });
      },
    }),
    []
  );

  return { ...store, api };
}
