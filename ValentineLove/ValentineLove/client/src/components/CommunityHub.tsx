
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { Card } from "./ui/card";
import { Heart, Share2, MessageCircle } from "lucide-react";

interface Post {
  id: number;
  username: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  hashtags: string[];
}

export default function CommunityHub() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: "Sarah_Love",
      content: "Just had the most amazing Valentine's Day! He surprised me with a homemade dinner 💝",
      image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=500",
      likes: 45,
      comments: 12,
      hashtags: ["#valentines", "#love", "#romance"]
    },
    {
      id: 2,
      username: "Jessica_Style",
      content: "Fashion tip: Red doesn't have to be cliché! Mix it with pink and gold for a modern V-day look ✨",
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500",
      likes: 67,
      comments: 15,
      hashtags: ["#fashion", "#style", "#valentinestyle"]
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handlePost = () => {
    if (newPost.trim()) {
      const hashtags = newPost.match(/#[a-zA-Z0-9]+/g) || [];
      setPosts([{
        id: Date.now(),
        username: "User",
        content: newPost,
        image: imageUrl,
        likes: 0,
        comments: 0,
        hashtags
      }, ...posts]);
      setNewPost("");
      setImageUrl("");
    }
  };

  return (
    <section className="py-12 bg-gradient-to-r from-pink-50 to-rose-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-pink-800 mb-4">Community Stories</h2>
          <p className="text-pink-600">Share your romantic moments and connect with others</p>
        </motion.div>

        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <Textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your story or ask for advice... Use #hashtags!"
              className="min-h-[100px]"
            />
            <Input
              type="url"
              placeholder="Add an image URL (optional)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Button onClick={handlePost} className="w-full md:w-auto">
              Share Your Story
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar />
                    <span className="font-semibold text-pink-800">{post.username}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.hashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-sm text-pink-600 bg-pink-100 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-6">
                    <Button variant="ghost" size="sm" className="text-pink-600">
                      <Heart className="h-4 w-4 mr-2" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-pink-600">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-pink-600">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
