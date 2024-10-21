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
    <div className="px-4 space-y-4 sm:py-4 sm:items-center sm:space-y-2">
      <h4 className="text-slate-500">They liked...</h4>
      <div className="m-y-3 flex -space-x-2 overflow-hidden">
        {likes.map((like) => (
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src={like.user.avatar || config.avatarPlaceholder}
            alt=""
            key={like.user.id}
          />
        ))}
      </div>
      {extraCount > 0 && (
        <div className="mt-3 text-sm font-medium">
          <p className="text-slate-500">+ {extraCount} more</p>
        </div>
      )}
    </div>
  )
}
