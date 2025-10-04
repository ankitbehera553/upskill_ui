export async function getExamCardForUser(department) {
  const response = await fetch(`http://localhost:8080/api/examcard/getExamCardForUser?department=${department}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  return data;
}

export const GetExamCardForTeacher = async (teacherEmail) => {
  const response = await fetch(`http://localhost:8080/api/examcard/getExamCardForTeacher?createdBy=${teacherEmail}`, {
    method: "GET",
    headers: {
      "Content-Type": "application.json",
    },
  });

  return response.json();
}

export const CreateExamCard = async (examCard) => {
  try {
    const response = await fetch("http://localhost:8080/api/examcard/createExamCard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(examCard)
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error };
    }

    // ❌ This is wrong
    const data = await response;

    // ✅ Should be:
    // const data = await response.json();

    return { success: true, data };

  } catch (err) {
    console.error("Create user error:", err);
    return { success: false, error: err.message };
  }
};
