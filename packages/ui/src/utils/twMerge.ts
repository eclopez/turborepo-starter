// Add theme tokens here to make twMerge aware of them
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [],
    },
  },
})

export { twMerge }
