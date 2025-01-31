import { create } from 'zustand';
import axios from 'axios';
import { ICryptocurrency } from '@/interfaces/cryptocurrency';

interface TokenStore {
  tokens: ICryptocurrency[];
  loading: boolean;
  page: number;
  hasMore: boolean;
  fetchTokens: () => Promise<void>;
}

export const useTokenStore = create<TokenStore>((set: any, get: any) => ({
  tokens: [],
  loading: false,
  page: 1,
  hasMore: true,
  fetchTokens: async () => {
    set({ loading: true });

    try {
      // Make the API call to CoinMarketCap
      // Limit of 25 tokens per request
      // Convert price to dollars
      const currentPage = get().page;

      const response = await axios.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', 
        {
          params: {
            start: (currentPage - 1) * 10 + 1,
            limit: 25,
            convert: 'USD'
          },
          headers: {
            'X-CMC_PRO_API_KEY': '1281325f-c9b5-4f1f-99bb-a8d9a3105ad6',
          },
        }
      );

      const data = response.data.data;

      // Map the API response into your desired format
      // 2 decimal places for volume, price, and daily percentage
      // If 10 tokens are returned, there's more to load
      const tokens = data.map((token: any) => ({
        rank: token.cmc_rank,
        icon: `https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`,
        name: token.name,
        volume: (token.quote.USD.volume_24h / 1_000_000_000).toFixed(2),
        price: token.quote.USD.price.toFixed(2),
        dailyPercentage: token.quote.USD.percent_change_24h.toFixed(2),
        marketCap: token.quote.USD.market_cap
      }))
      .sort((a: { marketCap: number; }, b: { marketCap: number; }) => b.marketCap - a.marketCap);

      set((state: any) => ({
        tokens: [...state.tokens, ...tokens],
        loading: false,
        hasMore: data.length === 10,
        page: state.page + 1
      }));
    } catch (error) {
      console.error('Error fetching tokens:', error);
      set({ loading: false });
    }
  },
}));
