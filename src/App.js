import './App.css';
import {useState} from 'react';
import { UserLogin } from './components/userLogin';
import { TeacherDashBoard } from './dashBoard/teacherDashBoard';
import { UserDashBoard } from './dashBoard/userDashBoard';
import { ViewSubmitted } from './dashBoard/viewSubmitted';
import { ExamPage } from './dashBoard/examPage';
import { Evaluation } from './dashBoard/evaluation';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavMenu } from './dashBoard/navMenu';
import { AddExam } from './dashBoard/addExam';


function App() {
const [teacherEmail, setTeacherEmail] = useState('');
const [studentDept, setStudentDept] = useState('');
const [studentEmail, setStudentEmail] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLogin setTeacherEmail={setTeacherEmail} setStudentDept={setStudentDept} setStudentEmail={setStudentEmail}/>} />
        <Route>
          <Route path='/userDashBoard' element={
            <NavMenu>
              <UserDashBoard studentDept={studentDept} studentEmail={studentEmail} />
            </NavMenu>
          } />
          <Route path='/addExam' element={
            <NavMenu>
              <AddExam />
            </NavMenu>
          } />
          <Route path='/evaluation' element={
            <NavMenu>
              <Evaluation />
            </NavMenu>
          } />
          <Route path='/viewSubmitted' element={
            <NavMenu>
              <ViewSubmitted />
            </NavMenu>
          } />
          <Route path='/examPage' element={ <ExamPage /> } />
          <Route path='/teacherDashBoard' element={
            <NavMenu>
              <TeacherDashBoard email={teacherEmail}/>
            </NavMenu>
          } />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;