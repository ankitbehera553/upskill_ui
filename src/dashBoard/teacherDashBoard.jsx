import './teacherDashBoard.css';
import { useState, useEffect } from 'react';
import { GetExamCardForTeacher } from '../userServices/getExamCard';
import { ExamCard } from './examCard';
import { useNavigate } from 'react-router-dom';

export function TeacherDashBoard(props) {
    const [state, setState] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetExamCardForTeacher(props.email);
                setState(data);
            }
            catch (err) {
                alert("Faild to fetch data");
            }
        };

        fetchData();

    }, [props.email]);
    function addExam() {
        navigate('/addExam');
    }

    function submitted(exam) {
        navigate('/viewSubmitted', { state: exam });
    }


    return (
        <>
            <div className="teacherMainLayout">
                <h1 id='header'>All Created Exams <button onClick={addExam}>Add Exam +</button></h1>
                <div className='cardLayout'>
                    {state.map((exam, index) => (
                        <ExamCard
                            key={exam.examId || index}
                            examName={exam.examName}
                            examType={exam.examType}
                            subject={exam.subject}
                            department={exam.department}
                            teacherName={exam.teacherName}
                            endDate={exam.endDate}
                            totalMark={exam.totalMark}
                            onClick={() => submitted(exam)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}