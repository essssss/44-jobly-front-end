import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";

const SignOut = ({ signOut }) => {
    useEffect(() => {
        // Call the signOut function to clear token and user information
        signOut();
    }, [signOut]);
    return <Redirect to="/" />;
};
export default SignOut;
