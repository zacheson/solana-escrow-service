import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ThemeMode = "light" | "dark"

interface ThemeConfigState {
  mode: ThemeMode
}

const initialState: ThemeConfigState = {
  mode: "dark", // default theme
}

const themeConfigSlice = createSlice({
  name: "themeConfig",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light"
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload
    },
  },
})

export const { toggleTheme, setTheme } = themeConfigSlice.actions
export default themeConfigSlice.reducer
