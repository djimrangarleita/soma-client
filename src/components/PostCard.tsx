import {
  ChatBubbleLeftEllipsisIcon,
  HandThumbUpIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import config from '../config'
import FollowButton from './FollowButton'
import { Post } from '../lib/types'
import { formatDistanceToNow } from 'date-fns'

export default function PostCard({
  id,
  content,
  medias,
  user,
  createdAt,
  count,
}: Omit<Post, 'comments' | 'likes'>) {
  const media = medias[0]
  return (
    <div
      className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      key={id}
    >
      <div className="flex items-center p-4">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={user.avatar || config.avatarPlaceholder}
          alt="Profile picture"
        />
        <div className="ml-3 flex-1">
          <h2 className="text-gray-900 font-semibold">{user.name}</h2>
          <p className="text-gray-500 text-sm">
            {formatDistanceToNow(createdAt)}
          </p>
        </div>
        <FollowButton />
      </div>

      <div className="px-4 py-2">
        <div className="line-clamp-3 text-gray-700 relative">
          <p>{content}</p>
          <a
            href="#"
            className="absolute bottom-0 right-0 bg-white pl-1 text-blue-500"
          >
            ...see more
          </a>
        </div>
        {media && (
          <div className="mt-4">
            <img className="rounded-lg w-full" src={media} alt="Post image" />
          </div>
        )}
      </div>

      <div className="px-4 py-2 flex justify-between text-sm text-gray-600">
        {count.likes && (
          <div className="flex items-center">
            <a href="#" className="hover:text-blue-500 hover:underline">
              <span>{count.likes} Likes</span>
            </a>
          </div>
        )}

        {count.comments > 0 && (
          <div className="flex items-center">
            <a href="#" className="hover:text-blue-500 hover:underline">
              <span>{count.comments} Comments</span>
            </a>
          </div>
        )}
      </div>

      <div className="flex justify-around items-center pt-3 pb-5 border-t">
        <button className="flex space-x-2 items-center text-gray-600 hover:text-blue-500">
          <HandThumbUpIcon className="h-6 w-6" />
          <span>Like</span>
        </button>
        <button className="flex space-x-2 items-center text-gray-600 hover:text-blue-500">
          <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
          <span>Comment</span>
        </button>
        <button className="flex space-x-2 items-center text-gray-600 hover:text-blue-500">
          <ShareIcon className="h-6 w-6" />
          <span>Share</span>
        </button>
      </div>
    </div>
  )
}
