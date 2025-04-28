import React from 'react'

export const Spinner: React.FC<{ size?: string; color?: string }> = ({
  size = 'h-5 w-5',
  color = 'border-blue-500',
}) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 ${color} ${size}`} role="status"></div>
    </div>
  )
}

export default Spinner
