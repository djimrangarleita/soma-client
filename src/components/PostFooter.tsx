import { useState } from 'react'
import toast from 'react-hot-toast'
import requestHandler from '../lib/requestHandler'
import { HandThumbUpIcon as HandThumbUpIconSolid } from '@heroicons/react/24/solid'
import {
  ChatBubbleLeftEllipsisIcon,
  HandThumbUpIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import { PostLike } from '../lib/types'
import { useNavigate } from 'react-router-dom'
import LikesAvatar from './LikesAvatar'

type PostFooterProps = {
  id: string
  _count: Record<string, number>
  likes?: PostLike[]
  isLiked: boolean
  isDetail?: boolean
  handleCommentBoxFocus: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

function PostFooter({
  id,
  _count,
  isLiked,
  likes,
  isDetail = false,
  handleCommentBoxFocus,
}: PostFooterProps) {
  const [likesCount, setLikesCount] = useState(_count.likes)
  const [isLikedByUser, setIsLikedByUser] = useState(isLiked)
  const [likesList, setLikesList] = useState(likes)
  const navigate = useNavigate()

  const handleLike = async () => {
    try {
      const response = await requestHandler(`posts/${id}/like`, 'patch')
      const data = await response.json()
      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Please login to like posts', { duration: 3000 })
        }
        throw new Error(data.message)
      }
      setIsLikedByUser((prev) => !prev)
      setLikesCount(data._count.likes)
      setLikesList(data.likes)
    } catch (error) {
      const err = error as Error
      console.error(err.message)
    }
  }

  return (
    <>
      {isDetail && likesCount > 0 && (
        <LikesAvatar likes={likesList!} likesCount={likesCount} />
      )}

      <div className="px-4 py-2 flex justify-between text-sm text-gray-600">
        {likesCount > 0 && (
          <div className="flex items-center">
            <a
              onClick={() => navigate(`/posts/${id}/likes`)}
              className="hover:text-blue-500 hover:underline hover:cursor-pointer"
            >
              <span>
                {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
              </span>
            </a>
          </div>
        )}

        {_count.comments > 0 && (
          <div className="flex items-center">
            <p className="text-slate-500">
              <span>
                {_count.comments}
                {_count.comments === 1 ? ' Comment' : ' Comments'}
              </span>
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-around items-center pt-3 pb-5 border-t">
        <button
          className="flex space-x-2 items-center text-gray-600 hover:text-blue-500"
          onClick={handleLike}
        >
          {isLikedByUser ? (
            <>
              <HandThumbUpIconSolid className="h-6 w-6 text-blue-500" />
              <span className={`${isLiked} && text-blue-500`}>Like</span>
            </>
          ) : (
            <>
              <HandThumbUpIcon className="h-6 w-6" />
              <span>Like</span>
            </>
          )}
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
    </>
  )
}

export default PostFooter
