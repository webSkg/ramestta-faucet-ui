"use Client";
import * as React from "react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { Chain } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
export const RamaTestnet = {
  id: 1377,
  name: "Ramestta-Test",
  network: "Ramestta-Test",
  nativeCurrency: {
    decimals: 18,
    name: "RAMA",
    symbol: "RAMA",
  },
  iconUrl:
    "https://raw.githubusercontent.com/Ramestta-Blockchain/ramascan/main/public/static/ramestta_32x32_mm_icon.svg",
  rpcUrls: {
    public: { http: ["https://testnet.ramestta.com"] },
    default: { http: ["https://testnet.ramestta.com"] },
  },
  blockExplorers: {
    etherscan: { name: "SnowTrace", url: "https:testnet.ramascan.com" },
    default: { name: "SnowTrace", url: "https:testnet.ramascan.com" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1_907_934,
    },
  },
} as const;

export const RamaMainnet = {
  id: 1370,
  name: "Ramestta",
  network: "Ramestta",
  nativeCurrency: {
    decimals: 18,
    name: "RAMA",
    symbol: "RAMA",
  },
  iconUrl:
    "https://raw.githubusercontent.com/Ramestta-Blockchain/ramascan/main/public/static/ramestta_32x32_mm_icon.svg",
  rpcUrls: {
    public: { http: ["https://blockchain.ramestta.com"] },
    default: { http: ["https://blockchain.ramestta.com"] },
  },
  blockExplorers: {
    etherscan: { name: "SnowTrace", url: "https:ramascan.com" },
    default: { name: "SnowTrace", url: "https:ramascan.com" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1_907_934,
    },
  },
} as const;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [RamaMainnet, RamaTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http:
          chain.id === 1377
            ? `https:testnet.ramestta.com`
            : "https://blockchain.ramestta.com",
      }),
    }),
  ]
);

const demoAppInfo = {
  appName: "Rainbowkit Demo",
};

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={demoAppInfo}
        initialChain={RamaTestnet}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
