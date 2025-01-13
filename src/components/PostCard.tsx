import { Post } from '../lib/types'
import { Link, useNavigate } from 'react-router-dom'
import PostCardHeader from './PostCardHeader'
import { motion } from 'framer-motion'
import PostFooter from './PostFooter'

export default function PostCard({
  id,
  text,
  medias,
  user,
  createdAt,
  _count,
  isLiked,
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

        <PostFooter
          {...{ id, _count, isLiked }}
          handleCommentBoxFocus={() => navigate(`/posts/${id}`)}
        />
      </div>
    </motion.div>
  )
}
