import BookCard from './lib/BookCard'
import CommentForm from './lib/CommentForm'
import Components from './lib/Components'
import LikesAvatar from './lib/LikesAvatar'
import Login from './lib/Login'
import Navbar from './lib/Navbar'
import NewPostCard from './lib/NewPostCard'
import PostCard from './lib/PostCard'
import PostCommentCard from './lib/PostCommentCard'
import ProfileHeader from './lib/ProfileHeader'
import Signup from './lib/Signup'
import { Post, PostLike } from './lib/types'

const likes: PostLike[] = [
  {
    id: 'string-1',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'string-2',
    avatar:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'string-3',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  },
  {
    id: 'string-4',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

const user = { id: 'string-id', name: 'John Doe', avatar: '', booksCount: 50 }
const count = { likes: 9, comments: 0 }

const post: Omit<Post, 'comments' | 'likes'> = {
  id: '200',
  content:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, sapiente illo. Quasi, dignissimos! Velit, eum! Harum impedit, laborum facere nihil modi placeat inventore similique repellat cum, voluptatum, earum aliquam laboriosam.',
  medias: [
    'https://images.unsplash.com/photo-1492052722242-2554d0e99e3a?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ],
  user,
  count,
  createdAt: new Date(2023, 10, 18),
}

export default function App() {
  return (
    <>
      <Navbar />
      <p className="mb-10">Top</p>
      <div className="px-3">
        <NewPostCard />
        <Components />
        <Login />
        <Signup />
        <ProfileHeader />
        <PostCard {...post} />
        <LikesAvatar likes={likes} likesCount={100} />
        <CommentForm postId="12345" />
        <PostCommentCard
          id={'1'}
          user={user}
          comment={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quia? Inventore unde placeat earum necessitatibus nesciunt consequuntur, possimus doloremque soluta distinctio tempore officiis repellendus voluptate dolorem provident non cum maiores?'
          }
          createdAt={new Date(2024, 9, 19)}
          count={count}
        />
        <BookCard />
        <p className="mt-32">Bottom</p>
      </div>
    </>
  )
}
