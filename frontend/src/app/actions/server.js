"use server";

export async function Get_Questions() {
  const response = await fetch("http://127.0.0.1:5000/get_questions");
  const data = await response.json();
  return data;
}

export async function Submit_Questions(answers) {
  console.log(answers);
  const response = await fetch("http://127.0.0.1:5000/submit_quiz", {
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
