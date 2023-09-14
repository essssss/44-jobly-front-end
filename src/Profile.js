const Profile = ({ username, firstName, lastName }) => {
    return (
        <div>
            <h1>Welcome, {username}</h1>
            <p>
                Your First Name is {firstName} and your Last Name is {lastName}
            </p>
        </div>
    );
};
export default Profile;
