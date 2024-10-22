import { useEffect, useRef, useState } from 'react'
import PostCommentCard from '../components/PostCommentCard'
import requestHandler from '../lib/requestHandler'
import { Post, PostComment } from '../lib/types'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import PostDetailsCard from '../components/PostDetailsCard'
import GenericPostForm from '../components/GenericPostForm'
import ChipsButton from '../components/ChipsButton'
import toast from 'react-hot-toast'
import { clearStorage } from '../lib/storageManager'
import FileUploadInput from '../components/FileUploadInput'
import { motion } from 'framer-motion'

export default function PostDetails() {
  const [post, setPost] = useState<Post | never | null>()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams<{ id: string }>()
  const commentInputRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()
  const localUserId = localStorage.getItem('id')
  const [renderUpdateForm, setRenderUpdateForm] = useState(false)
  const [filePath, setFilePath] = useState<string | undefined>(post?.medias[0])
  const [postComments, setPostComments] = useState<PostComment[]>([])

  const handleFocusComment = () => {
    if (!localUserId) {
      toast.error('Please login to comment on posts', { duration: 5000 })
      navigate('/login')
    }
    commentInputRef.current?.focus()
  }

  const handleCommentSubmit = async (
    content: string
  ): Promise<undefined | never> => {
    try {
      const response = await requestHandler(`comment/${post?.id}`, 'post', {
        text: content,
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
      const comment: PostComment = data
      toast.success('Comment recorded succesfully', { duration: 6000 })
      setPostComments([comment, ...postComments])
    } catch (error) {
      const err = error as Error
      console.error(err.message)
      throw new Error(err.message)
    }
  }

  const handlePostDelete = async () => {
    try {
      const response = await requestHandler(`posts/${post?.id}`, 'delete')
      if (!response.ok) {
        if (response.status === 401) {
          clearStorage()
          navigate('/login')
        } else if (response.status === 403) {
          toast.error('You are not authorized to perform this action', {
            duration: 7000,
          })
        } else {
          toast.error(
            'An error occured, please refresh the page and try again',
            { duration: 8000 }
          )
          const data = await response.json()
          throw new Error(data.message)
        }
      } else {
        toast.success('Post deleted successfully')
        navigate('/')
      }
    } catch (error) {
      const err = error as Error
      console.error(err.message)
    }
  }

  const handleFileUpload = (filePath: string) => {
    setFilePath(filePath)
  }

  const handlePostEdit = async () => {
    setRenderUpdateForm(!renderUpdateForm)
    setFilePath(post?.medias[0])
  }

  const handlePostUpdate = async (text: string) => {
    let data
    if (filePath) {
      data = { text, medias: [filePath] }
    }
    try {
      const response = await requestHandler(
        `posts/${post!.id}`,
        'patch',
        data || { text }
      )
      const dataResponse = await response.json()
      if (!response.ok) {
        console.error(dataResponse)
        if (response.status === 401) {
          clearStorage()
          navigate('/login')
          toast.error('Please login')
          throw new Error('Unauthorized')
        }
        throw new Error('Validation error')
      }
      setPost(dataResponse)
      setRenderUpdateForm(false)
      toast.success('Success, post updated', {
        duration: 5000,
      })
    } catch (error) {
      const err = error as Error
      console.error(err.message)
      throw new Error(err.message)
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await requestHandler(`posts/${id}`)
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message)
        }
        setPost(data)
        setPostComments(data.comments)
      } catch (error) {
        const err = error as Error
        console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [id])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {isLoading ? (
        <Spinner loadingText="Loading..." />
      ) : post ? (
        <>
          {renderUpdateForm ? (
            <>
              <GenericPostForm
                handleAction={handlePostUpdate}
                key="edit-post"
                initialText={post.text}
                placeholder="Edit your post"
              />
              <div className="flex justify-between m-y-6 space-y-2 items-center">
                <FileUploadInput
                  fieldName="Image"
                  handleUploadState={handleFileUpload}
                  key="key-upload-post-file"
                />
                <div className="w-20 h-20 bg-transparent flex items-center justify-center mr-4">
                  {filePath && (
                    <img
                      src={filePath}
                      alt="Image Preview"
                      className={`w-full h-full border border-gray-300 object-cover mr-4`}
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            <PostDetailsCard
              post={post}
              key={post.id}
              handleCommentBoxFocus={handleFocusComment}
            />
          )}

          {post.user.id === localUserId && (
            <div className="flex justify-between items-center my-5">
              <ChipsButton
                text={renderUpdateForm ? 'Cancel' : 'Edit Post'}
                handleAction={handlePostEdit}
              />
              <ChipsButton text="Delete Post" handleAction={handlePostDelete} />
            </div>
          )}
          {!renderUpdateForm && (
            <>
              <div className="my-8 space-y-2">
                {post._count.comments === 0 && (
                  <p className="text text-slate-500">
                    Be the first one to comment this
                  </p>
                )}
                <GenericPostForm
                  handleAction={handleCommentSubmit}
                  key="comment"
                  inputRef={commentInputRef}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                {postComments?.map((comment) => {
                  return (
                    <PostCommentCard
                      {...comment}
                      key={`${comment.id}${comment.user.id}`}
                    />
                  )
                })}
              </div>
            </>
          )}
        </>
      ) : (
        <p>No Post</p>
      )}
    </motion.div>
  )
}
