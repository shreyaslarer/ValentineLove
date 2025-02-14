
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, Pen, Sparkles } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import CardCreator from "@/components/CardCreator";
import MusicPlayer from "@/components/MusicPlayer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ValentineCard from "@/components/ValentineCard";
import LoveLetterGenerator from "@/components/LoveLetterGenerator";
import AnimatedBackground from "@/components/AnimatedBackground";
import LoveStories from "@/components/LoveStories";
import DiscussionForum from "@/components/DiscussionForum";
import CuratedContent from "@/components/CuratedContent";
import DIYCraftingCorner from "@/components/DIYCraftingCorner";
import FashionBeautyTips from "@/components/FashionBeautyTips";
import CommunityHub from "@/components/CommunityHub";
import SocialFeed from "@/components/SocialFeed";

export default function Home() {
  const [showCardCreator, setShowCardCreator] = useState(false);
  const [showLetterGenerator, setShowLetterGenerator] = useState(false);

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <FloatingHearts />
      <MusicPlayer />
      <Header />
      
      <main className="container mx-auto px-4 pt-20 space-y-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 animate-fade-up"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-pink-800 mb-4">
            Happy Valentine's Day
          </h1>
          <p className="text-lg text-pink-700 mb-8">
            Create and share beautiful Valentine's cards with your loved ones
          </p>
          
          {/* Primary Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => setShowCardCreator(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white"
            >
              Create a Card
            </Button>
            <Button
              onClick={() => setShowLetterGenerator(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white"
            >
              <Pen className="w-4 h-4 mr-2" />
              Write Love Letter
            </Button>
            <Link href="/quiz">
              <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                <Heart className="w-4 h-4 mr-2" />
                Take Love Language Quiz
              </Button>
            </Link>
            <Link href="/romantic-style">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Discover Your Romantic Style
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Featured Content */}
        <div className="space-y-24">
          {/* Curated Content Section */}
          <section className="bg-pink-50/50 rounded-lg p-8">
            <CuratedContent />
          </section>

          {/* DIY & Fashion Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-pink-50/50 rounded-lg p-8">
              <DIYCraftingCorner />
            </section>
            <section className="bg-pink-50/50 rounded-lg p-8">
              <FashionBeautyTips />
            </section>
          </div>

          {/* Community Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-pink-50/50 rounded-lg p-8">
              <CommunityHub />
            </section>
            <section className="bg-pink-50/50 rounded-lg p-8">
              <SocialFeed />
            </section>
          </div>

          {/* Love Stories & Discussion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-pink-50/50 rounded-lg p-8">
              <LoveStories />
            </section>
            <section className="bg-pink-50/50 rounded-lg p-8">
              <DiscussionForum />
            </section>
          </div>

          {/* Featured Cards */}
          <section className="bg-pink-50/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-pink-800 mb-6 text-center">Featured Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ValentineCard
                image="https://images.unsplash.com/photo-1471530090166-fbe1875839c4"
                message="Love is in the air!"
              />
              <ValentineCard
                image="https://images.unsplash.com/photo-1517867065801-e20f409696b0"
                message="Be my Valentine?"
              />
              <ValentineCard
                image="https://images.unsplash.com/photo-1521478706270-f2e33c203d95"
                message="You make my heart smile"
              />
            </div>
          </section>
        </div>
      </main>

      {/* Modals */}
      <CardCreator isOpen={showCardCreator} onClose={() => setShowCardCreator(false)} />
      <LoveLetterGenerator
        isOpen={showLetterGenerator}
        onClose={() => setShowLetterGenerator(false)}
      />

      <Footer />
    </div>
  );
}
