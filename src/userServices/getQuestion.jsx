export async function GetQuestion(examId) {
    const response = await fetch(`http://localhost:8080/api/question/getQuestion?examId=${examId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}