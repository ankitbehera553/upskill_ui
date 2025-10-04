import React from "react";
import "./answerCard.css";

export function AnswerCard({ submission, onClick }) {
    return (
        <div className="answerCard" onClick={onClick}>
            {/* <p className="name">{submission.submitId}</p> */}
            <p className="name">{submission.name}</p>
            <p className="email">{submission.email}</p>
            <p className="roll">Roll No: {submission.rollno}</p>
        </div>
    );
}
