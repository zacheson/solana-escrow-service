import React from "react"
import { SolanaProvider } from "./SolanaProvider"
import ReduxProvider from "./ReduxProvider"

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SolanaProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </SolanaProvider>
  )
}

export default AppProvider
