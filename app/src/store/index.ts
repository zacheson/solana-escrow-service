import { combineReducers, configureStore } from "@reduxjs/toolkit"
import themeConfigSlice from "./theme/themeConfigSlice"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist"
import { useMemo } from "react"
import createWebStorage from "redux-persist/lib/storage/createWebStorage"

// Create a noop storage for SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: string) {
      return Promise.resolve()
    },
  }
}

let store: ReturnType<typeof makeStore>
let persistor: ReturnType<typeof persistStore> | undefined
const isServer = typeof window === "undefined"

const PERSISTED_KEYS: string[] = ["themeConfig"]
const UNPERSISTED_KEYS: string[] = []

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage()

const persistConfig = {
  key: "NextjsTSAppStore",
  whitelist: PERSISTED_KEYS,
  blacklist: UNPERSISTED_KEYS,
  storage,
  version: 1,
}

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

function makeStore(preloadedState = undefined) {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    preloadedState,
  })
}

const initializeStore = (preloadedState: any = undefined) => {
  let _store = store ?? makeStore(preloadedState)

  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = undefined as any
  }

  if (typeof window === "undefined") return _store

  if (!store) {
    store = _store
  }

  return _store
}

store = initializeStore()

// Only initialize store on client side to avoid hydration mismatches
export const useStore = (initialState: any = undefined) => {
  if (isServer) {
    return makeStore(initialState)
  }

  if (!store) {
    store = useMemo(() => initializeStore(initialState), [initialState])
  }

  return store
}

// Only create persistor on client side
export const usePersistor = () => {
  // Only use this code for the production
  // if (isServer) return null

  if (!persistor) {
    persistor = persistStore(useStore(), undefined, () => {})
  }

  return persistor
}

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
