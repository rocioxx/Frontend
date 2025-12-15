import { createStore } from '@tanstack/react-store'

export type Theme = 'light' | 'dark'

export type AppState = {
  sidebarFixed: boolean
  theme: Theme
  listaTareas: string[]
}

// Load from localStorage or use defaults
const loadInitialState = (): AppState => {
  try {
    const saved = localStorage.getItem('appState')
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        sidebarFixed: parsed.sidebarFixed ?? false,
        theme: (parsed.theme === 'dark' ? 'dark' : 'light') as Theme,
        listaTareas: Array.isArray(parsed.listaTareas) ? parsed.listaTareas : [],
      }
    }
  } catch {
    // Silently fail if localStorage is not available or JSON is corrupted
  }
  return {
    sidebarFixed: false,
    theme: 'light',
    listaTareas: [],
  }
}

// Save to localStorage whenever state changes
const saveToLocalStorage = (state: AppState) => {
  try {
    localStorage.setItem('appState', JSON.stringify(state))
  } catch {
    // Silently fail if localStorage is not available
  }
}

export const appStore = createStore<AppState>(loadInitialState())

// Setters / helpers
export const setSidebarFixed = (value: boolean) => {
  appStore.setState((state: AppState) => {
    const newState = { ...state, sidebarFixed: value }
    saveToLocalStorage(newState)
    return newState
  })
}

export const toggleSidebarFixed = () => {
  appStore.setState((state: AppState) => {
    const newState = { ...state, sidebarFixed: !state.sidebarFixed }
    saveToLocalStorage(newState)
    return newState
  })
}

export const setTheme = (theme: Theme) => {
  appStore.setState((state: AppState) => {
    const newState = { ...state, theme }
    saveToLocalStorage(newState)
    return newState
  })
}

export const addTask = (task: string) => {
  if (!task.trim()) return
  appStore.setState((state: AppState) => {
    const newState = { ...state, listaTareas: [...state.listaTareas, task] }
    saveToLocalStorage(newState)
    return newState
  })
}

export const removeTaskAt = (index: number) => {
  appStore.setState((state: AppState) => {
    const newState = {
      ...state,
      listaTareas: state.listaTareas.filter((_: string, i: number) => i !== index)
    }
    saveToLocalStorage(newState)
    return newState
  })
}

export const clearTasks = () => {
  appStore.setState((state: AppState) => {
    const newState = { ...state, listaTareas: [] }
    saveToLocalStorage(newState)
    return newState
  })
}
