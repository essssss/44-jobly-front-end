import { NavLink } from "react-router-dom/cjs/react-router-dom";

const Home = ({ token, currentUser }) => {
    return (
        <div>
            {!token ? (
                <>
                    <h1>Hi! Welcome to Jobly!</h1>
                    <h3>We hope you enjoy your stay!</h3>
                    <NavLink exact to="/login">
                        Login or Signup
                    </NavLink>
                </>
            ) : (
                <div>
                    <p>Hi, {currentUser.firstName}!! Welcome back!</p>
                </div>
            )}
        </div>
    );
};
export default Home;
