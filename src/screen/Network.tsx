import { useEffect, useState } from 'react'
import UserProfileCard from '../components/UserProfileCard'
import requestHandler from '../lib/requestHandler'
import Spinner from '../components/Spinner'
import { User } from '../lib/types'
import { motion } from 'framer-motion'

export default function Network() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await requestHandler('users')
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message)
        }
        setUsers(data)
      } catch (error) {
        const err = error as Error
        console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {isLoading ? (
        <Spinner loadingText="Loading..." />
      ) : (
        <div className="flex flex-col gap-6">
          {users.length > 0 ? (
            users.map((user: User) => {
              return <UserProfileCard user={user} key={user.id} />
            })
          ) : (
            <p>No User</p>
          )}
        </div>
      )}
    </motion.div>
  )
}
