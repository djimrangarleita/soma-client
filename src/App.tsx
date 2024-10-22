import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { routes as appRoutes } from './routes'
import { Suspense } from 'react'
import Home from './screen/Home'

export default function App() {
  const location = useLocation()
  const tokenExist = localStorage.getItem('token')

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        {appRoutes.map((route) => {
          if (route.authRequired && !tokenExist) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Navigate replace to="/login" state={{ from: location }} />
                }
              />
            )
          } else {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            )
          }
        })}
      </Routes>
    </Suspense>
  )
}
