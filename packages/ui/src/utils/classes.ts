import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Intelligently merge classes
 * @param inputs
 * @returns
 */
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export { cn }
