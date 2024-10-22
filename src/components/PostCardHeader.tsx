import { Link, useNavigate } from 'react-router-dom'
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
  const userId = localStorage.getItem('id')

  return (
    <div className="flex items-center p-4">
      <img
        className="w-12 h-12 rounded-full object-cover hover:cursor-pointer"
        src={user.avatar || config.avatarPlaceholder}
        alt="Profile picture"
        onClick={() => navigate(`/profile/${user.id}`)}
      />
      <div className="ml-3 flex-1">
        <Link to={`/profile/${user.id}`}>
          <h2 className="text-gray-900 font-semibold hover:cursor-pointer">
            {user.name}
          </h2>
        </Link>
        <p className="text-gray-500 text-sm">
          {formatDistanceToNow(createdAt)}
        </p>
      </div>
      {!userId || (userId !== user.id && <FollowButton userId={user.id} />)}
    </div>
  )
}
