import './userDashBoard.css';
import { useState, useEffect } from 'react';
import { ExamCard } from './examCard';
import { GetExamCard } from '../userServices/getExamCard';

export function UserDashBoard() {
    const [examData, setExamData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetExamCard();
                setExamData(data);
            } catch (err) {
                console.error("Error fetching exam cards:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='mainLayout'>
                <div className='contentLayout'>
                    {examData.map((exam, index) => (
                        <ExamCard
                            key={exam.examId || index}
                            examName={exam.examName}
                            examType={exam.examType}
                            subject={exam.subject}
                            department={exam.department}
                            teacherName={exam.teacherName}
                            endDate={exam.endDate}
                            totalMark={exam.totalMark}
                        />
                    ))}
                </div>

            </div>

        </>

    )
}