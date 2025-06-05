import React, { useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

interface WalletConnectionProps {
  onWalletConnect?: (wallet: string) => void
}

const WalletConnection: React.FC<WalletConnectionProps> = ({ onWalletConnect }) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      {/* Custom styled wallet button */}
      <div className="wallet-adapter-button-trigger">
        <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !via-pink-600 !to-blue-600 !rounded-xl !font-semibold !text-white !shadow-lg hover:!shadow-xl !transform hover:!scale-105 !transition-all !duration-300" />
      </div>

      {/* Network indicator */}

      {/* Connection status */}
      {
        <div className="flex items-center space-x-2 text-yellow-400 text-sm">
          <div className="w-4 h-4 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin"></div>
          <span>Connecting...</span>
        </div>
      }
    </div>
  )
}

export default WalletConnection
