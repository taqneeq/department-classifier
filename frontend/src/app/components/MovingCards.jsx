"use client";
import { useState, useEffect, useTransition } from "react";
import GradientProgress from "./GradientProgress";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function MovingCards({ questionsData, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Directly use the hardcoded questions if questionsData is not provided
  const defaultQuestions = {
    data: {
      questions: [
        {
          id: 1,
          options: ["1", "2", "3", "4", "5"],
          text: "I find it easy to connect with new people in different situations.",
        },
        {
          id: 2,
          options: ["1", "2", "3", "4", "5"],
          text: "I often find myself expressing ideas clearly to others.",
        },
        {
          id: 3,
          options: ["1", "2", "3", "4", "5"],
          text: "I enjoy working on creative projects that involve visual elements.",
        },
        {
          id: 4,
          options: ["1", "2", "3", "4", "5"],
          text: "I enjoy solving problems using technical skills or tools.",
        },
        {
          id: 5,
          options: ["1", "2", "3", "4", "5"],
          text: "I often help others see things from my perspective.",
        },
        {
          id: 6,
          options: ["1", "2", "3", "4", "5"],
          text: "I enjoy coming up with new and different ideas.",
        },
        {
          id: 7,
          options: ["1", "2", "3", "4", "5"],
          text: "I approach challenges by finding practical solutions.",
        },
        {
          id: 8,
          options: ["1", "2", "3", "4", "5"],
          text: "I like thinking about new concepts for fun activities or games.",
        },
        {
          id: 9,
          options: ["1", "2", "3", "4", "5"],
          text: "I enjoy building relationships that could be beneficial for future projects.",
        },
        {
          id: 10,
          options: ["1", "2", "3", "4", "5"],
          text: "I'm often involved in discussions where I seek a favorable outcome.",
        },
        {
          id: 11,
          options: ["1", "2", "3", "4", "5"],
          text: "I enjoy helping guests feel comfortable in different settings.",
        },
        {
          id: 12,
          options: ["1", "2", "3", "4", "5"],
          text: "I stay updated on what's popular in social media and online trends.",
        },
        {
          id: 13,
          options: ["1", "2", "3", "4", "5"],
          text: "I often find myself organizing tasks or events effectively.",
        },
        {
          id: 14,
          options: ["1", "2", "3", "4", "5"],
          text: "I frequently commute by driving.",
        },
        {
          id: 15,
          options: ["1", "2", "3", "4", "5"],
          text: "I have a good sense of what makes a social media post engaging.",
        },
        {
          id: 16,
          options: ["1", "2", "3", "4", "5"],
          text: "I like putting my ideas on paper or digital sketches.",
        },
        {
          id: 17,
          options: ["1", "2", "3", "4", "5"],
          text: "I keep myself informed about the latest developments in technology.",
        },
        {
          id: 18,
          options: ["1", "2", "3", "4", "5"],
          text: "I am often involved in managing budgets or financial tasks.",
        },
        {
          id: 19,
          options: ["1", "2", "3", "4", "5"],
          text: "I enjoy writing and crafting compelling messages.",
        },
        {
          id: 20,
          options: ["1", "2", "3", "4", "5"],
          text: "I often think about innovative event ideas related to technology.",
        },
        {
          id: 21,
          options: ["1", "2", "3", "4", "5"],
          text: "I enjoy capturing moments through photography or videography.",
        },
        {
          id: 22,
          options: ["1", "2", "3", "4", "5"],
          text: "I have a network of people involved in various committees.",
        },
      ],
    },
    message: "Questions retrieved successfully",
    success: true,
  };
  
  // Use optional chaining and nullish coalescing to handle undefined values
  const questions =
    questionsData?.data?.questions ?? defaultQuestions.data.questions;

  useEffect(() => {
    console.log("Questions in MovingCards:", questions);
    console.log("QuestionsData received:", questionsData);
  }, [questions, questionsData]);



  // Add a guard clause to ensure questions exist before rendering
  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="w-[90%] max-w-2xl mx-auto p-6 text-white text-center bg-white bg-opacity-5 backdrop-blur-md rounded-2xl font-joganSoft bg-noise">
        <p>
          Loading questions... (Questions available: {questions?.length ?? 0})
        </p>
        <p className="text-sm mt-2">
          Debug info: {JSON.stringify({ questionsData }, null, 2)}
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      startTransition(() => {
        onSubmit(answers).then(() => {
          router.push("/results");
        });
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  return (
    <div className="w-[90%] max-w-2xl text-4xl h-fit mx-auto bg-white bg-opacity-5 backdrop-blur-md rounded-2xl font-joganSoft bg-noise">
      <div
        className={`transition-all duration-300 ${
          isTransitioning
            ? "opacity-0 -translate-x-full"
            : "opacity-100 translate-x-0"
        }`}
      >
        <form className="text-white opacity-80 p-6 flex flex-col gap-y-8">
          <div className="text-2xl md:text-3xl font-joganSoft text-center">
           {currentQuestionIndex+1} {currentQuestion.text}
          </div>
          <GradientProgress
            options={currentQuestion.options.map((option) => ({
              value: option,
              label: option,
            }))}
            value={answers[currentQuestion.id] || ""}
            onChange={handleAnswerChange}
          />
        </form>
      </div>
      <div className="flex gap-x-16 justify-center pb-8 pt-3">
        <button
          className="flex w-12 h-12 md:w-14 md:h-14 p-2 bg-white shadow-lg opacity-100 bg-opacity-5 backdrop-blur-md rounded-xl bg-noise hover:-translate-y-2 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <Image
            src="/Arrow.svg"
            width={50}
            height={50}
            alt="Previous Question"
            className="justify-center align-middle mx-auto my-auto size-6 md:size-10"
          />
        </button>
        <button
          className="flex w-12 h-12 md:w-14 md:h-14 p-2 bg-white shadow-lg opacity-100 bg-opacity-5 backdrop-blur-md rounded-xl bg-noise rotate-180 hover:-translate-y-2 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0"
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
        >
          <Image
            src="/Arrow.svg"
            width={50}
            height={50}
            alt="Next Question"
            className="justify-center align-middle mx-auto my-auto size-6 md:size-10"
          />
        </button>
      </div>
    </div>
  );
}

export default MovingCards;
