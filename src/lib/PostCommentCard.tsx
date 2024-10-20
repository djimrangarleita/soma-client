import { formatDistanceToNow } from 'date-fns'
import config from '../config'
import { PostComment } from './types'

export default function PostCommentCard({
  id,
  user,
  comment,
  createdAt,
  count,
}: PostComment) {
  return (
    <div
      className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4 mb-4"
      key={id}
    >
      {/* Comment Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden">
            <img
              src={user.avatar || config.avatarPlaceholder}
              alt={`${user.name}'s avatar`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">
              {user.booksCount > 1 ? `${user.booksCount} Books` : ''}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <p>{formatDistanceToNow(createdAt)}</p>
        </div>
      </div>

      {/* User Comment */}
      <p className="text-gray-700 mb-4">{comment}</p>

      {/* Action Buttons */}
      <div className="flex justify-start gap-x-4">
        <button className="flex items-center text-slate-500 hover:underline hover:text-blue-500 transition duration-200 text-sm">
          {count.likes || ''} Like
        </button>
        <button className="flex items-center text-slate-500 hover:underline cursor-not-allowed hover:text-blue-500 transition duration-200 text-sm">
          {count.comments || ''} Comment
        </button>
      </div>
    </div>
  )
}
