type SpinnerProps = {
  loadingText?: string
  size?: number
  color?: string
}

export default function Spinner({
  loadingText = 'Please wait...',
  size = 8,
  color = 'text-blue-500',
}: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <svg
        className={`animate-spin h-${size} w-${size} ${color} mr-2`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="text-gray-500 text-sm">{loadingText}</span>
    </div>
  )
}
