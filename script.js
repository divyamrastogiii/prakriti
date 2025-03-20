import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const questions = [
  { question: "What is your body frame?", options: ["Thin and light", "Medium and muscular", "Large and sturdy"] },
  { question: "How is your skin type?", options: ["Dry and rough", "Warm and oily", "Cool and moist"] },
  { question: "How do you handle stress?", options: ["Anxious and restless", "Irritable and impatient", "Calm and unperturbed"] },
  { question: "What is your sleep pattern?", options: ["Light sleeper with interruptions", "Moderate sleep", "Deep and prolonged sleep"] },
  { question: "How is your digestion?", options: ["Tendency towards gas and bloating", "Strong digestion but prone to acidity", "Slow digestion, prone to heaviness"] },
];

export default function PrakritiChecker() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [result, setResult] = useState(null);

  const handleAnswer = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const calculatePrakriti = () => {
    const vata = answers.filter((ans) => ans === "Thin and light" || ans === "Dry and rough" || ans === "Anxious and restless").length;
    const pitta = answers.filter((ans) => ans === "Medium and muscular" || ans === "Warm and oily" || ans === "Irritable and impatient").length;
    const kapha = answers.filter((ans) => ans === "Large and sturdy" || ans === "Cool and moist" || ans === "Calm and unperturbed").length;
    
    if (vata > pitta && vata > kapha) setResult("🌿 Your dominant Prakriti is Vata. Stay grounded and warm!");
    else if (pitta > vata && pitta > kapha) setResult("🔥 Your dominant Prakriti is Pitta. Keep cool and balanced!");
    else if (kapha > vata && kapha > pitta) setResult("🌊 Your dominant Prakriti is Kapha. Stay active and light!");
    else setResult("✨ You have a mixed Prakriti type. Maintain harmony between elements!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gradient-to-br from-blue-100 to-purple-200 shadow-xl rounded-2xl">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-purple-800">🌿 Prakriti Assessment 🌿</h1>
      {questions.map((q, index) => (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: index * 0.2 }}
        >
          <Card className="mb-4 p-4 bg-white rounded-xl shadow-md">
            <CardContent>
              <p className="font-semibold text-lg text-gray-700">{q.question}</p>
              <div className="mt-3 space-y-2">
                {q.options.map((option, i) => (
                  <Button 
                    key={i} 
                    variant={answers[index] === option ? "default" : "outline"} 
                    onClick={() => handleAnswer(index, option)}
                    className={`w-full font-semibold rounded-lg transition duration-300 ${answers[index] === option ? "bg-purple-500 text-white" : "bg-purple-100 hover:bg-purple-300 text-purple-900"}`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 1 }}
      >
        <Button onClick={calculatePrakriti} className="w-full mt-6 bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300">✨ Get My Prakriti ✨</Button>
      </motion.div>
      {result && <motion.p 
        className="mt-6 text-center font-bold text-xl text-purple-900 bg-white p-4 rounded-xl shadow-lg"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5 }}
      >{result}</motion.p>}
    </div>
  );
}
