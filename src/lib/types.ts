export type User = {
  id: string,
  name: string,
  avatar: string,
  _count: {
    notes: number,
    libraries: number,
    posts: number,
    comments: number,
    postLikes: number,
    commentLikes: number,
  },
}

export type PostLike = {
  user: User,
  createdAt?: Date,
}

type LikesCommentsCount = {
  likes: number,
  comments: number,
}

export type PostComment =  {
  id: string,
  user: User,
  text: string,
  createdAt: Date,
  _count: LikesCommentsCount,
}

export type Post = {
  id: string,
  text: string,
  reference: string,
  medias: string[],
  user: User,
  createdAt: Date,
  _count: LikesCommentsCount,
  comments?: PostComment[]
  likes?: PostLike[],
}

export type PostFormData = {
  content: string
  isNote?: boolean
}