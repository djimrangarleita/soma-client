import {
  ChatBubbleLeftEllipsisIcon,
  HandThumbUpIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import { Post } from '../lib/types'
import { useNavigate } from 'react-router-dom'
import LikesAvatar from './LikesAvatar'
import PostCardHeader from './PostCardHeader'

type PostDetailsCardProps = {
  post: Post
  handleCommentBoxFocus: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export default function PostDetailsCard({
  post: { id, text, medias, user, createdAt, _count, likes },
  handleCommentBoxFocus,
}: PostDetailsCardProps) {
  const media = medias[0]
  const navigate = useNavigate()

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
      <PostCardHeader user={user} createdAt={createdAt} />

      <div className="px-4 py-2">
        <div className="text-gray-700">
          <p>{text}</p>
        </div>
        {media && (
          <div className="mt-4">
            <img className="rounded-lg w-full" src={media} alt="Post image" />
          </div>
        )}
      </div>

      {likes!.length > 0 && (
        <LikesAvatar likes={likes!} likesCount={_count.likes} />
      )}

      <div className="px-4 py-2 flex justify-between text-sm text-gray-600">
        {_count.likes > 0 && (
          <div className="flex items-center">
            <a
              onClick={() => navigate(`/posts/${id}/likes`)}
              className="hover:text-blue-500 hover:underline hover:cursor-pointer"
            >
              <span>{_count.likes} Likes</span>
            </a>
          </div>
        )}

        {_count.comments > 0 && (
          <div className="flex items-center">
            <p className="text-slate-500">
              <span>{_count.comments} Comments</span>
            </p>
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
          onClick={handleCommentBoxFocus}
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
  )
}
