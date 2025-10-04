import { GetSubmittedAnswers } from "../userServices/submitAnswer"
import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { AnswerCard } from "./answerCard"
import './viewSubmitted.css'

export function ViewSubmitted() {
    const [submitDetail, setSubmitDetail] = useState([]);
    const location = useLocation();
    const exam = location.state;
    // console.log(exam.examId);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetSubmittedAnswers(exam.examId);
                setSubmitDetail(data);
            }
            catch (err) {
                alert("Faild to fetch data");
            }
        };

        fetchData();

    }, [exam.examId]);
    // console.log(submitDetail);
    function questionAnswerLayout(submission) {
        // console.log("submission clicked", submission);
        navigate('/Evaluation', { state: { submission, exam } });
    }

    return (
        <>
            <div className="SubmittedLayout">
                <h1 id='header'>All Submitted Exams</h1>
                <div className='submitCard'>
                    {submitDetail.length === 0 ? (
                        <p>No submissions found.</p>
                    ) : (
                        submitDetail.map((submission, index) => (
                            <AnswerCard key={index} submission={submission} onClick={() => questionAnswerLayout(submission)} />
                        ))
                    )}
                </div>
            </div>
        </>
    )
}