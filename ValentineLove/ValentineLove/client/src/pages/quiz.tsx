import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

type Question = {
  id: number;
  text: string;
  options: {
    text: string;
    language: LoveLanguage;
  }[];
};

type LoveLanguage = 
  | "Words of Affirmation"
  | "Acts of Service"
  | "Receiving Gifts"
  | "Quality Time"
  | "Physical Touch";

const questions: Question[] = [
  {
    id: 1,
    text: "What makes you feel most appreciated in a relationship?",
    options: [
      { text: "When my partner tells me they love me", language: "Words of Affirmation" },
      { text: "When my partner helps me with tasks", language: "Acts of Service" },
      { text: "When my partner surprises me with thoughtful gifts", language: "Receiving Gifts" },
      { text: "When my partner gives me their undivided attention", language: "Quality Time" },
      { text: "When my partner holds my hand", language: "Physical Touch" },
    ],
  },
  {
    id: 2,
    text: "How do you prefer to show love to others?",
    options: [
      { text: "By giving compliments and words of encouragement", language: "Words of Affirmation" },
      { text: "By doing helpful things for them", language: "Acts of Service" },
      { text: "By giving them meaningful presents", language: "Receiving Gifts" },
      { text: "By spending one-on-one time with them", language: "Quality Time" },
      { text: "Through hugs and physical affection", language: "Physical Touch" },
    ],
  },
  {
    id: 3,
    text: "What gesture would mean the most to you?",
    options: [
      { text: "A heartfelt letter expressing their feelings", language: "Words of Affirmation" },
      { text: "Them taking care of a task you've been dreading", language: "Acts of Service" },
      { text: "A carefully chosen gift that shows they know you", language: "Receiving Gifts" },
      { text: "A planned date night with no distractions", language: "Quality Time" },
      { text: "A long, warm hug", language: "Physical Touch" },
    ],
  },
  {
    id: 4,
    text: "What would hurt your feelings the most?",
    options: [
      { text: "Harsh words or lack of verbal appreciation", language: "Words of Affirmation" },
      { text: "When someone refuses to help when you need it", language: "Acts of Service" },
      { text: "Forgotten special occasions", language: "Receiving Gifts" },
      { text: "Constantly being interrupted or ignored", language: "Quality Time" },
      { text: "Long periods without physical affection", language: "Physical Touch" },
    ],
  },
  {
    id: 5,
    text: "What's your ideal Valentine's Day?",
    options: [
      { text: "Exchanging romantic love letters", language: "Words of Affirmation" },
      { text: "Your partner cooking your favorite meal", language: "Acts of Service" },
      { text: "Exchanging thoughtful gifts", language: "Receiving Gifts" },
      { text: "An uninterrupted day together", language: "Quality Time" },
      { text: "Cuddling and watching romantic movies", language: "Physical Touch" },
    ],
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<LoveLanguage[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (language: LoveLanguage) => {
    const newAnswers = [...answers, language];
    if (currentQuestion < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAnswers(newAnswers);
      setShowResults(true);
    }
  };

  const calculateResult = (): LoveLanguage => {
    const counts: Record<LoveLanguage, number> = {
      "Words of Affirmation": 0,
      "Acts of Service": 0,
      "Receiving Gifts": 0,
      "Quality Time": 0,
      "Physical Touch": 0,
    };

    answers.forEach((language) => {
      counts[language]++;
    });

    return Object.entries(counts).reduce((a, b) => 
      counts[a as LoveLanguage] > counts[b[0] as LoveLanguage] ? a : b[0]
    ) as LoveLanguage;
  };

  const getResultDescription = (language: LoveLanguage): string => {
    const descriptions: Record<LoveLanguage, string> = {
      "Words of Affirmation": "You value verbal expressions of love and appreciation. Hearing 'I love you' and receiving compliments means the world to you.",
      "Acts of Service": "Actions speak louder than words for you. You feel most loved when others go out of their way to help you or make your life easier.",
      "Receiving Gifts": "You appreciate thoughtful, tangible expressions of love. It's not about the monetary value, but the meaning behind the gifts.",
      "Quality Time": "Your love language is focused attention. You feel most valued when others give you their undivided time and attention.",
      "Physical Touch": "Physical expressions of affection are important to you. Hugs, kisses, and holding hands make you feel most connected.",
    };
    return descriptions[language];
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
                    <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-pink-800 mb-2">
                      What's Your Love Language?
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
                          onClick={() => handleAnswer(option.language)}
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
                    Your Love Language is:
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
