
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Heart } from "lucide-react";

export default function LoveStories() {
  const [stories, setStories] = useState<string[]>([]);
  const [newStory, setNewStory] = useState("");

  const handleSubmit = () => {
    if (newStory.trim()) {
      setStories([...stories, newStory]);
      setNewStory("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Share Your Love Story</h2>
      <Textarea
        value={newStory}
        onChange={(e) => setNewStory(e.target.value)}
        placeholder="Share your romantic story or date idea..."
        className="mb-4"
      />
      <Button onClick={handleSubmit} className="mb-8">
        <Heart className="mr-2 h-4 w-4" /> Share Story
      </Button>
      
      <div className="space-y-4">
        {stories.map((story, index) => (
          <motion.div
            key={index}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-lg"
          >
            {story}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
