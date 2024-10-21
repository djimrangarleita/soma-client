import { UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import requestHandler from '../lib/requestHandler'
import Spinner from './Spinner'

type FollowButtonType = {
  text?: string
  color?: string
  userId: string
}

export default function FollowButton({
  text = 'Follow',
  color = 'blue-500',
  userId,
}: FollowButtonType) {
  const [isLoading, setIsLoading] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [error, setError] = useState('')

  const handleFollowEvent = async () => {
    setIsLoading(true)
    try {
      const response = await requestHandler(`users/${userId}/follow`)
      if (response.status === 201) {
        setIsFollowing(true)
      }
      throw new Error(response.error)
    } catch (error) {
      const err = error as Error
      setError('Failed')
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading == true ? (
        <Spinner />
      ) : (
        <div>
          <button
            className={`px-4 py-1 text-sm text-${color} font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-${color} hover:border-transparent focus:outline-none focus:ring-2 focus:ring-${color} focus:ring-offset-2 inline-flex items-center gap-1`}
            onClick={handleFollowEvent}
          >
            {text === 'Follow' && !isFollowing ? (
              <UserPlusIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <UserMinusIcon className="h-5 w-5" aria-hidden="true" />
            )}
            {text}
          </button>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      )}
    </>
  )
}
