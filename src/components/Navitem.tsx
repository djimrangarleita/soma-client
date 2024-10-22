import {
  HomeIcon,
  UserGroupIcon,
  BellIcon,
  GlobeAltIcon,
  BookOpenIcon,
} from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'

export default function Navitem() {
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }: { isActive: boolean }) =>
          `${isActive ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500 flex flex-col items-center`
        }
      >
        <HomeIcon className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs hidden sm:block">Home</span>
      </NavLink>
      <NavLink
        to="library"
        className={({ isActive }: { isActive: boolean }) =>
          `${isActive ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500 flex flex-col items-center`
        }
      >
        <BookOpenIcon className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs hidden sm:block">Library</span>
      </NavLink>
      <NavLink
        to="/network"
        className={({ isActive }: { isActive: boolean }) =>
          `${isActive ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500 flex flex-col items-center`
        }
      >
        <UserGroupIcon className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs hidden sm:block">Network</span>
      </NavLink>

      <NavLink
        to="/explore"
        className={({ isActive }: { isActive: boolean }) =>
          `${isActive ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500 flex flex-col items-center`
        }
      >
        <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs hidden sm:block">Explore</span>
      </NavLink>
      <NavLink
        to="/notification"
        className={({ isActive }: { isActive: boolean }) =>
          `${isActive ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500 flex flex-col items-center`
        }
      >
        <BellIcon className="h-6 w-6" aria-hidden="true" />
        <span className="text-xs hidden sm:block">Notifications</span>
      </NavLink>
    </>
  )
}
