// import { useEffect, useState } from 'react'
// import UserProfileCard from '../components/UserProfileCard'
// import requestHandler from '../lib/requestHandler'
// import Spinner from '../components/Spinner'
// import { User } from '../lib/types'
// import { motion } from 'framer-motion'

// export default function Network() {
//   const [users, setUsers] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await requestHandler('users')
//         const data = await response.json()
//         if (!response.ok) {
//           throw new Error(data.message)
//         }
//         setUsers(data.users)
//       } catch (error) {
//         const err = error as Error
//         console.error(err.message)
//       } finally {
//         setIsLoading(false)
//       }
//     }
//     fetchUsers()
//   }, [])

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.7 }}
//     >
//       {isLoading ? (
//         <Spinner loadingText="Loading..." />
//       ) : (
//         <div className="flex flex-col gap-6">
//           {users.length > 0 ? (
//             users.map((user: User) => {
//               return <UserProfileCard user={user} key={user.id} />
//             })
//           ) : (
//             <p>No User</p>
//           )}
//         </div>
//       )}
//     </motion.div>
//   )
// }

import { useEffect, useState } from 'react'
import requestHandler from '../lib/requestHandler'
import { User } from '../lib/types'
import UserProfileCard from '../components/UserProfileCard'
import { motion } from 'framer-motion'

export default function Network() {
  const [users, setUsers] = useState<User[]>([])
  const [followers, setFollowers] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await requestHandler(`users?page=1`)
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message)
        }
        setUsers(data.users)
      } catch (error) {
        const err = error as Error
        console.error(err.message)
      }
    }
    fetchUsers()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex gap-6 items-center justify-center mb-6">
        <button
          className={`px-4 py-1 text-sm text-gray-500 rounded-full border border-gray-300 hover:bg-white hover:border-transparent hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2 inline-flex items-center gap-1`}
          onClick={() => setFollowers(true)}
        >
          Followers
        </button>
        <button
          className={`px-4 py-1 text-sm text-gray-500 rounded-full border border-gray-300 hover:bg-white hover:border-transparent hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2 inline-flex items-center gap-1`}
          onClick={() => setFollowers(false)}
        >
          Following
        </button>
      </div>
      <div className="flex flex-col gap-6">
        {followers &&
          users.map((user: User) => {
            if (user.isFollowing) {
              return <UserProfileCard user={user} key={user.id} />
            }
          })}
        {!followers &&
          users.map((user: User) => {
            if (user.isFollowed) {
              return <UserProfileCard user={user} key={user.id} />
            }
          })}
      </div>
    </motion.div>
  )
}
