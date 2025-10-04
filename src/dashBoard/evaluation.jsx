import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import './evaluation.css'

export function Evaluation() {
    const location = useLocation();
    const { submission, exam } = location.state;
    // console.log("In Evaluation Page", submission, exam);
    const [totalMarks, setTotalMarks] = useState(0);
    const navigate = useNavigate();

    function studentMark() {
        console.log("Submitted Details", submission.name, submission.rollno, submission.email, exam.examId, totalMarks);
        // navigate('/viewSubmitted')
    }

    return (
        <>
            <h1>Evaluation Page</h1>
            <p>Subject: {exam.subject}</p>
            <p>Exam: {exam.examName}</p>
            <p>Submitted by: {submission.name} (Roll No: {submission.rollno})</p>
            <div className="answerLayout">
                {exam.questions && exam.questions.map((q, index) => (
                    <div key={index}>
                        <h3>Q{index + 1}: {exam.questions[index]}</h3>
                        <p>
                            <b>Answer:</b> 
                            {submission.answers ? submission.answers[index] : "Not answered"}
                        </p>
                    </div>
                ))}
            </div>
            <div>
                <input type="number" placeholder="Enter Total Secuered Marks" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)}/>
                <button onClick={studentMark}>Submit Marks</button>
            </div>
        </>
    )
}