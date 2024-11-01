"use server";

export async function Get_Questions() {
  const response = await fetch(`${process.env.API_URL}/get_questions`);
  const data = await response.json();
  return data;
}

export async function Submit_Questions(answers) {
  console.log(answers);
  console.log(process.env.API_URL);

  // Check if all answers are '5'
  const allFives = Object.values(answers).every((value) => value === "5");

  // Check if all answers are '1'
  const allOnes = Object.values(answers).every((value) => value === "1");

  const baseResponse = {
    confidence_scores: {
      rag_score: 0,
      rf_scores: {
        "Digital Creatives": 0.19,
        "In House": 0.14,
        "Tech And Collab": 0.22,
      },
    },
    explanation: "",
    predictions: [
      { confidence: 6.6, department: "Tech And Collab", source: "Hybrid" },
      { confidence: 5.7, department: "Digital Creatives", source: "Hybrid" },
      { confidence: 4.2, department: "In House", source: "Hybrid" },
    ],
  };

  if (allFives) {
    baseResponse.predictions[0].department = "Supercore";
    baseResponse.explanation =
      "All answers were 5, indicating a aap toh sabhi mai ekdum ache ho, toh why didnt you apply for supercore?";
    return baseResponse;
  } else if (allOnes) {
    baseResponse.predictions[0].department = "Logistics";
    baseResponse.explanation = `Logistics Department Fit:
• Plays a crucial role in ensuring the smooth execution of Taqneeq
• Manages all aspects of event planning and coordination
• Creates a seamless experience for participants and attendees

Key Strengths:
• Excellent organizational and planning skills
• Strong attention to detail
• Ability to manage multiple tasks efficiently

Growth Opportunities:
• Develop project management and event planning expertise
• Enhance problem-solving skills in fast-paced environments
• Build a strong network across various departments and external vendors

`;
    return baseResponse;
  }

  try {
    // If neither condition is met, proceed with the API call
    const response = await fetch(`${process.env.API_URL}/submit_quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      throw new Error("API call failed");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error submitting quiz:", error);
    baseResponse.predictions[0].department = "Tech And Collab";
        baseResponse.explanation = `Tech And Collab Fit:
• This team is at the heart of Taqneeq's technical innovation
• Responsible for developing the festival's digital infrastructure
• Focuses on solving complex challenges

Key Skills:
• Strong technical proficiency
• Creative problem-solving abilities
• Excellent teamwork and communication skills

Growth Opportunities:
• Gain hands-on experience with cutting-edge web technologies
• Develop expertise in both frontend and backend development
• Enhance your project management and leadership skills
`;
        return baseResponse;
  }
}
