
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";

type Question = {
  id: number;
  text: string;
  options: {
    text: string;
    style: RomanticStyle;
  }[];
};

type RomanticStyle = 
  | "Classic Romantic"
  | "Adventure Seeker"
  | "Modern Minimalist"
  | "Hopeless Romantic"
  | "Practical Romantic";

const questions: Question[] = [
  {
    id: 1,
    text: "How would you plan your ideal date night?",
    options: [
      { text: "Candlelit dinner at an elegant restaurant", style: "Classic Romantic" },
      { text: "Spontaneous road trip to a new place", style: "Adventure Seeker" },
      { text: "Netflix and takeout at home", style: "Modern Minimalist" },
      { text: "Recreating a scene from a romantic movie", style: "Hopeless Romantic" },
      { text: "Cooking dinner together at home", style: "Practical Romantic" },
    ],
  },
  {
    id: 2,
    text: "What's your idea of a perfect Valentine's gift?",
    options: [
      { text: "Roses and fine jewelry", style: "Classic Romantic" },
      { text: "Experience vouchers for activities", style: "Adventure Seeker" },
      { text: "A thoughtful, personalized card", style: "Modern Minimalist" },
      { text: "A grand gesture of love", style: "Hopeless Romantic" },
      { text: "Something useful they've been wanting", style: "Practical Romantic" },
    ],
  },
  {
    id: 3,
    text: "How do you express your love daily?",
    options: [
      { text: "Regular date nights and gifts", style: "Classic Romantic" },
      { text: "Planning surprises and new experiences", style: "Adventure Seeker" },
      { text: "Quality time and meaningful conversations", style: "Modern Minimalist" },
      { text: "Love notes and romantic gestures", style: "Hopeless Romantic" },
      { text: "Acts of service and support", style: "Practical Romantic" },
    ],
  },
];

export default function RomanticStyleQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<RomanticStyle[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (style: RomanticStyle) => {
    const newAnswers = [...answers, style];
    if (currentQuestion < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAnswers(newAnswers);
      setShowResults(true);
    }
  };

  const calculateResult = (): RomanticStyle => {
    const counts: Record<RomanticStyle, number> = {
      "Classic Romantic": 0,
      "Adventure Seeker": 0,
      "Modern Minimalist": 0,
      "Hopeless Romantic": 0,
      "Practical Romantic": 0,
    };

    answers.forEach((style) => {
      counts[style]++;
    });

    return Object.entries(counts).reduce((a, b) => 
      counts[a as RomanticStyle] > counts[b[0] as RomanticStyle] ? a : b[0]
    ) as RomanticStyle;
  };

  const getResultDescription = (style: RomanticStyle): string => {
    const descriptions: Record<RomanticStyle, string> = {
      "Classic Romantic": "You appreciate timeless romance - candlelit dinners, roses, and traditional romantic gestures are your style.",
      "Adventure Seeker": "For you, love is about creating exciting memories together and trying new things.",
      "Modern Minimalist": "You value authentic connections over grand gestures, finding romance in life's simple moments.",
      "Hopeless Romantic": "You believe in fairy-tale romance and aren't afraid to show it with grand romantic gestures.",
      "Practical Romantic": "You show love through thoughtful actions and practical support, making everyday life special.",
    };
    return descriptions[style];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-red-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-xl">
            <CardContent className="p-6">
              {!showResults ? (
                <>
                  <div className="text-center mb-8">
                    <Sparkles className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-pink-800 mb-2">
                      What's Your Romantic Style?
                    </h1>
                    <p className="text-pink-600">
                      Question {currentQuestion + 1} of {questions.length}
                    </p>
                  </div>

                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">
                      {questions[currentQuestion].text}
                    </h2>
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option) => (
                        <Button
                          key={option.text}
                          onClick={() => handleAnswer(option.style)}
                          className="w-full text-left justify-start bg-white hover:bg-pink-50 text-gray-700 border border-pink-200"
                          variant="outline"
                        >
                          {option.text}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <Heart className="h-16 w-16 text-pink-500 mx-auto mb-6 fill-current" />
                  <h2 className="text-3xl font-bold text-pink-800 mb-4">
                    Your Romantic Style is:
                  </h2>
                  <h3 className="text-2xl font-semibold text-pink-600 mb-6">
                    {calculateResult()}
                  </h3>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    {getResultDescription(calculateResult())}
                  </p>
                  <Button
                    onClick={() => {
                      setCurrentQuestion(0);
                      setAnswers([]);
                      setShowResults(false);
                    }}
                    className="bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    Take Quiz Again
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
