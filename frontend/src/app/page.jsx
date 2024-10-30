import Image from "next/image";
import GradientProgress from "./components/GradientProgress";
import * as FadeIn from "./components/motion/fade";
import { Get_Questions, Submit_Questions } from "./actions/server";
import { MovingCards } from "./components/MovingCards";

export default async function Home() {
  const questions = {
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
  return (
    <div className="w-full h-full flex justify-center flex-col gap-y-12 items-center  shadow-lg">
      {" "}
      <FadeIn.Container>
        <FadeIn.Item>
          <h1 className="w-2/3 bg-none lg:w-2/3 text-3xl md:text-5xl lg:text-6xl mx-auto text-white opacity-80 font-gameplay text-wrap text-center pb-6">
            Let's find your department
          </h1>
        </FadeIn.Item>
        <FadeIn.Item>
          <MovingCards
            questionsData={questions}
            onSubmit={async (answers) => {
              "use server";
              await Submit_Questions(answers);
            }}
          />
        </FadeIn.Item>
      </FadeIn.Container>
    </div>
  );
}
