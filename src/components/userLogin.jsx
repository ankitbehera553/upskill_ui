import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateUser, getUser } from '../userServices/createUser';
import './userLogin.css';

export function UserLogin({ setTeacherEmail, setStudentDept, setStudentEmail }) {
    const containerRef = useRef(null);
    const signInButtonRef = useRef(null);
    const signUpButtonRef = useRef(null);
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const navigate = useNavigate();


    const [firstname, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [role, setUserRole] = useState('Student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('csit');
    const [responsedata, setResponseData] = useState(null);

    useEffect(() => {

        const container = containerRef.current;
        const signInButton = signInButtonRef.current;
        const signUpButton = signUpButtonRef.current;

        const activateSignUpPanel = () => {
            container.classList.add('right-panel-active');
            setIsSignUpMode(true);
        };

        const activateSignInPanel = () => {
            container.classList.remove('right-panel-active');
            setIsSignUpMode(false);
        };

        signUpButton.addEventListener('click', activateSignUpPanel);
        signInButton.addEventListener('click', activateSignInPanel);


        return () => {
            signUpButton.removeEventListener('click', activateSignUpPanel);
            signInButton.removeEventListener('click', activateSignInPanel);
        };
    }, []);

    const signinsignup = async (e) => {
        e.preventDefault(); // <-- important for both modes

        if (isSignUpMode) {
            // SIGN UP logic
            const newUser = {
                firstName: firstname,
                lastName,
                email,
                password,
                department: role === 'Lecture' ? null : department,
                role
            };

            const { success, data, error } = await CreateUser(newUser);

            if (success) {
                setResponseData(data);
                setUserRole("student");
                setFirstname("");
                setLastname("");
                setEmail("");
                setPassword("");
                setDepartment("cse");
                if (role === 'Lecture') {
                    // setTeacherEmail(data.email);
                    navigate('/teacherDashBoard');
                }
                else {
                    navigate('/userDashBoard');
                }
            } else {
                alert("Failed to create user: " + error);
            }

        } else {
            // SIGN IN logic
            const newUser = { email, password };
            const { success, data, error } = await getUser(newUser);

            if (success && data.role === "Student") {
                setStudentDept(data.department);
                setStudentEmail(data.email);
                navigate('/userDashBoard');
            } else if (success && data.role === "Lecture") {
                setTeacherEmail(data.email);
                navigate('/teacherDashBoard');
            } else {
                alert("Failed to login: " + error);
            }
        }
    };

    return (
        <>

            <div className='loginMainLayout'>
                <div className="container" id="container" ref={containerRef}>
                    <div className="form-container sign-in-container">
                        <form onSubmit={signinsignup}>
                            <h1>{isSignUpMode ? 'Sign Up' : 'Sign In'}</h1>

                            {/* Conditional Fields */}
                            {isSignUpMode && (
                                <>
                                    <select name="UserRole" id="UserRole" value={role} onChange={(e) => setUserRole(e.target.value)}>
                                        <option value="student">Student</option>
                                        <option value="Lecture">Lecture</option>
                                    </select>
                                    <input type="text" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                    <input type="text" placeholder="Lastname" value={lastName} onChange={(e) => setLastname(e.target.value)} />

                                    {role === 'Student' && (
                                        <>
                                            <select name="Departemnt" id="Departemnt" value={department} onChange={(e) => setDepartment(e.target.value)}>
                                                <option value="csit">CS/IT</option>
                                                <option value="cse">CSE</option>
                                                <option value="civil">Civil</option>
                                                <option value="eee">EEE</option>
                                            </select>
                                        </>
                                    )}

                                </>


                            )}



                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {!isSignUpMode && <a href="#">Forgot your password?</a>}
                            <button type="submit">{isSignUpMode ? 'Register' : 'Sign In'}</button>


                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id="signIn" ref={signInButtonRef}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Welcome to UpSkill, Up your Skill.</p>
                                <button className="ghost" id="signUp" ref={signUpButtonRef}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}