import React from "react"
import { Provider } from "react-redux"
import { useStore, usePersistor } from "@/store"
import { PersistGate } from "redux-persist/integration/react"

const ReduxProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const store = useStore()
  const persistor = usePersistor()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider
