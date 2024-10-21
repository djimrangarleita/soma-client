import { useEffect, useRef, useState } from 'react'
import CommentForm from '../components/CommentForm'
import PostCommentCard from '../components/PostCommentCard'
import requestHandler from '../lib/requestHandler'
import { Post } from '../lib/types'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom'
import PostDetailsCard from '../components/PostDetailsCard'

export default function PostDetails(focusComment: boolean = false) {
  const [post, setPost] = useState<Post | never | null>()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams<{ id: string }>()
  const commentInputRef = useRef<HTMLTextAreaElement>(null)

  const handleFocusComment = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log('I was called', e)
    commentInputRef.current?.focus()
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await requestHandler(`posts/${id}`)
        console.log(data)
        setPost(data)
        if (focusComment) commentInputRef.current?.focus()
      } catch (error) {
        const err = error as Error
        console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [id, focusComment])

  return (
    <>
      {isLoading ? (
        <Spinner loadingText="Loading..." />
      ) : post ? (
        <>
          <PostDetailsCard
            post={post}
            key={post.id}
            handleCommentBoxFocus={handleFocusComment}
          />
          <div className="my-5 space-y-2">
            <CommentForm postId={post.id} inputRef={commentInputRef} />
          </div>

          <div className="flex flex-col gap-y-2">
            {post.comments?.map((comment) => {
              return <PostCommentCard {...comment} key={comment.id} />
            })}
          </div>
        </>
      ) : (
        <p>No Post</p>
      )}
    </>
  )
}
