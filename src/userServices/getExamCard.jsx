export async function GetExamCard() {
  const response = await fetch("http://localhost:8080/api/examcard/getAllExamCard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  return data;
}
