type ChipsButtonType = {
  text?: string
  handleAction?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>
}
;<button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100">
  Message
</button>

export default function ChipsButton({
  text = 'Follow',
  handleAction,
}: ChipsButtonType) {
  return (
    <button
      className={`px-4 py-1 text-sm text-gray-500 rounded-full border border-gray-300 hover:bg-white hover:border-transparent hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2 inline-flex items-center gap-1`}
      onClick={handleAction}
    >
      {text}
    </button>
  )
}
