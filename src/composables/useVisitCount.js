import { ref } from 'vue'

const LOCAL_STORAGE_KEY = 'mufra-dev-visitor-count'
const DEFAULT_BASELINE = 38

const visits = ref(null)
const failed = ref(false)
let initialized = false

export function trackVisit() {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  // 1. Immediately read from localStorage and increment
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    const current = stored ? Number(stored) + 1 : DEFAULT_BASELINE
    localStorage.setItem(LOCAL_STORAGE_KEY, String(current))
    visits.value = current.toLocaleString('en-US')
  } catch {
    visits.value = String(DEFAULT_BASELINE)
  }

  // 2. Asynchronously ping remote counter API (like live site)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 6000)

  fetch('https://api.counterapi.dev/v1/mufra-dev/visits/up', { signal: controller.signal })
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((data) => {
      if (data && typeof data.count === 'number') {
        visits.value = Number(data.count).toLocaleString('en-US')
        localStorage.setItem(LOCAL_STORAGE_KEY, String(data.count))
      }
    })
    .catch(() => {
      // Local counter is already set and displayed
    })
    .finally(() => {
      clearTimeout(timer)
    })
}

export function useVisitCount() {
  // Ensure trackVisit is executed if not already
  trackVisit()
  return { visits, failed }
}
