import NewPostCard from '../components/NewPostCard'
import { Post } from '../lib/types'
import PostCard from '../components/PostCard'
import requestHandler from '../lib/requestHandler'
import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await requestHandler('posts')
        setPosts(data)
      } catch (error) {
        const err = error as Error
        console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <>
      <NewPostCard />
      {isLoading ? (
        <Spinner loadingText="Loading..." />
      ) : (
        <div className="flex flex-col gap-6">
          {posts.length > 0 ? (
            posts.map((post: Post) => {
              return <PostCard {...post} key={post.id} />
            })
          ) : (
            <p>No Post</p>
          )}
        </div>
      )}
    </>
  )
}
