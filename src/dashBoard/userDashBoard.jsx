import './userDashBoard.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamCard } from './examCard';
import { getExamCardForUser } from '../userServices/getExamCard';

export function UserDashBoard(props) {
    const [examData, setExamData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getExamCardForUser(props.studentDept);
                setExamData(data);
                // console.log("Fetched exam cards:", data);
            } catch (err) {
                console.error("Error fetching exam cards:", err);
            }
        };

        fetchData();
    }, [props.studentDept]);

    function examLayout(exam) {
        // console.log("exam card clicked", exam);
        navigate('/examPage', { state: exam });
    }

    return (
        <>
            <div className='mainLayout'>
                <div className='contentLayout'>
                    {examData.length > 0 ? (
                        examData.map((exam, index) => (
                            <ExamCard
                                key={exam.examId || index}
                                examName={exam.examName}
                                examType={exam.examType}
                                subject={exam.subject}
                                department={exam.department}
                                teacherName={exam.teacherName}
                                endDate={exam.endDate}
                                totalMark={exam.totalMark}
                                onClick={() => examLayout(exam)}
                            />
                        ))
                    ) : (
                        <p>No exam cards found.</p>
                    )}
                </div>

            </div>

        </>

    )
}