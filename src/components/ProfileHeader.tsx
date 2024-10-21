import { useState } from 'react'
import FollowButton from './FollowButton'
import ChipsButton from './ChipsButton'
import UserHeader from './UserHeader'

export default function ProfileHeader() {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollowToggle = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    console.log(event)
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="h-36 md:h-48 bg-blue-500">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D16AQHxV3JirIE1sQ/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1706489344116?e=1735171200&v=beta&t=ucqECG8pwSPcXGfY0XTh4jA2uQ31wN9bly_ciSUSn6I"
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Picture and Basic Info */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <UserHeader
          name="John Doe"
          location="Nairobi, Kenya"
          booksFinished={0}
        />

        {/* Action Buttons (Chips) */}
        <div className="flex justify-end items-center mt-2 space-x-2 sm:space-x-4">
          <FollowButton
            handleFollowToggle={handleFollowToggle}
            text={isFollowing ? 'Unfollow' : 'Follow'}
          />
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
