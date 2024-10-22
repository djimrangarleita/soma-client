import { lazy, LazyExoticComponent } from 'react';


const Profile = lazy(() => import('./screen/Profile'))
const Login = lazy(() => import('./screen/Login'))
const Notes = lazy(() => import('./screen/Notes'))
const NotFound = lazy(() => import('./screen/NotFound'))
const PostDetails = lazy(() => import('./screen/PostDetails'))
const PostLikes = lazy(() => import('./screen/PostLikes'))
const SignUp = lazy(() => import('./screen/SignUp'))
const Explore = lazy(() => import('./screen/Explore'))
const Network = lazy(() => import('./screen/Network'))
const Library = lazy(() => import('./screen/Library'))
const Notification = lazy(() => import('./screen/Notification'))

type RouteType = {
  path: string,
  authRequired: boolean,
  component: LazyExoticComponent<() => JSX.Element>,
}

export const routes: RouteType[] = [
  {
    path: '/profile/:id',
    authRequired: false,
    component: Profile,
  },
  {
    path: '/network',
    authRequired: false,
    component: Network,
  },
  {
    path: '/login',
    authRequired: false,
    component: Login,
  },
  {
    path: '/notes',
    authRequired: false,
    component: Notes,
  },
  {
    path: '/posts/:id',
    authRequired: false,
    component: PostDetails,
  },
  {
    path: '/profile/me',
    authRequired: true,
    component: Profile,
  },
  {
    path: '/sign-up',
    authRequired: false,
    component: SignUp,
  },
  {
    path: '/posts/:id/likes',
    authRequired: false,
    component: PostLikes,
  },
  {
    path: '/explore',
    authRequired: false,
    component: Explore,
  },
  {
    path: '/library',
    authRequired: true,
    component: Library,
  },
  {
    path: '/notification',
    authRequired: true,
    component: Notification,
  },
  {
    path: '/*',
    authRequired: false,
    component: NotFound,
  },
]