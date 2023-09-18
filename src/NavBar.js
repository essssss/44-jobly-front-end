import { NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = ({ token }) => {
    return (
        <nav className="Navbar">
            <NavLink exact to="/">
                JOBLY
            </NavLink>
            {token ? (
                <>
                    <NavLink exact to="/companies">
                        Companies
                    </NavLink>
                    <NavLink exact to="/jobs">
                        Jobs
                    </NavLink>

                    <NavLink exact to="/profile">
                        Profile
                    </NavLink>
                    <NavLink exact to="/signout">
                        Sign Out
                    </NavLink>
                </>
            ) : (
                <NavLink exact to="/login">
                    Login/Signup
                </NavLink>
            )}
        </nav>
    );
};

export default Navbar;
