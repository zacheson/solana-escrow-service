import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

export const APP_MODE = process.env.NEXT_PUBLIC_APP_MODE
export const network = APP_MODE == "production" ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet
