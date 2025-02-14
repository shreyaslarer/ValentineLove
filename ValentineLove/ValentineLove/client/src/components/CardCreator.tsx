import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Heart, Mail, Share2, Download, Upload, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

// Enhanced romantic templates
const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?fit=crop&w=1000", // Red roses
  "https://images.unsplash.com/photo-1582507783043-30299314698a?fit=crop&w=1000", // Heart bokeh
  "https://images.unsplash.com/photo-1454944338482-a69bb95894af?fit=crop&w=1000", // Rose petals
  "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?fit=crop&w=1000", // Pink flowers
  "https://images.unsplash.com/photo-1581022295087-35e593704911?fit=crop&w=1000", // Heart hands
  "https://images.unsplash.com/photo-1537274942065-eda9d00a6293?fit=crop&w=1000", // Romantic sunset
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?fit=crop&w=1000", // Love letters
  "https://images.unsplash.com/photo-1499678329028-101435549a4e?fit=crop&w=1000", // Beach sunset
];

interface CardCreatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CardCreator({ isOpen, onClose }: CardCreatorProps) {
  const [selectedImage, setSelectedImage] = useState(BACKGROUND_IMAGES[0]);
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [personalPhoto, setPersonalPhoto] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'background' | 'photo') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'background') {
          setCustomImage(reader.result as string);
          setSelectedImage(reader.result as string);
        } else {
          setPersonalPhoto(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsDownloading(true);
    try {
      const images = Array.from(cardRef.current.getElementsByTagName('img'));
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
        onclone: (clonedDoc) => {
          const element = clonedDoc.getElementById('card-preview');
          if (element) {
            element.style.transform = 'none';
            element.style.borderRadius = '0';
            const overlay = element.querySelector('.gradient-overlay');
            if (overlay instanceof HTMLElement) {
              overlay.style.opacity = '0.7';
            }
          }
        }
      });

      const url = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `valentine-card-for-${recipient || 'valentine'}.png`;
      link.href = url;
      link.click();

      toast({
        title: "Card downloaded!",
        description: "Your Valentine's card has been saved.",
      });
    } catch (error) {
      console.error('Error downloading card:', error);
      toast({
        title: "Download failed",
        description: "There was an error downloading your card.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const generateCardUrl = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      recipient: encodeURIComponent(recipient),
      message: encodeURIComponent(message),
      image: encodeURIComponent(selectedImage),
      photo: personalPhoto ? encodeURIComponent(personalPhoto) : ''
    });
    return `${baseUrl}/share?${params.toString()}`;
  };

  const handleShare = async () => {
    const cardUrl = generateCardUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Valentine's Card for ${recipient}`,
          text: `${recipient}, you have a special Valentine's message! 💝`,
          url: cardUrl
        });
        toast({
          title: "Shared successfully!",
          description: "Your Valentine's card has been shared.",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      await navigator.clipboard.writeText(cardUrl);
      toast({
        title: "Link copied!",
        description: "Share this link with your Valentine.",
      });
    }
  };

  const handleWhatsAppShare = () => {
    const cardUrl = generateCardUrl();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `💝 Special Valentine's Card for ${recipient}! ${cardUrl}`
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailShare = () => {
    const cardUrl = generateCardUrl();
    const emailSubject = `💝 A Special Valentine's Card for ${recipient}`;
    const emailBody = `Dear ${recipient},\n\nYou have a special Valentine's message waiting for you!\n\n${cardUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gradient-to-br from-pink-50 to-red-50">
        <DialogTitle className="sr-only">Create Your Valentine's Card</DialogTitle>

        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-pink-800 flex items-center justify-center gap-2">
                <Heart className="h-8 w-8 fill-pink-500 text-pink-500" />
                Create Your Valentine's Card
                <Heart className="h-8 w-8 fill-pink-500 text-pink-500" />
              </h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-pink-700 mb-2">Choose a Background</h3>
                <div className="grid grid-cols-2 gap-3">
                  {BACKGROUND_IMAGES.map((image) => (
                    <motion.div
                      key={image}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`cursor-pointer rounded-lg overflow-hidden border-4 shadow-sm transition-all ${
                        selectedImage === image ? "border-pink-500 shadow-pink-200" : "border-transparent"
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img 
                        src={image} 
                        alt="Background option" 
                        className="w-full h-32 object-cover"
                        crossOrigin="anonymous"
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 space-y-3">
                  <label className="block">
                    <Button
                      variant="outline"
                      className="w-full flex items-center gap-2"
                      onClick={() => document.getElementById('backgroundUpload')?.click()}
                    >
                      <Upload className="w-4 h-4" />
                      Upload Custom Background
                    </Button>
                    <input
                      id="backgroundUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'background')}
                    />
                  </label>

                  <label className="block">
                    <Button
                      variant="outline"
                      className="w-full flex items-center gap-2"
                      onClick={() => document.getElementById('photoUpload')?.click()}
                    >
                      <Image className="w-4 h-4" />
                      Add Personal Photo
                    </Button>
                    <input
                      id="photoUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'photo')}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <Input
                  placeholder="Recipient's name"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="border-pink-200 focus:border-pink-500"
                />
                <Textarea
                  placeholder="Write your heartfelt message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border-pink-200 focus:border-pink-500 min-h-[120px]"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-lg">
              <h3 className="text-lg font-semibold text-pink-700 mb-4">Preview</h3>
              <div 
                id="card-preview"
                ref={cardRef} 
                className="relative rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-102" 
                style={{ height: '500px' }}
              >
                <motion.img
                  src={selectedImage}
                  alt="Card preview"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  crossOrigin="anonymous"
                />
                {personalPhoto && (
                  <motion.div 
                    className="absolute top-4 right-4 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <img 
                      src={personalPhoto} 
                      alt="Personal photo" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/70 to-transparent gradient-overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white"
                  >
                    <h4 className="text-3xl font-bold mb-4">
                      {recipient ? `Dear ${recipient}` : "Dear Valentine"}
                    </h4>
                    <p className="text-xl leading-relaxed">
                      {message || "Your message will appear here..."}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-end sticky bottom-0 bg-white/80 backdrop-blur-sm p-4 -mx-6 -mb-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              {isDownloading ? (
                "Downloading..."
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Card
                </>
              )}
            </Button>
            <Button
              onClick={handleWhatsAppShare}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Share on WhatsApp
            </Button>
            <Button
              onClick={handleEmailShare}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send via Email
            </Button>
            <Button
              onClick={handleShare}
              className="bg-pink-500 hover:bg-pink-600 text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Card
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}