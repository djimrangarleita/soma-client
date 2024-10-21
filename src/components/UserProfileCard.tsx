import FollowButton from './FollowButton'

type UserProfileCardProps = {
  handleAction: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => Promise<void>
}

export default function UserProfileCard({
  handleAction,
}: UserProfileCardProps) {
  return (
    <div className="py-4 px-4 w-full min-w-sm space-y-2 bg-white rounded-xl shadow-lg flex items-center gap-x-3">
      <img
        className="block h-24 rounded-full sm:mx-0 sm:shrink-0"
        src="https://tailwindcss.com/img/erin-lindford.jpg"
        alt="Woman's Face"
      />
      <div className="space-y-2 text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">Erin Lindford</p>
          <a className="text-slate-400 text-sm font-medium hover:text-blue-500 hover:underline hover:cursor-pointer">
            500 Books
          </a>
        </div>
        <FollowButton handleFollowToggle={handleAction} />
      </div>
    </div>
  )
}
