import { Link } from 'react-router-dom'
import config from '../config'
import { User } from '../lib/types'
import FollowButton from './FollowButton'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type UserProfileCardProps = {
  user: User
}

export default function UserProfileCard({ user }: UserProfileCardProps) {
  const [showFollow, setShowFollow] = useState(false)

  useEffect(() => {
    const userId = localStorage.getItem('id')
    if (userId && user.id !== userId && !user.isFollowed) {
      setShowFollow(true)
    }
  }, [user.id, user.isFollowed])

  const handleFollow = () => {
    toast.success(`Success, you are now following ${user.name}`, {
      duration: 6000,
    })
    setShowFollow(false)
  }

  return (
    <div className="py-4 px-4 w-full min-w-sm space-y-2 bg-white rounded-xl shadow-md flex items-center gap-x-3">
      <Link to={`/profile/${user.id}`}>
        <img
          className="block h-24 rounded-full sm:mx-0 sm:shrink-0 cursor-pointer"
          src={user.avatar || config.avatarPlaceholder}
          alt={user.name}
        />
      </Link>
      <div className="space-y-2 text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold cursor-pointer">
            <Link to={`/profile/${user.id}`}>{user.name}</Link>
          </p>
          {user._count.libraries > 0 && (
            <Link
              to={'#'}
              className="text-slate-400 text-sm font-medium hover:text-blue-500 hover:underline hover:cursor-pointer"
            >
              {user._count.libraries} Books
            </Link>
          )}
        </div>
        {showFollow && (
          <FollowButton user={user} handleFollowSuccess={handleFollow} />
        )}
      </div>
    </div>
  )
}
