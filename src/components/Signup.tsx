import { useState } from 'react'
import FileUploadInput from './FileUploadInput'

export default function Signup() {
  const [filePath, setFilePath] = useState('')

  const handleAvatarUpload = (filePath: string) => {
    setFilePath(filePath)
  }

  return (
    <div className="flex items-center justify-center min-h-screen mx-auto max-w-md">
      <form className="bg-white shadow-lg rounded-lg px-8 pt-8 pb-10 mb-4 w-full">
        <div className="flex justify-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1633410189542-36d96e3762b8?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Company Logo"
            className="w-36"
          />
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
          Welcome, dear reader!
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
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
            id="name"
            type="text"
            placeholder="Full Name"
            name="name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
            id="phone"
            type="text"
            placeholder="Phone Number"
            name="phone"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
            id="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="conditions"
              name="conditions"
              className="mr-2 leading-tight"
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
