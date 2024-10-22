import FollowButton from './FollowButton'
import ChipsButton from './ChipsButton'
import UserHeader from './UserHeader'
import { User } from '../lib/types'
import config from '../config'

type ProfileHeadersProps = {
  user: User
}

export default function ProfileHeader({ user }: ProfileHeadersProps) {
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
          <FollowButton userId={user.id} />
          <ChipsButton
            text="Message"
            handleAction={async (e) => {
              console.log('Clicked', e)
            }}
          />
        </div>
      </div>
    </div>
  )
}
