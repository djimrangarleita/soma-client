import {
  BookOpenIcon,
  MagnifyingGlassCircleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid'
import Navitem from './Navitem'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import requestHandler from '../lib/requestHandler'
import { clearStorage } from '../lib/storageManager'
import toast from 'react-hot-toast'
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'
import config from '../config'

export default function Navbar() {
  const avatar = localStorage.getItem('avatar')
  const userLocalId = localStorage.getItem('id')
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      clearStorage()
      navigate('/')
      toast.success('You are logged out')
      await requestHandler(`users/logout`)
    } catch (error) {
      const err = error as Error
      console.log(err.message)
    }
  }

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMenuOpen(!menuOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    const id = (event.target as HTMLElement).id
    if (
      id !== 'avatar' &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <>
      <nav className="bg-white border-b shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-xl flex items-center justify-start font-bold text-blue-500"
              >
                <BookOpenIcon className="h-8 w-8" />
                Soma
              </Link>
              {userLocalId && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <MagnifyingGlassCircleIcon className="absolute right-2 top-2 h-5 w-5 text-gray-500" />
                </div>
              )}
            </div>
            {userLocalId ? (
              <>
                <div className="md:flex items-center space-x-8 hidden">
                  <Navitem />
                </div>
                <img
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  src={avatar || config.avatarPlaceholder}
                  alt="Profile picture"
                  onClick={toggleMenu}
                  id="avatar"
                />
              </>
            ) : (
              <div className="flex gap-x-3 items-center">
                <button
                  className={`px-4 py-1 text-sm bg-blue-500 text-white font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 inline-flex items-center gap-1`}
                  onClick={() => navigate('/sign-up')}
                >
                  <UserPlusIcon className="h-5 w-5" aria-hidden="true" />
                  Sign Up
                </button>
                <button
                  className={`px-4 py-1 text-sm text-blue-500 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center gap-1`}
                  onClick={() => navigate('/login')}
                >
                  <ArrowRightEndOnRectangleIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {userLocalId && (
        <nav className="bg-white border-b shadow-md fixed bottom-0 w-full z-10 md:hidden flex justify-center h-16 items-center">
          <div className="md:hidden items-center flex justify-center space-x-8 max-w-sm gap-4">
            <Navitem />
          </div>
        </nav>
      )}

      <div className="relative">
        <div
          ref={dropdownRef}
          className={`absolute top-full right-0 z-10 mt-20 bg-white shadow-lg rounded-lg py-2 transition-transform duration-300 ease-in-out overflow-hidden ${
            menuOpen
              ? 'w-48 transform translate-x-0 opacity-100'
              : 'transform translate-x-full opacity-0 w-0'
          }`}
        >
          <Link
            to="/notes"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Notes
          </Link>
          <Link
            to="/profile/me"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              setMenuOpen(false)
              handleLogout()
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  )
}
