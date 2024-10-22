import { formatDistanceToNow } from 'date-fns'
import config from '../config'
import { PostComment } from '../lib/types'
import { Link, useNavigate } from 'react-router-dom'

export default function PostCommentCard({
  id,
  user,
  text,
  createdAt,
  _count,
}: PostComment) {
  const navigate = useNavigate()

  return (
    <div
      className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4 mb-4"
      key={id}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden">
            <img
              src={user.avatar || config.avatarPlaceholder}
              alt={`${user.name}'s avatar`}
              className="w-full h-full object-cover hover:cursor-pointer"
              onClick={() => navigate(`/profile/${user.id}`)}
            />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800 hover:cursor-pointer">
              <Link to={`/profile/${user.id}`}>{user.name}</Link>
            </h2>
            <p className="text-sm text-gray-500">
              {user._count.libraries > 1
                ? `${user._count.libraries} Books`
                : ''}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <p>{formatDistanceToNow(createdAt)}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{text}</p>
      <div className="flex justify-start gap-x-4">
        <button className="flex items-center text-slate-500 hover:underline hover:text-blue-500 transition duration-200 text-sm">
          {_count.likes || ''} Like
        </button>
        <button className="flex items-center text-slate-500 hover:underline cursor-not-allowed hover:text-blue-500 transition duration-200 text-sm">
          {_count.comments || ''} Comment
        </button>
      </div>
    </div>
  )
}
