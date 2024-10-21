import { UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/outline'

type FollowButtonType = {
  text?: string
  color?: string
  handleFollowToggle?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>
}

export default function FollowButton({
  handleFollowToggle,
  text = 'Follow',
  color = 'blue-500',
}: FollowButtonType) {
  return (
    <button
      className={`px-4 py-1 text-sm text-${color} font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-${color} hover:border-transparent focus:outline-none focus:ring-2 focus:ring-${color} focus:ring-offset-2 inline-flex items-center gap-1`}
      onClick={handleFollowToggle}
    >
      {text === 'Follow' ? (
        <UserPlusIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <UserMinusIcon className="h-5 w-5" aria-hidden="true" />
      )}
      {text}
    </button>
  )
}
