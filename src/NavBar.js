import { NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
    return (
        <nav className="Navbar">
            <NavLink exact to="/">
                JOBLY
            </NavLink>
            <NavLink exact to="/companies">
                Companies
            </NavLink>
            <NavLink exact to="/jobs">
                Jobs
            </NavLink>
            <NavLink exact to="/login">
                Login/Signup
            </NavLink>
            <NavLink exact to="/profile">
                Profile
            </NavLink>
            <NavLink exact to="/sign-out">
                Sign Out
            </NavLink>
        </nav>
    );
};

export default Navbar;
