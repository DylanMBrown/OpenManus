import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Fallback if clsx is not available
export function clsx(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}