import "@/styles/globals.css"
import type { AppProps } from "next/app"
import AppProvider from "./providers/AppProvider"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}
