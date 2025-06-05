import { useWallet } from "@solana/wallet-adapter-react"
import React, { useState } from "react"

interface EscrowCreatorProps {
  walletConnected: boolean
  onCreateEscrow?: (escrowData: any) => void
}

const EscrowCreator: React.FC<EscrowCreatorProps> = ({ walletConnected, onCreateEscrow }) => {
  const [tokenAAmount, setTokenAAmount] = useState("")
  const [tokenBAmount, setTokenBAmount] = useState("")
  const [tokenAMint, setTokenAMint] = useState("")
  const [tokenBMint, setTokenBMint] = useState("")
  const [takerWallet, setTakerWallet] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const { connected, publicKey } = useWallet()

  const handleCreateEscrow = async () => {
    if (!walletConnected) return

    setIsCreating(true)
    // Placeholder for escrow creation logic
    const escrowData = {
      tokenAAmount: parseFloat(tokenAAmount),
      tokenBAmount: parseFloat(tokenBAmount),
      tokenAMint,
      tokenBMint,
      takerWallet,
    }

    // Simulate API call
    setTimeout(() => {
      onCreateEscrow?.(escrowData)
      setIsCreating(false)
      // Reset form
      setTokenAAmount("")
      setTokenBAmount("")
      setTokenAMint("")
      setTokenBMint("")
      setTakerWallet("")
    }, 2000)
  }

  const isFormValid = tokenAAmount && tokenBAmount && tokenAMint && tokenBMint && takerWallet

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Create New Escrow
        </h2>
        <p className="text-gray-300">Initialize a secure token exchange</p>
      </div>

      <div className="space-y-6">
        {/* Token A Section */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-400/30">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
              A
            </span>
            Your Token (Sending)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Token A Mint Address</label>
              <input
                type="text"
                value={tokenAMint}
                onChange={(e) => setTokenAMint(e.target.value)}
                placeholder="Enter token mint address..."
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
              <input
                type="number"
                value={tokenAAmount}
                onChange={(e) => setTokenAAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Exchange Arrow */}
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center transform rotate-90">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l4-4m0 0l4-4m-4 4v12" />
            </svg>
          </div>
        </div>

        {/* Token B Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-400/30">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
              B
            </span>
            Receiving Token
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Token B Mint Address</label>
              <input
                type="text"
                value={tokenBMint}
                onChange={(e) => setTokenBMint(e.target.value)}
                placeholder="Enter token mint address..."
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Expected Amount</label>
              <input
                type="number"
                value={tokenBAmount}
                onChange={(e) => setTokenBAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Taker Wallet */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Taker Wallet Address</label>
          <input
            type="text"
            value={takerWallet}
            onChange={(e) => setTakerWallet(e.target.value)}
            placeholder="Enter the wallet address of the person taking this escrow..."
            className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
          />
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreateEscrow}
          disabled={!walletConnected || !isFormValid || isCreating}
          className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
            walletConnected && isFormValid && !isCreating
              ? "bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:shadow-xl transform hover:scale-105"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          {isCreating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Creating Escrow...</span>
            </div>
          ) : (
            "Create Escrow"
          )}
        </button>

        {!walletConnected && (
          <p className="text-center text-yellow-400 text-sm">Please connect your wallet to create an escrow</p>
        )}
      </div>
    </div>
  )
}

export default EscrowCreator
