import { useState } from 'react'
import requestHandler from '../lib/requestHandler'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { setUserData } from '../lib/storageManager'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { BookOpenIcon } from '@heroicons/react/24/solid'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  if (localStorage.getItem('token')) {
    navigate(from)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await requestHandler('users/login', 'post', formData)
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
      setUserData(data)
      toast.success('Successfully logged in', { duration: 6000 })
      navigate(from)
    } catch (error) {
      const err = error as Error
      console.error(error)
      setError(err.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-center justify-center">
        <form
          className="bg-white shadow-md rounded-lg px-8 pt-8 pb-10 mb-4 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center mb-4">
            <Link
              to="/"
              className="text-xl flex items-center justify-start font-bold text-blue-500"
            >
              <BookOpenIcon className="h-8 w-8" />
              Soma
            </Link>
          </div>

          <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Please enter your credentials to access your account.
          </p>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border ${error ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200`}
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              name="email"
              value={formData.email}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 leading-tight"
              />
              <label className="text-gray-700 text-sm" htmlFor="remember">
                Remember Me
              </label>
            </div>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>

          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Login
            </button>
          </div>

          <p className="text-center text-gray-600 text-xs mt-4">
            Don't have an account?{' '}
            <a href="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </motion.div>
  )
}
