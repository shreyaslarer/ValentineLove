
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "wouter";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-pink-50/80 backdrop-blur-sm border-b border-pink-200"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Heart className="h-8 w-8 text-pink-500 fill-pink-500" />
              <span className="text-2xl font-bold text-pink-700">LoveConnect</span>
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/stories">Love Stories</NavLink>
            <NavLink href="/ideas">Romantic Ideas</NavLink>
            <NavLink href="/quiz">Love Language Quiz</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="hidden md:flex items-center gap-2 text-pink-700 hover:text-pink-800 hover:bg-pink-100"
              asChild
            >
              <Link href="/stories/new">
                <Heart className="h-4 w-4" />
                Share Story
              </Link>
            </Button>
            <Button
              className="bg-pink-500 hover:bg-pink-600 text-white"
              asChild
            >
              <Link href="/ideas/explore">Explore Ideas</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <motion.a
        whileHover={{ scale: 1.05 }}
        className={cn(
          "text-pink-700 hover:text-pink-800 font-medium cursor-pointer",
          "transition-colors duration-200"
        )}
      >
        {children}
      </motion.a>
    </Link>
  );
}
