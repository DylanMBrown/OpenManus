import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full bg-gray-900 border border-gray-700 text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder-gray-400',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input