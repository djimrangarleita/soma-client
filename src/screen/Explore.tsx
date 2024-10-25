import BookCard from '../components/BookCard'
import { motion } from 'framer-motion'

export default function Explore() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <BookCard />
    </motion.div>
  )
}
