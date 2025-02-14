import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function SharePage() {
  const [_, setLocation] = useLocation();
  const [cardData, setCardData] = useState({
    recipient: "",
    message: "",
    image: "",
    photo: ""
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const recipient = params.get("recipient");
    const message = params.get("message");
    const image = params.get("image");
    const photo = params.get("photo");

    if (recipient && message && image) {
      setCardData({
        recipient: decodeURIComponent(recipient),
        message: decodeURIComponent(message),
        image: decodeURIComponent(image),
        photo: photo ? decodeURIComponent(photo) : ""
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-red-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="overflow-hidden shadow-2xl">
          <div className="relative">
            <img
              src={cardData.image}
              alt="Valentine's Card"
              className="w-full h-[600px] object-cover"
            />
            {cardData.photo && (
              <div className="absolute top-8 right-8 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={cardData.photo} alt="Personal photo" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-12">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white text-center"
              >
                <Heart className="h-16 w-16 mx-auto mb-6 fill-pink-500 text-pink-500" />
                <h2 className="text-4xl font-bold mb-6">
                  Dear {cardData.recipient}
                </h2>
                <p className="text-2xl mb-8 leading-relaxed">
                  {cardData.message}
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => setLocation("/")}
                    className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-8 py-6"
                  >
                    Create Your Own Card
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}