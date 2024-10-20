import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid'
import Navitem from './Navitem'

export default function Navbar() {
  return (
    <>
      <nav className="bg-white border-b shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-6">
              <a href="#" className="text-xl font-bold text-blue-600">
                SocialApp
              </a>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MagnifyingGlassCircleIcon className="absolute right-2 top-2 h-5 w-5 text-gray-500" />
              </div>
            </div>
            <div className="md:flex items-center space-x-8 hidden">
              <Navitem />
            </div>
            <a href="#" className="text-gray-500 hover:text-blue-500">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile picture"
              />
            </a>
          </div>
        </div>
      </nav>
      <nav className="bg-white border-b shadow-md fixed bottom-0 w-full z-10 md:hidden flex justify-center h-16 items-center">
        <div className="md:hidden items-center flex justify-center space-x-8 max-w-sm gap-4">
          <Navitem />
        </div>
      </nav>
    </>
  )
}
