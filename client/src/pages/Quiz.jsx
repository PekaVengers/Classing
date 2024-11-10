/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Timer } from "lucide-react";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Quiz = ({ question, onNextQuestion, isLast }) => {
  const INITIAL_TIME = question.time;
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  console.log("🚀 ~ Quiz ~ isLast:", isLast);

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearInterval(timer);
  }, [timeLeft, isTimerRunning]);

  const handleTimeUp = () => {
    setIsTimerRunning(false);
    setShowResult(true);
    setIsCorrect(false);
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      onNextQuestion(); // Move to the next question after the animation
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimePercentage = () => {
    return (timeLeft / INITIAL_TIME) * 100;
  };

  const handleSubmit = () => {
    setIsTimerRunning(false);
    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      console.log("🚀 ~ setTimeout ~ correct:", correct);
      if (correct) {
        onNextQuestion();
      } else {
        resetQuiz();
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setShowResult(false);
    setSelectedAnswer("");
    setTimeLeft(INITIAL_TIME);
    setIsTimerRunning(true);
  };

  // Calculate warning threshold (20% of initial time)
  const warningThreshold = INITIAL_TIME * 0.2;

  if (isLast)
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Quiz Complete!</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
        {/* Timer */}
        <div className="flex items-center justify-center space-x-2">
          <Timer
            className={`w-6 h-6 ${
              timeLeft <= warningThreshold
                ? "text-red-500 animate-pulse"
                : "text-green-500"
            }`}
          />
          <span
            className={`text-xl font-bold ${
              timeLeft <= warningThreshold ? "text-red-500" : "text-green-500"
            }`}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              timeLeft <= warningThreshold ? "bg-red-500" : "bg-green-500"
            }`}
            style={{
              width: `${getTimePercentage()}%`,
              transition: "width 1s linear",
            }}
          ></div>
        </div>
        {/* Question */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">{question.text}</h2>
          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedAnswer(option);
                  setShowResult(false);
                }}
                disabled={!isTimerRunning}
                className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                  selectedAnswer === option
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                } ${!isTimerRunning && "opacity-50 cursor-not-allowed"}`}
              >
                {option}
              </button>
            ))}
          </div>
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer || !isTimerRunning}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
              selectedAnswer && isTimerRunning
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            Submit Answer
          </button>
          {/* Result Message */}
          {showResult && (
            <div
              className={`flex items-center justify-center p-4 rounded-lg ${
                showAnimation ? "animate-bounce" : ""
              } ${
                isCorrect
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    <span>Fantastic! That&apos;s correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6" />
                    <span>
                      {timeLeft === 0 ? "Time's up!" : "Try again next time!"}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const QuizWrapper = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLast, setIsLast] = useState(false);

  const handleNextQuestion = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + 1 === questions.length) setIsLast(true);
      return prevIndex + 1;
    });
  };

  if (currentIndex >= questions.length) {
    return (
      <div className="text-primary flex justify-center items-center min-h-screen bg-gray-900">
        <div className="max-w-4xl rounded-md">
          <Alert className="border-2 border-black text-white">
            <Terminal className="h-4 w-4" />
            <AlertTitle className="font-semibold">Quiz Complete!</AlertTitle>
            <AlertDescription>
              You can now proceed to the next page or view your progress.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  } else {
    return (
      <Quiz
        key={questions[currentIndex]._id}
        question={questions[currentIndex]}
        onNextQuestion={handleNextQuestion}
        isLast={isLast}
      />
    );
  }
};

export default QuizWrapper;
