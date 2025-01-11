import { useEffect, useState } from 'react'
import requestHandler from '../lib/requestHandler'
import { User } from '../lib/types'
import UserProfileCard from '../components/UserProfileCard'
import Spinner from '../components/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import { motion } from 'framer-motion'

export default function Explore() {
  const [users, setUsers] = useState<User[]>([])
  const [index, setIndex] = useState(2)
  const [hasMore, setHasMore] = useState(true)

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

  const fetchMoreData = () => {
    const fetchUsers = async () => {
      try {
        const response = await requestHandler(`users?page=${index}`)
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message)
        }
        setUsers((prevUsers) => [...prevUsers, ...data.users])
        setHasMore(data.meta.currentPage < data.meta.totalPages)
        setIndex((prevIndex) => prevIndex + 1)
      } catch (error) {
        const err = error as Error
        console.error(err.message)
      }
    }
    fetchUsers()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <InfiniteScroll
        className="flex flex-col gap-6"
        dataLength={users.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner loadingText="Loading..." />}
        endMessage={
          <div className="flex items-center justify-center text-xl m-5 space-y-6 text-slate-500 mx-auto">
            <p>End</p>
          </div>
        }
      >
        {users.map((user: User) => {
          if (!user.isFollowing && !user.isFollowed) {
            return <UserProfileCard user={user} key={user.id} />
          }
        })}
      </InfiniteScroll>
    </motion.div>
  )
}
