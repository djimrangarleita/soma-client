import {
  ChatBubbleLeftEllipsisIcon,
  HandThumbUpIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import { Post } from '../lib/types'
import { Link, useNavigate } from 'react-router-dom'
import PostCardHeader from './PostCardHeader'
import { motion } from 'framer-motion'

export default function PostCard({
  id,
  text,
  medias,
  user,
  createdAt,
  _count,
}: Post) {
  const media = medias[0]
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <PostCardHeader user={user} createdAt={createdAt} />

        <div className="px-4 py-2">
          <div className="line-clamp-3 text-gray-700 relative">
            <p>{text}</p>
            <Link
              to={`/posts/${id}`}
              className="absolute bottom-0 right-0 bg-white pl-1 text-slate-500 hover:cursor-pointer"
            >
              ...view
            </Link>
          </div>
          {media && (
            <div className="mt-4">
              <Link to={`/posts/${id}`}>
                <img
                  className="rounded-lg w-full hover:cursor-pointer"
                  src={media}
                  alt="Post image"
                />
              </Link>
            </div>
          )}
        </div>

        <div className="px-4 py-2 flex justify-between text-sm text-gray-600">
          {_count.likes > 0 && (
            <div className="flex items-center">
              <Link
                to={`/posts/${id}/likes`}
                className="hover:text-blue-500 hover:underline"
              >
                <span>{_count.likes} Likes</span>
              </Link>
            </div>
          )}

          {_count.comments > 0 && (
            <div className="flex items-center">
              <Link
                to={`/posts/${id}`}
                className="hover:text-blue-500 hover:underline"
              >
                <span>{_count.comments} Comments</span>
              </Link>
            </div>
          )}
        </div>

        <div className="flex justify-around items-center pt-3 pb-5 border-t">
          <button className="flex space-x-2 items-center text-gray-600 hover:text-blue-500">
            <HandThumbUpIcon className="h-6 w-6" />
            <span>Like</span>
          </button>
          <button
            className="flex space-x-2 items-center text-gray-600 hover:text-blue-500"
            onClick={() => navigate(`/posts/${id}`)}
          >
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
            <span>Comment</span>
          </button>
          <button className="flex space-x-2 items-center text-gray-600 hover:text-blue-500 cursor-not-allowed">
            <ShareIcon className="h-6 w-6" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
