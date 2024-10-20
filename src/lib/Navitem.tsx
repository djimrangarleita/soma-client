import {
  HomeIcon,
  UserGroupIcon,
  BriefcaseIcon,
  BellIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/solid'

export default function Navitem() {
  return (
    <>
      <a
        href="#"
        className="text-gray-500 hover:text-blue-500 flex flex-col items-center"
      >
        <HomeIcon className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs hidden sm:block">Home</span>
      </a>
      <a
        href="#"
        className="text-gray-500 hover:text-blue-500 flex flex-col items-center"
      >
        <UserGroupIcon className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs hidden sm:block">Network</span>
      </a>
      <a
        href="#"
        className="text-gray-500 hover:text-blue-500 flex flex-col items-center"
      >
        <BriefcaseIcon className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs hidden sm:block">Jobs</span>
      </a>
      <a
        href="#"
        className="text-gray-500 hover:text-blue-500 flex flex-col items-center"
      >
        <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs hidden sm:block">Explore</span>
      </a>
      <a
        href="#"
        className="text-gray-500 hover:text-blue-500 flex flex-col items-center"
      >
        <BellIcon className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs hidden sm:block">Notifications</span>
      </a>
    </>
  )
}
