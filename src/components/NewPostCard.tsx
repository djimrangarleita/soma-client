import { useState } from 'react'
import GenericPostForm from './GenericPostForm'
import FileUpdloadInput from './FileUploadInput'

export default function NewPostCard() {
  const [isNote, setIsNote] = useState(false)
  const [filePath, setFilePath] = useState('')

  const handleFileUploadState = async (path?: string) => {
    if (path) {
      setFilePath(path)
    } else {
      setFilePath('')
    }
  }

  const handlePostSubmit = async (content: string) => {
    let data
    if (filePath) {
      data = { content, images: [filePath] }
    }
    const response = await fetch(`/api/${isNote ? 'notes' : 'posts'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data || { content }),
    })
    return response
  }

  return (
    <div className="bg-white p-4 mb-6 rounded-lg shadow-md w-full">
      <GenericPostForm rounded={true} handleAction={handlePostSubmit} />

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
}
