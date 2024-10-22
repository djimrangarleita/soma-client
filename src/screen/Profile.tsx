import { useParams } from 'react-router-dom'
import ProfileHeader from '../components/ProfileHeader'
import { useEffect, useState } from 'react'
import requestHandler from '../lib/requestHandler'
import { User } from '../lib/types'
import Spinner from '../components/Spinner'

export default function Profile() {
  const [user, setPost] = useState<User | never | null>()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await requestHandler(`users/${id || 'me'}`)
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message)
        }
        setPost(data)
      } catch (error) {
        const err = error as Error
        console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [id])

  return (
    <>
      {isLoading ? (
        <Spinner loadingText="Loading..." />
      ) : user ? (
        <ProfileHeader user={user} />
      ) : (
        <p>No Post</p>
      )}
    </>
  )
}
