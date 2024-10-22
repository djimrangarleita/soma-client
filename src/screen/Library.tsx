import BookCard from '../components/BookCard'
import { motion } from 'framer-motion'

export default function Library() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1>Library</h1>
      <BookCard />
    </motion.div>
  )
}
