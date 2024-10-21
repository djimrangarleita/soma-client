import Components from '../components/Components'
import UserProfileCard from '../components/UserProfileCard'

export default function Network() {
  const handleFollowEvent = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault()
    console.log('New follow', e)
  }

  return (
    <>
      <UserProfileCard handleAction={handleFollowEvent} />
      <Components />
    </>
  )
}
