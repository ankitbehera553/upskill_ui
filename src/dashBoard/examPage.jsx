import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { SubmitAnswer } from '../userServices/submitAnswer';
import { useNavigate } from 'react-router-dom';
import  './examPage.css';

export function ExamPage() {
    const location = useLocation();
    const exam = location.state;

    const navigate = useNavigate();

    const [answer, setanswer] = useState(['']);
    const [userEmail, setuserEmail] = useState('');
    const [userName, setuserName] = useState('');
    const [userRollNo, setuserRollNo] = useState('');

    function handleAnswer(index, event) {
        const newAnswers = [...answer];
        newAnswers[index] = event.target.value;
        setanswer(newAnswers);
    }
    // console.log("Exam data received:", exam.exam.subject);
    const submitAnswer = async (e) => {
        // console.log("Submitted answers: ", answer);
        e.preventDefault();

        const answerData = {
            email:userEmail,
            name:userName,
            rollno:userRollNo,
            answers: answer,
            examId: exam.examId
        };
        // console.log("Answer Data: ", answerData);
        const { success, data, error } = await SubmitAnswer(answerData);

        if(success) {
            alert("Answers submitted successfully!");
            setanswer(['']);
            setuserEmail('');
            setuserName('');
            setuserRollNo('');
            navigate('/userDashBoard');
        } else {
            alert("Error submitting answers: " + error);
        }
    }


    return (
        <>
            <div className='exam-header'>
                <h1>Exam Page</h1>
                <p><b>{exam.examName}</b></p>
                <p><b>Subject: {exam.subject}</b></p>
                <p><b>{exam.examType}</b></p>
                <p><b>Teacher:{exam.teacherName}</b></p>
                <p><b>Total Mark: {exam.totalMark}</b></p>
                {/* <p>{exam.examId}</p> */}
            </div>
            <div className='user-details'>
                <input type="text" placeholder='Enter Your Email' value={userEmail} onChange={(e) => setuserEmail(e.target.value)} required/>
                <input type="text" placeholder='Enter Your Name' value={userName} onChange={(e) => setuserName(e.target.value)} required/>
                <input type="number" placeholder='Roll No.' value={userRollNo} onChange={(e) => setuserRollNo(e.target.value)} required/>
            </div>

            <div className='exam-questions'>
                <h2>Questions</h2>
                {
                    exam.questions && exam.questions.length > 0 ? (
                        <ul>
                            {exam.questions.map((question, index) => (
                                <li key={index}>
                                    {question}
                                    <input type="text" value={answer[index]} onChange={(e) => { handleAnswer(index, e) }} required/>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No questions available.</p>
                    )
                }
            </div>
            <div>
                <button className ="submitAnswer" onClick={submitAnswer}>Submit</button>
            </div>
        </>
    )
}