import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store"
import { toggleTheme } from "@/store/theme/themeConfigSlice"
import EscrowCreator from "@/components/EscrowCreator"
import EscrowTaker from "@/components/EscrowTaker"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import styled from "styled-components"
import { useWallet } from "@solana/wallet-adapter-react"

const AppWalletButton = styled(WalletMultiButton)`
  background: linear-gradient(to right, #9333ea, #db2777, #2563eb) !important;
  border-radius: 0.75rem !important;
  font-weight: 600 !important;
  color: white !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
  transform: scale(1) !important;
  transition: all 0.3s ease !important;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
    transform: scale(1.05) !important;
  }
`

const Home = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector((state) => state.themeConfig.mode)
  const [walletConnected, setWalletConnected] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState("")
  const [activeTab, setActiveTab] = useState<"create" | "take">("create")
  const { connected, publicKey } = useWallet()

  const handleWalletConnect = (wallet: string) => {
    setWalletConnected(!!wallet)
    setConnectedWallet(wallet)
  }

  const handleCreateEscrow = (escrowData: any) => {
    console.log("Creating escrow:", escrowData)
    // This will be implemented with actual Solana integration
  }

  const handleTakeEscrow = (escrowId: string) => {
    console.log("Taking escrow:", escrowId)
    // This will be implemented with actual Solana integration
  }

  const toggleThemeMode = () => {
    dispatch(toggleTheme())
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        themeMode === "dark"
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -top-40 left-20 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${themeMode === "dark" ? "text-white" : "text-gray-900"}`}>
                Solana Escrow
              </h1>
              <p className={`text-sm ${themeMode === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Secure Token Exchange Platform
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleThemeMode}
              className={`p-3 rounded-lg transition-all duration-300 ${
                themeMode === "dark"
                  ? "bg-white/10 text-yellow-400 hover:bg-white/20"
                  : "bg-black/10 text-gray-700 hover:bg-black/20"
              }`}
            >
              {themeMode === "dark" ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            {/* <WalletConnection onWalletConnect={handleWalletConnect} /> */}
            <AppWalletButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2
              className={`text-5xl font-bold mb-4 ${
                themeMode === "dark"
                  ? "bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
              }`}
            >
              Secure Token Escrow
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${themeMode === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Create trustless token exchanges with built-in security. Initialize escrows or complete existing ones with
              confidence.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div
              className={`flex bg-white/10 backdrop-blur-lg rounded-xl p-1 border ${
                themeMode === "dark" ? "border-white/20" : "border-black/20"
              }`}
            >
              <button
                onClick={() => setActiveTab("create")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "create"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : themeMode === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Create Escrow
              </button>
              <button
                onClick={() => setActiveTab("take")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "take"
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
                    : themeMode === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Take Escrow
              </button>
            </div>
          </div>

          {/* Content Sections */}
          <div className="transition-all duration-500">
            {activeTab === "create" ? (
              <EscrowCreator walletConnected={connected} onCreateEscrow={handleCreateEscrow} />
            ) : (
              <EscrowTaker walletConnected={connected} onTakeEscrow={handleTakeEscrow} />
            )}
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`text-center p-6 rounded-xl ${
                themeMode === "dark" ? "bg-white/5 border border-white/10" : "bg-white/20 border border-white/30"
              } backdrop-blur-lg`}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${themeMode === "dark" ? "text-white" : "text-gray-900"}`}>
                Secure & Trustless
              </h3>
              <p className={`${themeMode === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Smart contract-based escrow ensures your tokens are safe
              </p>
            </div>

            <div
              className={`text-center p-6 rounded-xl ${
                themeMode === "dark" ? "bg-white/5 border border-white/10" : "bg-white/20 border border-white/30"
              } backdrop-blur-lg`}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${themeMode === "dark" ? "text-white" : "text-gray-900"}`}>
                Lightning Fast
              </h3>
              <p className={`${themeMode === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Built on Solana for near-instant transactions
              </p>
            </div>

            <div
              className={`text-center p-6 rounded-xl ${
                themeMode === "dark" ? "bg-white/5 border border-white/10" : "bg-white/20 border border-white/30"
              } backdrop-blur-lg`}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${themeMode === "dark" ? "text-white" : "text-gray-900"}`}>
                Low Fees
              </h3>
              <p className={`${themeMode === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Minimal transaction costs compared to other blockchains
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
