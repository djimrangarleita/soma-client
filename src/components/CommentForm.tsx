import { LegacyRef } from 'react'
import GenericPostForm from './GenericPostForm'

interface CommentFormProps {
  postId: string
  inputRef?: LegacyRef<HTMLTextAreaElement> | undefined
}

export default function CommentForm({ postId, inputRef }: CommentFormProps) {
  const handleSubmit = async (comment: string) => {
    const response = await fetch(`/api/comments/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    })
    return response
  }

  return <GenericPostForm handleAction={handleSubmit} inputRef={inputRef} />
}
