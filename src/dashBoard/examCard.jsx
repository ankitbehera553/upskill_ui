import './examCard.css';

export function ExamCard(props) {
    return (
        <>
            <div className="card" onClick={props.onClick} style={{ cursor: "pointer" }}>
                <div>Name: {props.examName}</div>
                <span>{props.subject} <b>|</b> {props.examType} </span>
                <span>Department : {props.department}</span>
                <span>Exam By: {props.teacherName}</span>
                <span>Due Date: {props.endDate} <b>|</b> Mark : {props.totalMark}</span>
            </div>

        </>
    );
}