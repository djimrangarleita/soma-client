export type User = {
  id: string,
  name: string,
  avatar: string,
  booksCount: number,
}

export type PostLike = Omit<User, 'name' | 'booksCount'>

type LikesCommentsCount = {
  likes: number,
  comments: number,
}

export type PostComment =  {
  id: string,
  user: User,
  comment: string,
  createdAt: Date,
  count: LikesCommentsCount,
}

export type Post = {
  id: string,
  content: string,
  medias: string[],
  user: User,
  createdAt: Date,
  count: LikesCommentsCount,
  comments: PostComment[]
  likes: PostLike[],
}

export type PostFormData = {
  content: string
  isNote?: boolean
}