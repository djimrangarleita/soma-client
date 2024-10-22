import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import { PhotoIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import uploadFile from '../lib/uploadFile'
import Spinner from './Spinner'

type FieldInputProps = {
  fieldName: string
  textColor?: string
  border?: boolean
  handleUploadState?: (filePath: string) => void
}

export default function FileUploadInput({
  fieldName,
  textColor = 'gray-700',
  border = true,
  handleUploadState,
}: FieldInputProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsLoading(true)
      setUploadError('')
      try {
        const filePath = await uploadFile(file)
        if (handleUploadState) {
          handleUploadState(filePath)
        }
      } catch (error) {
        const err = error as Error
        if (handleUploadState) {
          handleUploadState('')
        }
        setUploadError(`Failed: ${err.message.substring(0, 12)}...`)
        console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div>
      {isLoading ? (
        <Spinner loadingText="Uploading..." />
      ) : (
        <label
          className={`relative cursor-pointer flex items-center bg-transparent text-${textColor} rounded-lg ${border && 'border'} border-gray-300 shadow-sm py-2 px-4 focus-within:ring-2 focus-within:ring-blue-500 hover:bg-gray-50 max-w-50`}
        >
          {fieldName === 'Image' ? (
            <PhotoIcon className="h-5 w-5 mr-1" />
          ) : (
            <ArrowUpOnSquareIcon className="h-5 w-5 mr-1" />
          )}

          <span className="text-sm line-clamp-1">{fieldName}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="absolute inset-0 h-full opacity-0 cursor-pointer"
          />
        </label>
      )}
      {uploadError && (
        <p className="mt-1 text-xs text-red-500">{uploadError}</p>
      )}
    </div>
  )
}
