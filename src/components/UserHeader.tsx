import { MapPinIcon } from '@heroicons/react/24/outline'
import config from '../config'
import { User } from '../lib/types'

type UserHeaderProps = {
  user: User
}

export default function UserHeader({
  user: { name, avatar, _count, profile },
}: UserHeaderProps) {
  return (
    <div className="absolute -top-16 left-4 sm:left-8 flex items-center space-x-4">
      <div>
        <div className="sm:w-32 sm:h-32 h-24 w-24 rounded-full border-4 border-white overflow-hidden">
          <img
            src={avatar || config.avatarPlaceholder}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            {name}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {_count.libraries > 0 ? `${_count.libraries} Books` : ''}
          </p>
          <div className="flex text-sm text-gray-500 items-center">
            <MapPinIcon className="h-5 w-5" />
            {profile?.timeZone && <p className="">{profile?.timeZone}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
