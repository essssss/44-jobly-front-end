import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Signup = ({ signUp }) => {
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    };
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
            // console.log("hi");
            // console.log(formData);
            await signUp(formData);
            history.push("/profile");
        } catch (error) {
            // Handle login error here, such as displaying an error message
            console.error("Login error:", error);
        }
    };
    return (
        <form>
            <label htmlFor="username">Username:</label>
            <input
                id="username"
                type="text"
                required={true}
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
                id="password"
                type="password"
                required={true}
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="firtName">First Name:</label>
            <input
                id="firstName"
                type="text"
                required={true}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="lastName">Last Name:</label>
            <input
                id="lastName"
                type="text"
                required={true}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                type="email"
                required={true}
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <br />
            <button onClick={handleSubmit}>Register!</button>
        </form>
    );
};

export default Signup;
