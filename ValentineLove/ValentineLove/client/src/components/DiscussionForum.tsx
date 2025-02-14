
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar } from "./ui/avatar";
import { Card } from "./ui/card";

export default function DiscussionForum() {
  const [posts, setPosts] = useState<Array<{id: number, text: string, likes: number}>>([]);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([...posts, { id: Date.now(), text: newPost, likes: 0 }]);
      setNewPost("");
    }
  };

  const handleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? {...post, likes: post.likes + 1} : post
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Relationship Discussion Forum</h2>
      <Card className="p-4 mb-4">
        <Textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your relationship advice or ask for help..."
          className="mb-4"
        />
        <Button onClick={handlePost}>Share Advice</Button>
      </Card>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-start gap-4">
              <Avatar />
              <div className="flex-1">
                <p className="mb-2">{post.text}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleLike(post.id)}
                >
                  ❤️ {post.likes}
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
