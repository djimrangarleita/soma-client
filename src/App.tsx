import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { routes as appRoutes } from './routes'
import { Suspense } from 'react'
import Home from './screen/Home'
import Spinner from './components/Spinner'
import { motion } from 'framer-motion'

export default function App() {
  const location = useLocation()
  const tokenExist = localStorage.getItem('token')

  return (
    <Suspense fallback={<Spinner />}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
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
      </motion.div>
    </Suspense>
  )
}
