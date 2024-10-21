import config from '../config'
import { PostLike } from '../lib/types'

type LikesAvatarProps = {
  likesCount: number
  likes: PostLike[]
}

export default function LikesAvatar({ likesCount, likes }: LikesAvatarProps) {
  const displayCount = likes.length
  const extraCount = likesCount - displayCount

  return (
    <div className="p-8 max-w-md mx-auto space-y-4 bg-white rounded-xl shadow-md sm:py-4 sm:items-center sm:space-y-2">
      <h4 className="text-slate-500">They liked...</h4>
      <div className="m-y-3 flex -space-x-2 overflow-hidden">
        {likes.map((like) => (
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src={like.avatar || config.avatarPlaceholder}
            alt=""
            key={like.id}
          />
        ))}
      </div>
      {extraCount > 0 && (
        <div className="mt-3 text-sm font-medium">
          <a
            href="#"
            className="text-slate-500 hover:text-blue-500 hover:underline"
          >
            + {extraCount} more
          </a>
        </div>
      )}
    </div>
  )
}
