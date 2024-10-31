"use client";
import { useState } from "react";
import * as FadeIn from "./components/motion/fade";
import { Submit_Questions } from "./actions/server";
import { MovingCards } from "./components/MovingCards";

export default function Home() {
  const [responses, setResponses] = useState(null);

  const GetResponse = async (answers) => {
    const response = await Submit_Questions(answers);
    console.log("Response received:", response);
    setResponses(response);
  };

  const formatExplanation = (text) => {
    // First, split into sections
    const sections = text.split("\n\n");

    return sections.map((section, index) => {
      // Remove all asterisks from the section
      const cleanSection = section.replace(/\*/g, "");

      if (cleanSection.includes(":")) {
        const [title, ...content] = cleanSection.split(":\n");
        const bulletPoints = content
          .join("\n")
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.startsWith("•") || line.startsWith("-"))
          .map((line) => line.replace(/^[•-]\s*/, "").trim());

        return (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-bold mb-3">{title.trim()}</h3>
            {bulletPoints.length > 0 && (
              <div className="space-y-2 ml-4">
                {bulletPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }
      return (
        <p key={index} className="mb-4">
          {cleanSection}
        </p>
      );
    });
  };

  return (
    <div className="w-full min-h-screen flex justify-center flex-col gap-y-12 items-center  shadow-lg py-20">
      {" "}
      {responses ? (
        <FadeIn.Container>
          <FadeIn.Item>
            <h1 className="w-2/3 bg-none lg:w-2/3 text-3xl md:text-5xl lg:text-6xl mx-auto text-white opacity-80 font-gameplay text-wrap text-center pb-6 leading-wider">
              Here is Our Recommendation for You!
            </h1>
            <div className="w-[90%] max-w-2xl mx-auto bg-white bg-opacity-5 backdrop-blur-md rounded-2xl font-joganSoft bg-noise overflow-x-hidden p-6 space-y-10">
              <h1 className=" text-2xl md:text-3xl font-joganSoft">
                {" "}
                Our Top Recommendation:{" "}
                <span className="font-bold underline">
                  {responses.predictions[0].department}
                </span>
              </h1>
              <h3 className=" text-xl md:text-2xl font-joganSoft underline">
                Why is this department a good fit for you?
              </h3>
              <div className="max-w-none">
                {formatExplanation(responses.explanation)}
              </div>
            </div>
          </FadeIn.Item>
        </FadeIn.Container>
      ) : (
        <FadeIn.Container>
          <FadeIn.Item>
            <h1 className="w-2/3 bg-none lg:w-2/3 text-3xl md:text-5xl lg:text-6xl mx-auto text-white opacity-80 font-gameplay text-wrap text-center pb-6">
              {"Let's find your department"}
            </h1>
          </FadeIn.Item>
          <FadeIn.Item>
            <MovingCards
              onSubmit={async (answers) => {
                GetResponse(answers);
              }}
            />
          </FadeIn.Item>
        </FadeIn.Container>
      )}
    </div>
  );
}
