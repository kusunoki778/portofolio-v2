import { ref, watch } from 'vue'

const STORAGE_KEY = 'portfolio-theme'
const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches

const theme = ref(stored === 'dark' || stored === 'light' ? stored : prefersDark ? 'dark' : 'light')

function apply(value) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = value
  document.documentElement.style.colorScheme = value
}

apply(theme.value)

watch(theme, (value) => {
  apply(value)
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* storage can be blocked in private mode - theme still works for the session */
  }
})

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggleTheme }
}
