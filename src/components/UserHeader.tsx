import config from '../config'

type UserHeaderProps = {
  name: string
  booksFinished: number
  location?: string
  avatar?: string
}

export default function UserHeader({
  name,
  avatar,
  booksFinished,
  location,
}: UserHeaderProps) {
  return (
    <div className="absolute -top-16 left-4 sm:left-8 flex items-center space-x-4">
      {/* Profile Picture */}
      <div>
        <div className="sm:w-32 sm:h-32 h-24 w-24 rounded-full border-4 border-white overflow-hidden">
          <img
            src={avatar || config.avatarPlaceholder}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Basic Information */}
        <div className="">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            {name}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {booksFinished > 1 ? `${booksFinished} Books` : ''}
          </p>
          <p className="text-sm text-gray-500">{location || ''}</p>
        </div>
      </div>
    </div>
  )
}
