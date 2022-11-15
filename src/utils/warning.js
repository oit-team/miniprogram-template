export function warn(msg, ...args) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[warn] ${msg}`, ...args)
  }
}
