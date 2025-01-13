import { Post } from '../lib/types'
import PostCardHeader from './PostCardHeader'
import PostFooter from './PostFooter'

type PostDetailsCardProps = {
  post: Post
  handleCommentBoxFocus: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export default function PostDetailsCard({
  post: { id, text, medias, user, createdAt, _count, likes, isLiked },
  handleCommentBoxFocus,
}: PostDetailsCardProps) {
  const media = medias[0]

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
      <PostFooter
        {...{ id, _count, isLiked, likes }}
        isDetail={true}
        handleCommentBoxFocus={handleCommentBoxFocus}
      />
    </div>
  )
}
