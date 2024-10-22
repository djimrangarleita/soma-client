import { useState } from 'react'
import FileUploadInput from '../components/FileUploadInput'
import requestHandler from '../lib/requestHandler'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { parseValidationError } from '../lib/utils'

export default function SignUp() {
  const [filePath, setFilePath] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    phoneNumber: '',
    avatar: '',
  })
  const navigate = useNavigate()
  const [error, setError] = useState({
    email: '',
    name: '',
    password: '',
    phoneNumber: '',
  })

  const handleAvatarUpload = (filePath: string) => {
    setFilePath(filePath)
    setFormData({ ...formData, avatar: filePath })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError({ email: '', name: '', password: '', phoneNumber: '' })
    try {
      const response = await requestHandler('users', 'post', formData)
      const data = await response.json()
      if (!response.ok) {
        if (response.status === 422) {
          const errors = parseValidationError(data)
          if (errors.generic) {
            throw new Error(errors.generic)
          }
          setError({ ...error, ...errors })
        }
      } else {
        toast.success('Account created successfully, you may login now', {
          duration: 8000,
        })
        navigate('/login')
      }
    } catch (error) {
      const err = error as Error
      console.error(err.message)
      toast.error(`Sorry gang, ${err.message}`, { duration: 8000 })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen mx-auto max-w-md">
      <form
        className="bg-white shadow-lg rounded-lg px-8 pt-8 pb-10 mb-4 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1633410189542-36d96e3762b8?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Company Logo"
            className="w-36"
          />
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
          Dear reader, welcome home!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please provide few informations to create your account
        </p>

        <div className="flex items-center justify-between">
          <FileUploadInput
            fieldName="Upload avatar"
            handleUploadState={handleAvatarUpload}
          />
          {filePath ? (
            <img
              src={filePath}
              alt="Avatar Preview"
              className="w-24 h-24 rounded-full border border-gray-300 object-cover mr-4"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mr-4">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            className={`shadow appearance-none border ${error.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200`}
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            required
            onChange={handleChange}
            value={formData.email}
          />
          {error.email && <p className="text-xs text-red-500">{error.email}</p>}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            className={`shadow appearance-none border ${error.name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200`}
            id="name"
            type="text"
            placeholder="Full Name"
            name="name"
            required
            onChange={handleChange}
            value={formData.name}
          />
          {error.name && <p className="text-xs text-red-500">{error.name}</p>}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            className={`shadow appearance-none border ${error.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200`}
            id="phoneNumber"
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            required
            onChange={handleChange}
            value={formData.phoneNumber}
          />
          {error.phoneNumber && (
            <p className="text-xs text-red-500">{error.phoneNumber}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            className={`shadow appearance-none border ${error.password ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200`}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            value={formData.password}
          />
          {error.password && (
            <p className="text-xs text-red-500">{error.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="conditions"
              name="conditions"
              className="mr-2 leading-tight"
              required
            />
            <label className="text-gray-700 text-sm" htmlFor="conditions">
              Accept{' '}
              <a href="#" className="text-blue-500 hover:underline">
                terms and conditions
              </a>
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Create Account
          </button>
        </div>

        <p className="text-center text-gray-600 text-xs mt-4">
          Do you have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  )
}
