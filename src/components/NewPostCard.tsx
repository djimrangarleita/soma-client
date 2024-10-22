import { useState } from 'react'
import GenericPostForm from './GenericPostForm'
import FileUpdloadInput from './FileUploadInput'
import requestHandler from '../lib/requestHandler'
import { Post } from '../lib/types'
import toast from 'react-hot-toast'
import { clearStorage } from '../lib/storageManager'
import { useNavigate } from 'react-router-dom'

type NewPostCardProps = {
  handlePostsUpdate: (data: Post | undefined) => void
}

export default function NewPostCard({ handlePostsUpdate }: NewPostCardProps) {
  const [isNote, setIsNote] = useState(false)
  const [filePath, setFilePath] = useState('')
  const navigate = useNavigate()
  const userLocalId = localStorage.getItem('id')

  const handleFileUploadState = async (path?: string) => {
    if (path) {
      setFilePath(path)
    } else {
      setFilePath('')
    }
  }

  const handlePostSubmit = async (text: string) => {
    let data
    if (filePath) {
      data = { text, medias: [filePath] }
    }
    try {
      const response = await requestHandler(
        `${isNote ? 'notes' : 'posts'}`,
        'POST',
        data || { text }
      )
      const dataResponse = await response.json()
      if (!response.ok) {
        console.error(dataResponse)
        if (response.status === 401) {
          clearStorage()
          navigate('/login')
          throw new Error('Unauthorized')
        }
        throw new Error('Validation error')
      }
      if (!isNote) handlePostsUpdate(dataResponse)
      toast.success(
        `${isNote ? 'Note saved, check it in your profile page' : 'Success, new post published'}`,
        {
          duration: 6000,
        }
      )
      setFilePath('')
    } catch (error) {
      const err = error as Error
      console.error(err.message)
      throw new Error(err.message)
    }
  }

  return (
    userLocalId && (
      <div className="bg-white p-4 mb-6 rounded-lg shadow-md w-full">
        <GenericPostForm
          rounded={true}
          handleAction={handlePostSubmit}
          placeholder="What are you reading today..."
        />

        <div className="flex justify-center items-center mt-3 space-x-4">
          <FileUpdloadInput
            fieldName="Image"
            textColor="gray-500"
            border={false}
            handleUploadState={handleFileUploadState}
          />
          <div className="w-20 h-20 bg-transparent flex items-center justify-center mr-4">
            {filePath && (
              <img
                src={filePath}
                alt="Image Preview"
                className={`w-full h-full border border-gray-300 object-cover mr-4`}
              />
            )}
          </div>
          <label className="flex items-center space-x-1 text-gray-500">
            <input
              type="checkbox"
              checked={isNote}
              onChange={() => setIsNote(!isNote)}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span>Note</span>
          </label>
        </div>
      </div>
    )
  )
}
