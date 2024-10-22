import { UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import requestHandler from '../lib/requestHandler'
import Spinner from './Spinner'
import { User } from '../lib/types'

type FollowButtonType = {
  color?: string
  user: User
  handleFollowSuccess: () => void
  textOfButton?: string
}

export default function FollowButton({
  color = 'blue-500',
  user: { id, isFollowing, isFollowed },
  handleFollowSuccess,
  textOfButton,
}: FollowButtonType) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const userLocalId = localStorage.getItem('id')
  const [buttonText, setButtonText] = useState(textOfButton)

  useEffect(() => {
    if (isFollowing && isFollowed) {
      setButtonText('Unfollow')
    } else if (isFollowed) {
      setButtonText('Unfollow')
    } else if (isFollowing) {
      setButtonText('Follow Back')
    } else {
      setButtonText('Follow')
    }
  }, [isFollowing, isFollowed, buttonText])

  const handleFollowEvent = async () => {
    setIsLoading(true)
    try {
      const response = await requestHandler(`users/${id}/follow`, 'patch')
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
      setButtonText('Unfollow')
      handleFollowSuccess()
    } catch (error) {
      const err = error as Error
      setError('Failed')
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return id === userLocalId ? (
    ''
  ) : (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <button
            className={`px-4 py-1 text-sm text-${color} font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-${color} hover:border-transparent focus:outline-none focus:ring-2 focus:ring-${color} focus:ring-offset-2 inline-flex items-center gap-1`}
            onClick={handleFollowEvent}
          >
            {buttonText === 'Unfollow' ? (
              <UserMinusIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <UserPlusIcon className="h-5 w-5" aria-hidden="true" />
            )}
            {buttonText}
          </button>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      )}
    </>
  )
}
