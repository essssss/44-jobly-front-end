import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";
const Login = ({ login }) => {
    const INITIAL_STATE = { username: "", password: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            history.push("/profile");
        } catch (error) {
            // Handle login error here, such as displaying an error message
            console.error("Login error:", error);
        }
    };
    return (
        <div>
            <h1>Login Please!</h1>
            <form>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    required={true}
                    name="username"
                    value={formData.name}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    required={true}
                    name="password"
                    value={formData.name}
                    onChange={handleChange}
                />
                <br />
                <button onClick={handleSubmit}>login!</button>
            </form>
            <Link to="/signup">Need to sign up?</Link>
        </div>
    );
};
export default Login;
