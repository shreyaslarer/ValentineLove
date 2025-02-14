
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Heart, Share2 } from "lucide-react";

const influencers = [
  {
    id: 1,
    name: "Sophie Style",
    handle: "@sophiestyle",
    image: "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?w=500",
    content: "Valentine's Day style tip: Mix classic reds with modern silhouettes 💋",
    likes: 2543
  },
  {
    id: 2,
    name: "Love & Life",
    handle: "@lovelife",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500",
    content: "Self-love is the best love! Here's your daily reminder to embrace yourself ✨",
    likes: 3211
  },
  {
    id: 3,
    name: "Romance Daily",
    handle: "@romancedaily",
    image: "https://images.unsplash.com/photo-1522262590532-a991489a0253?w=500",
    content: "Create magic in your relationship with small, thoughtful gestures 💝",
    likes: 1876
  }
];

export default function SocialFeed() {
  return (
    <section className="py-12 bg-gradient-to-r from-pink-50 to-rose-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-pink-800 mb-4">Trending Romance</h2>
          <p className="text-pink-600">Get inspired by our favorite influencers</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {influencers.map((influencer) => (
            <motion.div
              key={influencer.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden h-full">
                <img
                  src={influencer.image}
                  alt={influencer.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-pink-800">{influencer.name}</h3>
                    <p className="text-sm text-pink-600">{influencer.handle}</p>
                  </div>
                  <p className="text-gray-700 mb-4">{influencer.content}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-pink-600">
                      <Heart className="h-4 w-4" />
                      <span>{influencer.likes.toLocaleString()}</span>
                    </div>
                    <Share2 className="h-4 w-4 text-pink-600 cursor-pointer" />
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
