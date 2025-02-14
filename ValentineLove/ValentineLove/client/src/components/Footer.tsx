
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Facebook, Twitter, Instagram, Heart, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-pink-50/80 backdrop-blur-sm border-t border-pink-200 mt-16"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-pink-800">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/stories" className="text-pink-600 hover:text-pink-800">Love Stories</Link>
              <Link href="/ideas" className="text-pink-600 hover:text-pink-800">Romantic Ideas</Link>
              <Link href="/quiz" className="text-pink-600 hover:text-pink-800">Love Language Quiz</Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-pink-800">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-pink-600 hover:text-pink-800">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-pink-800">Newsletter</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/50"
              />
              <Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-pink-200 text-center">
          <p className="text-pink-600 flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 fill-pink-500" /> by LoveConnect
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
