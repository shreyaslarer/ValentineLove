
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <motion.div
      className="fixed inset-0 -z-10"
      animate={{
        background: [
          "linear-gradient(45deg, #ffb6c1, #ffc0cb)",
          "linear-gradient(45deg, #ffdab9, #ffe4e1)",
          "linear-gradient(45deg, #ffb6c1, #ffc0cb)",
        ],
      }}
      transition={{
        duration: 20,
        type: "tween",
        ease: "linear",
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}
