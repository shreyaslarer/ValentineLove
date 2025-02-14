
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Heart, Star, BookOpen, Users } from "lucide-react";
import { Link } from "wouter";

const contentSections = [
  {
    title: "Love Stories",
    icon: Heart,
    description: "Real couples sharing their journey of love and connection",
    link: "/stories"
  },
  {
    title: "Self-Love",
    icon: Star,
    description: "Empowering articles about personal growth and self-love",
    link: "/self-love"
  },
  {
    title: "Expert Advice",
    icon: BookOpen,
    description: "Relationship tips from certified counselors and therapists",
    link: "/advice"
  },
  {
    title: "Community",
    icon: Users,
    description: "Join discussions and share experiences with others",
    link: "/community"
  }
];

export default function CuratedContent() {
  return (
    <section className="py-12 bg-pink-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-pink-800 mb-4">Curated Love & Empowerment</h2>
          <p className="text-pink-600">Discover stories, advice, and inspiration for your journey</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contentSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/50 hover:bg-white/80 transition-colors">
                <CardContent className="p-6 text-center">
                  <section.icon className="w-12 h-12 mx-auto mb-4 text-pink-500" />
                  <h3 className="text-xl font-semibold text-pink-800 mb-2">{section.title}</h3>
                  <p className="text-pink-600 mb-4">{section.description}</p>
                  <Button asChild className="bg-pink-500 hover:bg-pink-600">
                    <Link href={section.link}>Explore {section.title}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
