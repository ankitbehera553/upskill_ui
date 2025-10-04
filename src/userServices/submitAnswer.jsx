export const SubmitAnswer = async (answer) => {
    try{
        const response = await fetch("http://localhost:8080/api/answer/submitAnswer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(answer),
        });
        if (!response.ok) {
            const error = await response.text();
            return { success: false, error };
        }

        const data = await response;
        return { success: true, data };
    } catch (err) {
        console.error("Submit answer error:", err);
        return { success: false, error: err.message };
    }
}

export const GetSubmittedAnswers = async (examCardId) => {
    const response = await fetch(`http://localhost:8080/api/answer/getByExamId?examId=${examCardId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}