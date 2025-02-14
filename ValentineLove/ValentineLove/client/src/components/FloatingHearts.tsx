import { motion } from "framer-motion";

const Heart = ({ delay = 0 }) => (
  <motion.div
    initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
    animate={{ 
      y: "-100vh",
      x: Math.random() * window.innerWidth + (Math.random() - 0.5) * 200
    }}
    transition={{ 
      duration: 15 + Math.random() * 8,
      type: "tween",
      ease: [0.45, 0, 0.55, 1],
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute text-pink-500 opacity-50"
  >
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  </motion.div>
);

export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <Heart key={i} delay={i * 0.5} />
      ))}
    </div>
  );
}
