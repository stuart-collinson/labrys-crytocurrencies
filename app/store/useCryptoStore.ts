import { ICryptocurrency } from "@/interfaces/cryptocurrency";
import { create } from "zustand";

// ------------ Ended up not needing this at all but kept it in rather than deleting it for an example of a second store

interface CryptocurrencyState {
    crytocurrency: ICryptocurrency | null;
    setCryptocurrency: (crytocurrency: ICryptocurrency) => void;
}

export const useCryptocurrencyStore = create<CryptocurrencyState>((set: (arg0: { cryptocurrency: any }) => any) => ({
    crytocurrency: null,
    setCryptocurrency: (cryptocurrency: any) => set({ cryptocurrency }),
}));
