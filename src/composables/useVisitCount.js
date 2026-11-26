import { ref } from 'vue'

// Free public counter (no signup, CORS-enabled). One namespace per site keeps
// the count isolated. Docs: https://counterapi.com
const NAMESPACE = 'mufra-portfolio.vercel.app'
const ACTION = 'view'
const KEY = 'portfolio'
// API adds this baseline to the stored count, so the first visit shows 38
// (continuing the old site's count). Set to 0 to start from 1.
const START_NUMBER = 37
const FALLBACK = '38'
const TIMEOUT_MS = 8000

const visits = ref(null)
const failed = ref(false)
let started = false

export function trackVisit() {
  if (started || typeof window === 'undefined') return
  started = true

  // Show the old count immediately; the API replaces it when it responds.
  if (visits.value === null) visits.value = FALLBACK

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  const url = `https://counterapi.com/api/${NAMESPACE}/${ACTION}/${KEY}?startNumber=${START_NUMBER}`

  fetch(url, { signal: controller.signal })
    .then((response) => {
      if (!response.ok) throw new Error(`Counter API returned ${response.status}`)
      return response.json()
    })
    .then((data) => {
      if (typeof data.value === 'number') visits.value = data.value.toLocaleString('en-US')
    })
    .catch(() => {
      // A counter must never break the page; Home falls back to the old count.
      failed.value = true
    })
    .finally(() => clearTimeout(timer))
}

export function useVisitCount() {
  trackVisit()
  return { visits, failed }
}
