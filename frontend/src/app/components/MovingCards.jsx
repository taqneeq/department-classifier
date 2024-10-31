"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientProgress from "./GradientProgress";
import Image from "next/image";

export function MovingCards({ questionsData, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const questions = defaultQuestions.data.questions;

  useEffect(() => {
    console.log("Questions in MovingCards:", questions);
  }, [questions]);

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
      setDirection(1);
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsLoading(true);
      onSubmit(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
      };
    },
  };

  const SpinningSVG = () => {
    return (
      <svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#fff"
      >
        <g
          fill="none"
          fillRule="evenodd"
          transform="translate(1 1)"
          strokeWidth="2"
        >
          <circle cx="22" cy="22" r="6" strokeOpacity="0">
            <animate
              attributeName="r"
              begin="1.5s"
              dur="3s"
              values="6;22"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="strokeOpacity"
              begin="1.5s"
              dur="3s"
              values="1;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-width"
              begin="1.5s"
              dur="3s"
              values="2;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="22" cy="22" r="6" strokeOpacity="0">
            <animate
              attributeName="r"
              begin="3s"
              dur="3s"
              values="6;22"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              begin="3s"
              dur="3s"
              values="1;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-width"
              begin="3s"
              dur="3s"
              values="2;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="22" cy="22" r="8">
            <animate
              attributeName="r"
              begin="0s"
              dur="1.5s"
              values="6;1;2;3;4;5;6"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    );
  };

  return (
    <div className="w-[90%] max-w-2xl mx-auto bg-white bg-opacity-5 backdrop-blur-md rounded-2xl font-joganSoft bg-noise overflow-hidden">
      <div className="relative h-[35vh] md:h-[40vh] my-auto">
        {" "}
        {/* Fixed height container */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentQuestionIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full h-full"
          >
            <div className="text-white opacity-80 p-6 flex flex-col gap-y-8 h-full">
              <div className="text-2xl md:text-3xl font-joganSoft text-center">
                {currentQuestionIndex + 1}. {currentQuestion.text}
              </div>
              <GradientProgress
                options={currentQuestion.options.map((option) => ({
                  value: option,
                  label: option,
                }))}
                value={answers[currentQuestion.id] || ""}
                onChange={handleAnswerChange}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-x-16 justify-center pb-8 pt-3">
        {isLoading ? (
          <button
            className="flex w-12 h-12 md:w-14 md:h-14 p-2 bg-white shadow-lg opacity-100 bg-opacity-5 backdrop-blur-md rounded-xl bg-noise transition-all duration-300 disabled:opacity-50"
            disabled={true}
          >
            <SpinningSVG></SpinningSVG>
          </button>
        ) : (
          <button
            className="flex w-12 h-12 md:w-14 md:h-14 p-2 bg-white shadow-lg opacity-100 bg-opacity-5 backdrop-blur-md rounded-xl bg-noise transition-all duration-300 disabled:opacity-50"
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
        )}

        {isLoading ? (
          <button
            className="flex w-12 h-12 md:w-14 md:h-14 p-2 bg-white shadow-lg opacity-100 bg-opacity-5 backdrop-blur-md rounded-xl bg-noise transition-all duration-300 disabled:opacity-50"
            disabled={true}
          >
            <SpinningSVG></SpinningSVG>
          </button>
        ) : (
          <button
            className="flex w-12 h-12 md:w-14 md:h-14 p-2 bg-white shadow-lg opacity-100 bg-opacity-5 backdrop-blur-md rounded-xl bg-noise rotate-180 transition-all duration-300 disabled:opacity-50"
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
        )}
      </div>
    </div>
  );
}

export default MovingCards;
