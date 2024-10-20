import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import sleep from './sleep'
import config from '../config'

type GenericPostFormProps = {
  rounded?: boolean
  handleAction: (content: string) => Promise<Response | never>
}

export default function GenericPostForm({
  rounded = false,
  handleAction,
}: GenericPostFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      try {
        setIsSubmitting(true)
        await sleep(10000)
        const response = await handleAction(content)
        const data = await response.json()
        if (response.ok) {
          setContent('')
        } else {
          setError(data.error.message || data.error)
        }
      } catch (error) {
        const err = error as Error
        setError(err.message)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="flex items-start space-x-3 mx-auto max-w-md my-3">
      <img
        src={config.avatarPlaceholder}
        alt="User Avatar"
        className="h-12 w-12 rounded-full"
      />
      <form onSubmit={handleSubmit} className="relative w-full">
        <div
          className={`border border-gray-300 ${rounded ? 'rounded-full px-4' : 'rounded-lg'} p-1 relative`}
        >
          <textarea
            className={`w-full ${rounded && 'h-8 focus:h-12'} resize-none border-none focus:outline-none focus:ring-0 bg-transparent text-slate-600 text-md`}
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className={`absolute right-1 bottom-1 text-blue-500 p-1 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              isSubmitting ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={isSubmitting}
          >
            <PaperAirplaneIcon
              className={`h-6 w-6 hover:fill-blue-300 transform -rotate-45 ${
                isSubmitting && 'animate-spin'
              }`}
            />
          </button>
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </form>
    </div>
  )
}
