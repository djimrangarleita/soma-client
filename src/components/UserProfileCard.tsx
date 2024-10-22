import { Link } from 'react-router-dom'
import config from '../config'
import { User } from '../lib/types'
import FollowButton from './FollowButton'

type UserProfileCardProps = {
  user: User
}

export default function UserProfileCard({
  user: { id, avatar, _count, name },
}: UserProfileCardProps) {
  return (
    <div className="py-4 px-4 w-full min-w-sm space-y-2 bg-white rounded-xl shadow-lg flex items-center gap-x-3">
      <Link to={`/profile/${id}`}>
        <img
          className="block h-24 rounded-full sm:mx-0 sm:shrink-0 cursor-pointer"
          src={avatar || config.avatarPlaceholder}
          alt={name}
        />
      </Link>
      <div className="space-y-2 text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold cursor-pointer">
            <Link to={`/profile/${id}`}>{name}</Link>
          </p>
          {_count.libraries > 0 && (
            <Link
              to={'#'}
              className="text-slate-400 text-sm font-medium hover:text-blue-500 hover:underline hover:cursor-pointer"
            >
              {_count.libraries} Books
            </Link>
          )}
        </div>
        <FollowButton userId={id} />
      </div>
    </div>
  )
}
