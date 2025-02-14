
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Scissors, Gift, PenTool, Heart } from "lucide-react";

const tutorials = [
  {
    id: 1,
    title: "Handmade Love Letters",
    category: "letters",
    thumbnail: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=500",
    description: "Learn the art of creating beautiful handwritten love letters with calligraphy",
    steps: [
      "Choose decorative paper",
      "Practice your handwriting",
      "Write from the heart",
      "Add personal touches",
      "Seal with love"
    ],
    tips: "Use quality paper and take your time with each letter",
  },
  {
    id: 2,
    title: "DIY Valentine's Gift Box",
    category: "gifts",
    thumbnail: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500",
    description: "Create a personalized gift box filled with love",
    steps: [
      "Select a beautiful box",
      "Gather memorable items",
      "Arrange items thoughtfully",
      "Add personal notes",
      "Decorate the exterior"
    ],
    tips: "Include photos, small gifts, and handwritten notes",
  },
  {
    id: 3,
    title: "Romantic Room Decoration",
    category: "decor",
    thumbnail: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500",
    description: "Transform any space into a romantic haven",
    steps: [
      "Plan your layout",
      "Set up mood lighting",
      "Add fresh flowers",
      "Create ambiance",
      "Personal touches"
    ],
    tips: "Use fairy lights, candles, and rose petals for maximum effect",
  }
];

export default function DIYCraftingCorner() {
  const [selectedTutorial, setSelectedTutorial] = useState<typeof tutorials[0] | null>(null);

  return (
    <section className="py-12 bg-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-pink-800 mb-4">DIY & Crafting Corner</h2>
          <p className="text-pink-600">Create something special for your loved ones</p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex justify-center mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="letters">Letters</TabsTrigger>
            <TabsTrigger value="gifts">Gifts</TabsTrigger>
            <TabsTrigger value="decor">Decor</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="overflow-hidden cursor-pointer" onClick={() => setSelectedTutorial(tutorial)}>
                  <img src={tutorial.thumbnail} alt={tutorial.title} className="w-full h-48 object-cover" />
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold text-pink-800 mb-2">{tutorial.title}</h3>
                    <p className="text-pink-600">{tutorial.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {["letters", "gifts", "decor"].map((category) => (
            <TabsContent key={category} value={category} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tutorials
                .filter((t) => t.category === category)
                .map((tutorial) => (
                  <motion.div
                    key={tutorial.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="overflow-hidden cursor-pointer" onClick={() => setSelectedTutorial(tutorial)}>
                      <img src={tutorial.thumbnail} alt={tutorial.title} className="w-full h-48 object-cover" />
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold text-pink-800 mb-2">{tutorial.title}</h3>
                        <p className="text-pink-600">{tutorial.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </TabsContent>
          ))}
        </Tabs>

        <Dialog open={!!selectedTutorial} onOpenChange={() => setSelectedTutorial(null)}>
          <DialogContent className="max-w-2xl">
            {selectedTutorial && (
              <div className="p-4">
                <img 
                  src={selectedTutorial.thumbnail} 
                  alt={selectedTutorial.title} 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h2 className="text-2xl font-bold text-pink-800 mb-4">{selectedTutorial.title}</h2>
                <p className="text-pink-600 mb-6">{selectedTutorial.description}</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-pink-800 mb-3">Steps</h3>
                    <ol className="list-decimal list-inside space-y-2">
                      {selectedTutorial.steps.map((step, index) => (
                        <li key={index} className="text-pink-600">{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-pink-800 mb-3">Pro Tips</h3>
                    <p className="text-pink-600">{selectedTutorial.tips}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
