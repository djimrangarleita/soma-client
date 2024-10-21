import { Navigate, Route, Routes } from 'react-router-dom'
import { routes as appRoutes } from './routes'
import { Suspense, useState } from 'react'
import Home from './screen/Home'

export default function App() {
  const [user, setUser] = useState(undefined)
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        {appRoutes.map((route) => {
          if (route.authRequired && !user) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Navigate replace to="/login" />}
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
