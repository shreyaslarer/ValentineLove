import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  const toggleMusic = () => {
    const audio = document.getElementById("bgMusic") as HTMLAudioElement;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio id="bgMusic" loop>
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
      
      <Button
        onClick={toggleMusic}
        variant="outline"
        size="icon"
        className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5 text-pink-600" />
        ) : (
          <VolumeX className="h-5 w-5 text-pink-600" />
        )}
      </Button>
    </div>
  );
}
