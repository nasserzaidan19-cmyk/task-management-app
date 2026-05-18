import { ref, watch, onMounted, onUnmounted } from 'vue'

export function useTheme() {
  const isDark = ref(false)
  const LOCAL_STORAGE_KEY = 'tms-theme'

  const updateDOM = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  // Set up system preference listener media query anchor tracker string
  let mediaQuery: MediaQueryList | null = null

  const handleSystemThemeChange = (event: MediaQueryListEvent) => {
    if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
      isDark.value = event.matches
    }
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY)

    // Set up media query system watcher registration
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleSystemThemeChange)

    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = mediaQuery.matches
    }

    updateDOM(isDark.value)
  })

  // Clean up long-lived event listeners to avoid memory leaks
  onUnmounted(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  })

  // Watch state changes to synchronize with localStorage and DOM side-effects
  watch(isDark, (newVal) => {
    updateDOM(newVal)
    localStorage.setItem(LOCAL_STORAGE_KEY, newVal ? 'dark' : 'light')
  })

  return {
    isDark,
    toggleTheme,
  }
}
