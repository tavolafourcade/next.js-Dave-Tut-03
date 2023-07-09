import getUser from '@/app/lib/getUser'
import getUserPosts from '@/app/lib/getUserPosts'
import { Suspense } from 'react'
import UserPosts from './components/UserPosts'
import type { Metadata } from 'next'

type Params = {
  params: {
    userId: string
  }
}

const generateMetadata = async({ params: {userId}}: Params): Promise<Metadata> => {
  const userData: Promise<User> = getUser(userId)
  const user: User = await userData

  return {
    title: user.name,
    description: `This is the page of ${user.name}`,
  }
}

const UserPage = async ({ params: {userId}}: Params) => {
  // Notice that we are requesting this data in paralell
  const userData: Promise<User> = getUser(userId)
  const userPostsData: Promise<Post[]> = getUserPosts(userId)

  // const [user, userPosts] = await Promise.all([userData, userPostsData])

  //Recommendation 4 - Suspense to show incrementally the data as it loads
  const user = await userData
  return (
    <>
      <h2>{user.name}</h2>
      <br/>
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* @ts-expect-error server component*/}
        <UserPosts promise={userPostsData}/>
      </Suspense>
    </>
  )
}
export { generateMetadata, UserPage }
export default UserPage