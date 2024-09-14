export const storageService = {
  save: (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get: <T>(key: string) => {
    try {
      return JSON.parse(localStorage.getItem(key) as string) as T
    } catch (error) {
      return undefined
    }
  },
  remove: (key: string) => {
    localStorage.removeItem(key)
  },
}
