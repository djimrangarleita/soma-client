import { useNavigate, useParams } from 'react-router-dom'
import ProfileHeader from '../components/ProfileHeader'
import { useEffect, useState } from 'react'
import requestHandler from '../lib/requestHandler'
import { User } from '../lib/types'
import Spinner from '../components/Spinner'
import { clearStorage } from '../lib/storageManager'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function Profile() {
  const [user, setUser] = useState<User | never | null>()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await requestHandler(`users/${id || 'me'}`)
        const data = await response.json()
        if (!response.ok) {
          if (response.status === 401) {
            clearStorage()
            toast.error('Please login to continue')
            navigate('/login')
          }
          throw new Error(data.message)
        }
        setUser(data)
      } catch (error) {
        const err = error as Error
        console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [id, navigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {isLoading ? (
        <Spinner loadingText="Loading..." />
      ) : user ? (
        <ProfileHeader user={user} />
      ) : (
        <p>No User</p>
      )}
    </motion.div>
  )
}
