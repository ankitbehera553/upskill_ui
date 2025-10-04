import './addExam.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CreateExamCard } from '../userServices/getExamCard';

export function AddExam() {
    const navigate = useNavigate();

    const [examType, setExamType] = useState('practice');
    const [subject, setSubjectName] = useState();
    const [department, setDepartment] = useState();
    const [teacherName, setLectureName] = useState();
    const [totalMark, setTotalMark] = useState();
    const [endDate, setEndDate] = useState();
    const [examName, setExamName] = useState();
    const [createdBy, setLectureEmail] = useState();

    const [questions, setQuestions] = useState(['']);

    const handleNewExam = async (e) => {
        // console.log(examType, subjectName, department, lectureName, totalMark, endDate, examName, lectureEmail);
        e.preventDefault();

        const newExam = {
            examType,
            subject,
            department,
            teacherName,
            endDate,
            totalMark,
            examName,
            createdBy,
            questions
        };
        const { success, error } = await CreateExamCard(newExam);
        if (success) {
            setExamType("practice");
            setSubjectName();
            setDepartment("");
            setLectureName("");
            setEndDate("");
            setTotalMark("");
            setExamName("");
            setLectureEmail("");
            setQuestions(['']);
            navigate('/teacherDashBoard');
        } else {
            alert("Failed to create user: " + error);
        }
    }

    function addQuestionField() {
        setQuestions([...questions, '']);
    }
    const handleQuestionValue = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index] = event.target.value;
        setQuestions(newQuestions);
    }

    return (
        <>
            <div className='addExamLayout'>
                <div className="addExamHeader">
                    <h2>Add New Exam</h2>
                    <div>
                        <button className="backBtn" onClick={() => navigate('/teacherDashBoard')}>Cancel</button>
                        <button className="saveBtn" onClick={handleNewExam}>Save Exam</button>
                    </div>

                </div>
                <div className='addExamForm'>
                    <form className='examDetails'>
                        <select name="examType" id="examType" value={examType} onChange={(e) => setExamType(e.target.value)}>
                            <option value="practice">Practice</option>
                            <option value="assessment">Assessment</option>
                        </select>
                        <input type="text" placeholder='Subjet Name' value={subject} onChange={(e) => setSubjectName(e.target.value)} />
                        <input type="text" placeholder='Department' value={department} onChange={(e) => setDepartment(e.target.value)} />
                        <input type="text" placeholder='Lecture Name' value={teacherName} onChange={(e) => setLectureName(e.target.value)} />
                        <input type="text" placeholder='Total Mark' value={totalMark} onChange={(e) => setTotalMark(e.target.value)} />
                        <input type="date" placeholder='End Date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <input type="text" placeholder='Exam Name' value={examName} onChange={(e) => setExamName(e.target.value)} />
                        <input type="text" placeholder='Lecture Email' value={createdBy} onChange={(e) => setLectureEmail(e.target.value)} />
                    </form>
                </div>
                <div>
                    <h1>Create Questions</h1>
                    {questions.map((questions, index) => (
                        <input key={index} type="text" value={questions} placeholder={`Question No. ${index + 1}`} onChange={(e) => { handleQuestionValue(index, e) }} />
                    ))}
                    <div className='questionSection'>
                        <button className='saveBtn' onClick={addQuestionField}>Add Question</button>
                    </div>
                </div>
            </div>
        </>
    );
}