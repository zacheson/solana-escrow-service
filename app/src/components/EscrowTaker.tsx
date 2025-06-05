import React, { useState } from "react"

interface EscrowData {
  id: string
  initializer: string
  tokenA: {
    mint: string
    amount: number
  }
  tokenB: {
    mint: string
    amount: number
  }
  status: "active" | "completed" | "cancelled"
  createdAt: string
}

interface EscrowTakerProps {
  walletConnected: boolean
  onTakeEscrow?: (escrowId: string) => void
}

const EscrowTaker: React.FC<EscrowTakerProps> = ({ walletConnected, onTakeEscrow }) => {
  const [escrowId, setEscrowId] = useState("")
  const [isTaking, setIsTaking] = useState(false)
  const [escrowDetails, setEscrowDetails] = useState<EscrowData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mock escrow data for demonstration
  const mockEscrows: EscrowData[] = [
    {
      id: "1a2b3c4d5e6f7g8h9i0j",
      initializer: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
      tokenA: {
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        amount: 100,
      },
      tokenB: {
        mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        amount: 50,
      },
      status: "active",
      createdAt: "2024-01-15T10:30:00Z",
    },
  ]

  const handleSearchEscrow = async () => {
    if (!escrowId.trim()) return

    setIsLoading(true)
    // Simulate API call to fetch escrow details
    setTimeout(() => {
      const foundEscrow = mockEscrows.find((e) => e.id === escrowId)
      setEscrowDetails(foundEscrow || null)
      setIsLoading(false)
    }, 1000)
  }

  const handleTakeEscrow = async () => {
    if (!walletConnected || !escrowDetails) return

    setIsTaking(true)
    // Simulate taking escrow
    setTimeout(() => {
      onTakeEscrow?.(escrowDetails.id)
      setIsTaking(false)
      setEscrowDetails(null)
      setEscrowId("")
    }, 2000)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`
  }

  const formatTokenAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount)
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Take Escrow
        </h2>
        <p className="text-gray-300">Complete a token exchange as the taker</p>
      </div>

      <div className="space-y-6">
        {/* Search Section */}
        <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl p-6 border border-green-400/30">
          <h3 className="text-xl font-semibold text-white mb-4">Find Escrow</h3>
          <div className="flex space-x-3">
            <input
              type="text"
              value={escrowId}
              onChange={(e) => setEscrowId(e.target.value)}
              placeholder="Enter escrow ID..."
              className="flex-1 px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
            />
            <button
              onClick={handleSearchEscrow}
              disabled={!escrowId.trim() || isLoading}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                escrowId.trim() && !isLoading
                  ? "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg transform hover:scale-105"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>

        {/* Quick Access to Demo Escrow */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Try with demo escrow:</p>
          <button
            onClick={() => {
              setEscrowId("1a2b3c4d5e6f7g8h9i0j")
              handleSearchEscrow()
            }}
            className="text-blue-400 hover:text-blue-300 underline text-sm"
          >
            1a2b3c4d5e6f7g8h9i0j
          </button>
        </div>

        {/* Escrow Details */}
        {escrowDetails && (
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl p-6 border border-indigo-400/30 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Escrow Details</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  escrowDetails.status === "active"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                }`}
              >
                {escrowDetails.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* You Will Send */}
              <div className="bg-black/20 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-3">You Will Send</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token:</span>
                    <span className="text-white font-mono text-sm">{formatAddress(escrowDetails.tokenB.mint)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-green-400 font-semibold">
                      {formatTokenAmount(escrowDetails.tokenB.amount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* You Will Receive */}
              <div className="bg-black/20 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-3">You Will Receive</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token:</span>
                    <span className="text-white font-mono text-sm">{formatAddress(escrowDetails.tokenA.mint)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-blue-400 font-semibold">
                      {formatTokenAmount(escrowDetails.tokenA.amount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/20 rounded-lg p-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Initializer:</span>
                <span className="text-white font-mono text-sm">{formatAddress(escrowDetails.initializer)}</span>
              </div>
            </div>

            {/* Take Escrow Button */}
            <button
              onClick={handleTakeEscrow}
              disabled={!walletConnected || escrowDetails.status !== "active" || isTaking}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                walletConnected && escrowDetails.status === "active" && !isTaking
                  ? "bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:shadow-xl transform hover:scale-105"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              {isTaking ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Taking Escrow...</span>
                </div>
              ) : escrowDetails.status !== "active" ? (
                "Escrow Not Available"
              ) : (
                "Take Escrow"
              )}
            </button>
          </div>
        )}

        {/* No Escrow Found */}
        {escrowId && !escrowDetails && !isLoading && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-gray-400">No escrow found with ID: {escrowId}</p>
          </div>
        )}

        {!walletConnected && (
          <p className="text-center text-yellow-400 text-sm">Please connect your wallet to take an escrow</p>
        )}
      </div>
    </div>
  )
}

export default EscrowTaker
