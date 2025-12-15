import { createStore } from '@tanstack/react-store'

export type Theme = 'light' | 'dark'

export type AppState = {
  sidebarFixed: boolean
  theme: Theme
  listaTareas: string[]
}

export const appStore = createStore<AppState>({
  sidebarFixed: false,
  theme: 'light',
  listaTareas: [],
})

// Setters / helpers
export const setSidebarFixed = (value: boolean) => {
  appStore.setState((state) => ({ ...state, sidebarFixed: value }))
}

export const toggleSidebarFixed = () => {
  appStore.setState((state) => ({ ...state, sidebarFixed: !state.sidebarFixed }))
}

export const setTheme = (theme: Theme) => {
  appStore.setState((state) => ({ ...state, theme }))
}

export const addTask = (task: string) => {
  if (!task.trim()) return
  appStore.setState((state) => ({ ...state, listaTareas: [...state.listaTareas, task] }))
}

export const removeTaskAt = (index: number) => {
  appStore.setState((state) => ({
    ...state,
    listaTareas: state.listaTareas.filter((_, i) => i !== index),
  }))
}

export const clearTasks = () => {
  appStore.setState((state) => ({ ...state, listaTareas: [] }))
}
