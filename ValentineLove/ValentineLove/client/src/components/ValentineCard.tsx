import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface ValentineCardProps {
  image: string;
  message: string;
}

export default function ValentineCard({ image, message }: ValentineCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0 relative">
          <img
            src={image}
            alt="Valentine"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <Heart className="h-5 w-5 text-pink-200" />
              <p className="text-white font-medium">{message}</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
