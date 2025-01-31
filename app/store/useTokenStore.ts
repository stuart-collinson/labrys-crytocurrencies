import { create } from 'zustand';
// import axios from 'axios';
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
            // -------------------------------- Make the API call to CoinMarketCap
            // -------------------------------- Limit of 25 tokens per request
            // -------------------------------- Convert price to dollars

            //   const currentPage = get().page;

            //   const response = await axios.get(
            //     'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', 
            //     {
            //       params: {
            //         start: (currentPage - 1) * 10 + 1,
            //         limit: 25,
            //         convert: 'USD'
            //       },
            //       headers: {
            //         'X-CMC_PRO_API_KEY': '1281325f-c9b5-4f1f-99bb-a8d9a3105ad6',
            //       },
            //     }
            //   );

            //   const data = response.data.data;

            // -------------------------------- Map the API response into your desired format
            // -------------------------------- 2 decimal places for volume, price, and daily percentage
            // -------------------------------- If 10 tokens are returned, there's more to load

            //   const tokens = data.map((token: any) => ({
            //     rank: token.cmc_rank,
            //     icon: `https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`,
            //     name: token.name,
            //     volume: (token.quote.USD.volume_24h / 1_000_000_000).toFixed(2),
            //     price: token.quote.USD.price.toFixed(2),
            //     dailyPercentage: token.quote.USD.percent_change_24h.toFixed(2),
            //     marketCap: token.quote.USD.market_cap
            //   }))
            //   .sort((a: { marketCap: number; }, b: { marketCap: number; }) => b.marketCap - a.marketCap);


            // -------------------------------- Hardcoded route due to CORS issue with the API x Axios
            const data = [
                {
                    rank: 1,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/tether-usdt-logo.png',
                    name: 'Tether (USDT)',
                    volume: '$84,458,671,425',
                    price: '$1.00008',
                    dailyPercentage: '+0.01%',
                    marketCap: 84458671425,
                },
                {
                    rank: 2,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/bitcoin-btc-logo.png',
                    name: 'Bitcoin (BTC)',
                    volume: '$42,642,524,878',
                    price: '$105,197.66',
                    dailyPercentage: '+1.58%',
                    marketCap: 42642524878,
                },
                {
                    rank: 3,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/ethereum-eth-logo.png',
                    name: 'Ethereum (ETH)',
                    volume: '$20,266,738,188',
                    price: '$3,263.30',
                    dailyPercentage: '+4.02%',
                    marketCap: 20266738188,
                },
                {
                    rank: 4,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/usd-coin-usdc-logo.png',
                    name: 'USD Coin (USDC)',
                    volume: '$7,967,283,900',
                    price: '$0.99996',
                    dailyPercentage: '-0.02%',
                    marketCap: 7967283900,
                },
                {
                    rank: 5,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2023/01/first-digital-usd-fdusd-logo.png',
                    name: 'First Digital USD (FDUSD)',
                    volume: '$5,532,460,060',
                    price: '$0.99932',
                    dailyPercentage: '+0.01%',
                    marketCap: 5532460060,
                },
                {
                    rank: 6,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/xrp-xrp-logo.png',
                    name: 'XRP (XRP)',
                    volume: '$4,850,353,040',
                    price: '$3.13386',
                    dailyPercentage: '+1.65%',
                    marketCap: 4850353040,
                },
                {
                    rank: 7,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/solana-sol-logo.png',
                    name: 'Solana (SOL)',
                    volume: '$4,735,680,878',
                    price: '$240.339',
                    dailyPercentage: '+3.46%',
                    marketCap: 4735680878,
                },
                {
                    rank: 8,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2023/01/official-trump-trump-logo.png',
                    name: 'Official Trump (TRUMP)',
                    volume: '$1,952,227,362',
                    price: '$26.2734',
                    dailyPercentage: '-5.83%',
                    marketCap: 1952227362,
                },
                {
                    rank: 9,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/litecoin-ltc-logo.png',
                    name: 'Litecoin (LTC)',
                    volume: '$1,626,033,030',
                    price: '$129.818',
                    dailyPercentage: '+11.73%',
                    marketCap: 1626033030,
                },
                {
                    rank: 10,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/binance-coin-bnb-logo.png',
                    name: 'BNB (BNB)',
                    volume: '$1,518,350,974',
                    price: '$679.487',
                    dailyPercentage: '+1.16%',
                    marketCap: 1518350974,
                },
                {
                    rank: 11,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2023/01/sui-sui-logo.png',
                    name: 'Sui (SUI)',
                    volume: '$1,509,941,548',
                    price: '$4.18192',
                    dailyPercentage: '+10.45%',
                    marketCap: 1509941548,
                },
                {
                    rank: 12,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/dogecoin-doge-logo.png',
                    name: 'Dogecoin (DOGE)',
                    volume: '$1,395,136,565',
                    price: '$0.33232',
                    dailyPercentage: '+1.17%',
                    marketCap: 1395136565,
                },
                {
                    rank: 13,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/wrapped-ethereum-weth-logo.png',
                    name: 'WETH (WETH)',
                    volume: '$987,946,409',
                    price: '$3,588.42',
                    dailyPercentage: '+1.27%',
                    marketCap: 987946409,
                },
                {
                    rank: 14,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/wrapped-solana-wsol-logo.png',
                    name: 'Wrapped Solana (SOL)',
                    volume: '$931,011,062',
                    price: '$138.347',
                    dailyPercentage: '-0.47%',
                    marketCap: 931011062,
                },
                {
                    rank: 15,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/venus-bnb-vbnb-logo.png',
                    name: 'Venus BNB (vBNB)',
                    volume: '$868,225,762',
                    price: '$14.5338',
                    dailyPercentage: '+0.6%',
                    marketCap: 868225762,
                },
                {
                    rank: 16,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2023/01/pepe-pepe-logo.png',
                    name: 'Pepe (PEPE)',
                    volume: '$842,830,352',
                    price: '$0.00001',
                    dailyPercentage: '+2.43%',
                    marketCap: 842830352,
                },
                {
                    rank: 17,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/venus-btc-vbtc-logo.png',
                    name: 'Venus BTC (vBTC)',
                    volume: '$658,137,718',
                    price: '$1,319.35',
                    dailyPercentage: '+0.02%',
                    marketCap: 658137718,
                },
                {
                    rank: 18,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/cardano-ada-logo.png',
                    name: 'Cardano (ADA)',
                    volume: '$644,946,830',
                    price: '$0.96623',
                    dailyPercentage: '+1.83%',
                    marketCap: 644946830,
                },
                {
                    rank: 19,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2023/01/ordinals-ordi-logo.png',
                    name: 'Ordinals (ORDI)',
                    volume: '$611,181,449',
                    price: '$13.3125',
                    dailyPercentage: '+76.6%',
                    marketCap: 611181449,
                },
                {
                    rank: 20,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/chainlink-link-logo.png',
                    name: 'Chainlink (LINK)',
                    volume: '$598,312,405',
                    price: '$15.8192',
                    dailyPercentage: '+2.73%',
                    marketCap: 598312405,
                },
                {
                    rank: 21,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/arbitrum-arb-logo.png',
                    name: 'Arbitrum (ARB)',
                    volume: '$553,187,940',
                    price: '$1.433',
                    dailyPercentage: '-0.92%',
                    marketCap: 553187940,
                },
                {
                    rank: 22,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/polygon-matic-logo.png',
                    name: 'Polygon (MATIC)',
                    volume: '$521,002,732',
                    price: '$0.9797',
                    dailyPercentage: '+1.14%',
                    marketCap: 521002732,
                },
                {
                    rank: 23,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/staked-ether-steth-logo.png',
                    name: 'Staked Ether (stETH)',
                    volume: '$498,720,104',
                    price: '$3,552.48',
                    dailyPercentage: '+1.42%',
                    marketCap: 498720104,
                },
                {
                    rank: 24,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/tron-trx-logo.png',
                    name: 'TRON (TRX)',
                    volume: '$487,361,890',
                    price: '$0.1532',
                    dailyPercentage: '+0.73%',
                    marketCap: 487361890,
                },
                {
                    rank: 25,
                    icon: 'https://cryptoslate.com/wp-content/uploads/2020/08/internet-computer-icp-logo.png',
                    name: 'Internet Computer (ICP)',
                    volume: '$462,281,645',
                    price: '$12.839',
                    dailyPercentage: '+3.21%',
                    marketCap: 462281645,
                }
            ];

            const tokens = data.map((token: any) => ({
                rank: token.rank,
                icon: token.icon,
                name: token.name,
                volume: token.volume,
                price: token.price,
                dailyPercentage: token.dailyPercentage,
                marketCap: token.marketCap
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
