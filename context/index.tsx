//@ts-nocheck
"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  midnightTheme,
  useAddRecentTransaction,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  State,
  WagmiProvider,
  useAccount,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { blastSepolia } from "wagmi/chains";
import { ABI, CONTRACT_ADDRESS } from "../constants";
import { formatEther, recoverMessageAddress } from "viem";
import { calculateTier } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

import {
  getMinterRole,
  serverGetAndCreateUser,
  serverRewardsUpdate,
  serverGetOrCreateQueue,
  serverGetQueue,
  serverGetAllUser,
} from "@/lib/actions/server.action";
import SpinModal from "../components/ui/modals/SpinModal";
import MachineModal from "@/components/ui/modals/MachineModal";
import TransactionModal from "@/components/ui/modals/TransactionModal";
import { NextUIProvider } from "@nextui-org/react";

// Retrieve default wallets from RainbowKit
const { wallets } = getDefaultWallets();

// Configure RainbowKit with application settings
export const config = getDefaultConfig({
  appName: "App", // Application name shown in UI
  wallets: [
    ...wallets,
    {
      groupName: "Others",
      wallets: [argentWallet, trustWallet, ledgerWallet], // Additional wallet configurations
    },
  ],
  chains: [blastSepolia], // Blockchain chain configurations
  ssr: true, // Server-side rendering flag
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID, // Project ID from environment variables
});

// Initialize React Query client
const queryClient = new QueryClient();

// Disclaimer component for displaying terms and conditions
const Disclaimer = ({ Text, Link }: any) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="#">Terms of Service</Link> and acknowledge you have read and
    understand the protocol <Link href="#">Disclaimer</Link>
  </Text>
);

// ContextProvider component to wrap the entire application with necessary providers
export function ContextProvider({
  children,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config}>
      <Toaster position="top-center" /> {/* Toast notification position */}
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact" // Size of modals
          locale="en-US" // Locale setting
          theme={midnightTheme({ // Theme customization
            accentColor: "white",
            accentColorForeground: "black",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
          showRecentTransactions={true} // Show recent transactions in UI
          appInfo={{ // Application information
            appName: "Green Scan Techs",
            learnMoreUrl: "https://green-dashboard.com/",
            disclaimer: Disclaimer, // Disclaimer component
          }}
        >
          <NextUIProvider> {/* NextUI provider for UI components */}
            <ContractProvider> {/* Provider for contract-related functionality */}
              <MachineModal /> {/* Modal component for machine interactions */}
              <TransactionModal /> {/* Modal component for transaction details */}
              <SpinModal /> {/* Modal component for spinning */}
              {children}
            </ContractProvider>
          </NextUIProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

