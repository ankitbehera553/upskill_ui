// NavigationBar.js
import './userDashBoard.css';
import './navMenu.css';
import { useNavigate } from 'react-router-dom';

export function NavMenu({ children }) {
    const navigate = useNavigate();

    return (
        <>
            <div className='navBar'>
                <div className="logo">UPSKILL</div>
                <div className="userName">
                    <span>UserName | </span>
                    <span onClick={() => navigate('/')} className='logoutBtn'>Logout</span>
                </div>
            </div>

            <div className='subLayout'>
                <div className='menu'>
                    <div className='menuName menuActive' onClick={() => navigate('/userDashBoard')}>
                        Dashboard
                    </div>
                    <div className='menuName' onClick={() => navigate('/profile')}>
                        Profile
                    </div>
                </div>
                <main>{children}</main>
            </div>

        </>
    );
}
