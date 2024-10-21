import BookCard from '../components/BookCard'
import UserProfileCard from '../components/UserProfileCard'

export default function Explore() {
  const handleFollowEvent = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault()
    console.log('New follow', e)
  }

  return (
    <>
      <UserProfileCard handleAction={handleFollowEvent} />
      <BookCard />
    </>
  )
}
