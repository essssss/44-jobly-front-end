import { useState } from "react";
import { useHistory } from "react-router-dom";

const EditProfile = ({ currentUser, editProfile }) => {
    const INITIAL_STATE = {
        password: "",
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
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
            console.log("hi");
            console.log(formData);
            await editProfile(formData);
            history.push("/profile");
        } catch (error) {
            // Handle any errors that occur during the edit profile process
            console.error("Edit profile error:", error);
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
                value={currentUser.username}
                readOnly={true}
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
            <label htmlFor="firstName">First Name:</label>
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
            <button onClick={handleSubmit}>Edit Details!</button>
        </form>
    );
};

export default EditProfile;
