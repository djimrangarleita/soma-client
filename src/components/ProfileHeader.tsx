import FollowButton from './FollowButton'
import ChipsButton from './ChipsButton'
import UserHeader from './UserHeader'
import { User } from '../lib/types'
import config from '../config'
import toast from 'react-hot-toast'
// import { useEffect, useState } from 'react'

type ProfileHeadersProps = {
  user: User
}

export default function ProfileHeader({ user }: ProfileHeadersProps) {
  const userId = localStorage.getItem('id')
  // const [buttonText, setButtonText] = useState('')
  // const [showButton, setShowButton] = useState(true)
  // useEffect(() => {
  //   if (userId && user.id !== userId && !user.isFollowed) {
  //     setButtonText('Follow')
  //   } else if (userId && user.isFollowed) {
  //     setButtonText('Unfollow')
  //   } else if (user.isFollowing) {
  //     setButtonText('Follow Back')
  //   } else {
  //     setShowButton(false)
  //   }
  // }, [user.id, user.isFollowed, user.isFollowing, showButton])

  const handleFollow = () => {
    toast.success('Success', { duration: 5000 })
  }

  return (
    <div className="relative">
      <div className="h-36 md:h-48 bg-blue-500">
        <img
          src={user.profile?.coverPicture || config.coverPicturePlaceholder}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <UserHeader user={user} />
        <div className="flex justify-end items-center mt-2 space-x-2 sm:space-x-4">
          {userId && (
            <FollowButton
              user={user}
              handleFollowSuccess={handleFollow}
              key="profile-follow"
            />
          )}
          <ChipsButton
            text="Message"
            handleAction={async () => {
              console.log('Clicked')
            }}
          />
        </div>
      </div>
    </div>
  )
}
