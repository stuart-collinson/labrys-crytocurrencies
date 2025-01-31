import { ICryptocurrency } from "@/interfaces/cryptocurrency";
import { create } from "zustand";

interface CryptocurrencyState {
    crytocurrency: ICryptocurrency | null;
    setCryptocurrency: (crytocurrency: ICryptocurrency) => void;
}

export const useCryptocurrencyStore = create<CryptocurrencyState>((set: (arg0: { cryptocurrency: any; }) => any) => ({
    crytocurrency: null,
    setCryptocurrency: (cryptocurrency: any) => set({ cryptocurrency }),
}));
