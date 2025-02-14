import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Heart, Pen, Copy } from "lucide-react";

const LETTER_TEMPLATES = [
  {
    id: "romantic",
    name: "Romantic Love",
    template: "My dearest [name],\n\nFrom the moment I first saw you, my heart knew you were special. [custom_message]\n\nYou mean everything to me, and I cherish every moment we spend together.\n\nForever yours,\n[sender_name]"
  },
  {
    id: "playful",
    name: "Playful & Fun",
    template: "Hey [name]! 💝\n\nGuess what? You've made my heart skip a beat! [custom_message]\n\nYou're the sweetest person I know, and you always make me smile.\n\nXOXO,\n[sender_name]"
  },
  {
    id: "poetic",
    name: "Poetic Love",
    template: "Dearest [name],\n\nLike the stars that light up the night sky,\nYou illuminate my world with your presence.\n[custom_message]\n\nWith all my love,\n[sender_name]"
  }
];

interface LoveLetterGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoveLetterGenerator({ isOpen, onClose }: LoveLetterGeneratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(LETTER_TEMPLATES[0].id);
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const { toast } = useToast();

  const getFormattedLetter = () => {
    const template = LETTER_TEMPLATES.find(t => t.id === selectedTemplate)?.template || "";
    return template
      .replace("[name]", recipientName || "[name]")
      .replace("[sender_name]", senderName || "[sender_name]")
      .replace("[custom_message]", customMessage || "[Write your personal message here]");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFormattedLetter());
      toast({
        title: "Copied!",
        description: "Your love letter has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy the letter. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-6 bg-gradient-to-br from-pink-50 to-red-50">
        <DialogTitle className="text-2xl font-bold text-pink-800 flex items-center gap-2">
          <Heart className="h-6 w-6 text-pink-500" />
          Love Letter Generator
        </DialogTitle>

        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-pink-700">Choose a Template</label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {LETTER_TEMPLATES.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            <Input
              placeholder="Recipient's Name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="border-pink-200"
            />
            <Input
              placeholder="Your Name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="border-pink-200"
            />
            <Textarea
              placeholder="Write your personal message..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="min-h-[100px] border-pink-200"
            />
          </div>

          <div className="bg-white rounded-lg p-4 shadow-inner">
            <h3 className="text-sm font-medium text-pink-700 mb-2">Preview</h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="whitespace-pre-wrap font-serif text-gray-800"
            >
              {getFormattedLetter()}
            </motion.div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleCopy}
              className="bg-pink-500 hover:bg-pink-600 text-white"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Letter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
