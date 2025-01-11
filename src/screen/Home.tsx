import NewPostCard from '../components/NewPostCard'
import { Post } from '../lib/types'
import PostCard from '../components/PostCard'
import requestHandler from '../lib/requestHandler'
import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [index, setIndex] = useState(2)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await requestHandler('posts')
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message)
        }
        setPosts(data.posts)
      } catch (error) {
        const err = error as Error
        console.error(err.message)
      }
    }
    fetchPosts()
  }, [])

  const handleUpdate = (post: Post | undefined) => {
    if (post) {
      setPosts([post, ...posts])
    }
  }

  const fetchMoreData = () => {
    const fetchPosts = async () => {
      try {
        const response = await requestHandler(`posts?page=${index}`)
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message)
        }
        setPosts((prevPosts) => [...prevPosts, ...data.posts])
        setHasMore(data.meta.currentPage < data.meta.totalPages)
        setIndex((prevIndex) => prevIndex + 1)
      } catch (error) {
        const err = error as Error
        console.error(err.message)
      }
    }
    fetchPosts()
  }

  return (
    <InfiniteScroll
      className="flex flex-col gap-6"
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Spinner loadingText="Loading..." />}
      endMessage={
        <div className="flex items-center justify-center text-xl m-5 space-y-6 text-slate-500 mx-auto">
          <p>End</p>
        </div>
      }
    >
      <NewPostCard handlePostsUpdate={handleUpdate} />
      {posts.length > 0 ? (
        posts.map((post: Post) => {
          return <PostCard {...post} key={`${post.id}${Date.now()}`} />
        })
      ) : (
        <p>No Post</p>
      )}
    </InfiniteScroll>
  )
}
