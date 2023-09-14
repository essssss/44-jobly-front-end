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
            {/* <NavLink exact to="/profile">
                Profile
            </NavLink> */}
        </nav>
    );
};

export default Navbar;
