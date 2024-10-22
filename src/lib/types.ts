export type User = {
  id: string,
  name: string,
  avatar: string,
  profile?: UserProfile
  _count: {
    notes: number,
    libraries: number,
    posts: number,
    comments: number,
    postLikes: number,
    commentLikes: number,
  },
  followers: User[],
  following: User[],
  isFollowing: boolean,
  isFollowed: boolean,
}

export type UserProfile = {
  gender: string | undefined;
  birthday: Date | undefined;
  coverPicture: string | undefined;
  timeZone: string | undefined;
  bio: string | undefined;
  favoriteAuthor: string | undefined;
  favoriteBook: string | undefined;
  favoriteGenres: string[];
  centerOfInterest: string[];
  id: string;
  userId: string;
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