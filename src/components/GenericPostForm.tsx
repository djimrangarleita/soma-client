import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import React, { LegacyRef, useState } from 'react'
import config from '../config'

type GenericPostFormProps = {
  rounded?: boolean
  inputRef?: LegacyRef<HTMLTextAreaElement> | undefined
  placeholder?: string
  initialText?: string
  handleAction: (content: string) => Promise<void | never>
}

export default function GenericPostForm({
  rounded = false,
  inputRef = undefined,
  placeholder = 'What do you think ?',
  initialText = '',
  handleAction,
}: GenericPostFormProps) {
  const [content, setContent] = useState(initialText)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const avatar = localStorage.getItem('avatar')
  const userLocalId = localStorage.getItem('id')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (content.trim()) {
      try {
        setIsSubmitting(true)
        await handleAction(content)
        setContent('')
      } catch (error) {
        const err = error as Error
        setError(err.message)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    userLocalId && (
      <div className="flex items-start space-x-3 mx-auto max-w-md my-3">
        <img
          src={avatar || config.avatarPlaceholder}
          alt="User Avatar"
          className="h-12 w-12 rounded-full"
        />
        <form onSubmit={handleSubmit} className="relative w-full">
          <div
            className={`border border-gray-300 ${rounded ? 'rounded-full px-4' : 'rounded-lg'} p-1 relative`}
          >
            <textarea
              className={`w-full resize-none border-none focus:outline-none focus:ring-0 bg-transparent text-slate-600 text-md`}
              placeholder={placeholder}
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                setError('')
              }}
              disabled={isSubmitting}
              ref={inputRef}
            />
            <button
              type="submit"
              className={`absolute right-1 bottom-1 text-blue-500 p-1 rounded-full focus:outline-none ${
                isSubmitting ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={isSubmitting}
            >
              <PaperAirplaneIcon
                className={`h-6 w-6 transform -rotate-45 ${
                  isSubmitting && 'animate-spin'
                }`}
              />
            </button>
          </div>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </form>
      </div>
    )
  )
}
