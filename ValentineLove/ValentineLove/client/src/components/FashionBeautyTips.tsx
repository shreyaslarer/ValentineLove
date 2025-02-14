
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const fashionTips = [
  {
    id: 1,
    category: "outfit",
    title: "Classic Date Night Look",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500",
    description: "A timeless red dress paired with elegant accessories",
    tips: [
      "Choose a flattering silhouette",
      "Add delicate jewelry",
      "Classic red lipstick",
      "Comfortable yet stylish heels"
    ]
  },
  {
    id: 2,
    category: "beauty",
    title: "Romantic Makeup Look",
    image: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=500",
    description: "Soft glam makeup perfect for Valentine's",
    tips: [
      "Glowing skin prep",
      "Soft pink eyeshadow",
      "Long-lasting lip color",
      "Fluttery lashes"
    ]
  },
  {
    id: 3,
    category: "outfit",
    title: "Casual Chic Style",
    image: "https://images.unsplash.com/photo-1529739121416-921f4dae728d?w=500",
    description: "Perfect for a daytime Valentine's date",
    tips: [
      "High-waisted jeans",
      "Silk blouse or sweater",
      "Statement accessories",
      "Comfortable flats"
    ]
  }
];

export default function FashionBeautyTips() {
  const [selectedTip, setSelectedTip] = useState<typeof fashionTips[0] | null>(null);

  return (
    <section className="py-12 bg-gradient-to-r from-pink-50 to-rose-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-pink-800 mb-4">Fashion & Beauty Tips</h2>
          <p className="text-pink-600">Look and feel your best this Valentine's</p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex justify-center mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="outfit">Outfits</TabsTrigger>
            <TabsTrigger value="beauty">Beauty</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fashionTips.map((tip) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="overflow-hidden cursor-pointer" onClick={() => setSelectedTip(tip)}>
                  <img src={tip.image} alt={tip.title} className="w-full h-64 object-cover" />
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold text-pink-800 mb-2">{tip.title}</h3>
                    <p className="text-pink-600">{tip.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {["outfit", "beauty"].map((category) => (
            <TabsContent key={category} value={category} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fashionTips
                .filter((t) => t.category === category)
                .map((tip) => (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="overflow-hidden cursor-pointer" onClick={() => setSelectedTip(tip)}>
                      <img src={tip.image} alt={tip.title} className="w-full h-64 object-cover" />
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold text-pink-800 mb-2">{tip.title}</h3>
                        <p className="text-pink-600">{tip.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </TabsContent>
          ))}
        </Tabs>

        <Dialog open={!!selectedTip} onOpenChange={() => setSelectedTip(null)}>
          <DialogContent className="max-w-2xl">
            {selectedTip && (
              <div className="p-4">
                <img 
                  src={selectedTip.image} 
                  alt={selectedTip.title} 
                  className="w-full h-80 object-cover rounded-lg mb-6"
                />
                <h2 className="text-2xl font-bold text-pink-800 mb-4">{selectedTip.title}</h2>
                <p className="text-pink-600 mb-6">{selectedTip.description}</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-pink-800 mb-3">Style Tips</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {selectedTip.tips.map((tip, index) => (
                        <li key={index} className="text-pink-600">{tip}</li>
                      ))}
                    </ul>
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
