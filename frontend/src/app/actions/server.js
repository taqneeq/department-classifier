"use server";

export async function Get_Questions() {
  const response = await fetch(`${process.env.API_URL}/get_questions`);
  const data = await response.json();
  return data;
}

export async function Submit_Questions(answers) {
  console.log(answers);
  console.log(process.env.API_URL);
  const response = await fetch(`${process.env.API_URL}/submit_quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answers),
  });

  const data = await response.json();
  console.log(data);
  return data;
}
