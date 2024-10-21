import { useNavigate } from 'react-router-dom'
import { User } from '../lib/types'
import FollowButton from './FollowButton'
import config from '../config'
import { formatDistanceToNow } from 'date-fns'

type PostHeaderCardProps = {
  user: User
  createdAt: Date
}
export default function PostCardHeader({
  user,
  createdAt,
}: PostHeaderCardProps) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center p-4">
      <img
        className="w-12 h-12 rounded-full object-cover hover:cursor-pointer"
        src={user.avatar || config.avatarPlaceholder}
        alt="Profile picture"
        onClick={() => navigate(`/profile/${user.id}`)}
      />
      <div className="ml-3 flex-1">
        <h2
          className="text-gray-900 font-semibold hover:cursor-pointer"
          onClick={() => navigate(`/profile/${user.id}`)}
        >
          {user.name}
        </h2>
        <p className="text-gray-500 text-sm">
          {formatDistanceToNow(createdAt)}
        </p>
      </div>
      <FollowButton userId={user.id} />
    </div>
  )
}
