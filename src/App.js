import './App.css';
import { UserLogin } from './components/userLogin';
import { TeacherDashBoard } from './dashBoard/teacherDashBoard';
import { UserDashBoard } from './dashBoard/userDashBoard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavMenu } from './dashBoard/navMenu';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLogin />} />
        <Route>
          <Route path='/userDashBoard' element={
            <NavMenu>
              <UserDashBoard />
            </NavMenu>
          } />
          <Route path='/teacherDashBoard' element={
            <NavMenu>
              <TeacherDashBoard />
            </NavMenu>
          } />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
