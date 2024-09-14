interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary'
  type?: 'submit' | 'button'
  className?: string
  onClick?: () => void
}

export const Button = ({ label, onClick, variant = 'primary', type = 'button', className }: ButtonProps) => {
  return (
    <button
      className={`${
        variant === 'primary' ? 'bg-blue-500 hover:bg-blue-400' : 'bg-gray-500 hover:bg-gray-400'
      }  text-white font-bold py-3 px-6 rounded-md tracking-wide uppercase ${className}`}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  )
}
