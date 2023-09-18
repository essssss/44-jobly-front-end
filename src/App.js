import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import "./App.css";

import Companies from "./Companies";
import Jobs from "./Jobs";
import Home from "./Home";
import Navbar from "./NavBar";
import Company from "./Company";
import Login from "./Login";
import JoblyApi from "./api";
import Profile from "./Profile";
import SignOut from "./SignOut";
import Signup from "./Signup";
import EditProfile from "./EditProfile";

function App() {
    // const { authData, login, signOut } = useAuth();
    const [currentUser, setCurrentUser] = useState({});
    const [currentUserApplications, setCurrentUserApplications] = useState([]);
    const [token, setToken] = useState("");

    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
        // Token is present in localStorage, set it in state
        setToken(storedToken);
        JoblyApi.token = token;
    }

    async function login(user) {
        try {
            const tokenResponse = await JoblyApi.loginUser(user);
            const token = tokenResponse.token;
            localStorage.setItem("token", token);
            setToken(token);
        } catch (e) {
            console.error("Error logging in:", e);
        }
    }

    const applyToJob = async (id) => {
        try {
            const usernameWhoIsApplyingToJob = currentUser.username;
            // const jobId = id;
            console.log(usernameWhoIsApplyingToJob, id);
            const response = await JoblyApi.applyToJob(
                usernameWhoIsApplyingToJob,
                id
            );

            setCurrentUserApplications([...currentUserApplications, id]);
            // Handle the response (e.g., show a success message)
            console.log("Job application response:", response);
        } catch (error) {
            // Handle any errors that occur during the application process
            console.error("Error applying to job:", error);
        }
    };

    async function editProfile(editedDetails) {
        try {
            const username = currentUser.username;
            const response = await JoblyApi.editProfile(
                username,
                editedDetails
            );

            // Update the currentUser state with the new user data
            setCurrentUser(response.user);
            console.log("Profile edited!", response);
        } catch (error) {
            console.error("Error editing profile:", error);
        }
    }

    async function signUp(user) {
        try {
            console.log("logging in!", user);
            const tokenResponse = await JoblyApi.signUp(user);
            // console.log(tokenResponse);
            const token = tokenResponse.token;
            localStorage.setItem("token", token);
            setToken(token);
        } catch (e) {
            console.error("Error logging in:", e);
        }
    }

    async function signOut() {
        localStorage.removeItem("token");
        setToken("");
        setCurrentUser({});
        setCurrentUserApplications([]);
    }

    useEffect(() => {
        async function updateTokenAndCurrentUser() {
            JoblyApi.token = token;
            console.log("token updated!", token);
            if (token) {
                let decodedToken = await jwt_decode(token);
                let userInfo = await JoblyApi.getUserInfo(
                    decodedToken.username
                );
                setCurrentUser(userInfo);
                setCurrentUserApplications(userInfo.applications);
            }
        }
        updateTokenAndCurrentUser();
        console.log(currentUser.applications);
    }, [token]);

    // useEffect(() => {
    //     console.log(currentUser);
    //     token ? console.log("Logged in") : console.log("logged out!");
    // }, [currentUser]);

    return (
        // <AuthProvider>
        <div className="App">
            <BrowserRouter>
                <Navbar token={token} />
                <Switch>
                    <Route exact path="/companies">
                        <Companies currentUser={currentUser} />
                    </Route>
                    <Route exact path="/jobs">
                        <Jobs
                            currentUser={currentUser}
                            applyToJob={applyToJob}
                            currentUserApplications={currentUserApplications}
                        />
                    </Route>
                    <Route path="/companies/:handle">
                        <Company
                            currentUser={currentUser}
                            applyToJob={applyToJob}
                            currentUserApplications={currentUserApplications}
                        />
                    </Route>
                    <Route exacth path="/login">
                        <Login login={login} />
                    </Route>
                    <Route exact path="/signup">
                        <Signup signUp={signUp} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile
                            currentUser={currentUser}
                            applyToJob={applyToJob}
                            token={token}
                            currentUserApplications={currentUserApplications}
                        />
                    </Route>
                    <Route path="/profile/edit">
                        <EditProfile
                            token={token}
                            currentUser={currentUser}
                            editProfile={editProfile}
                        />
                    </Route>

                    <Route exact path="/signout">
                        <SignOut signOut={signOut} />
                    </Route>
                    <Route exact path="/">
                        <Home token={token} currentUser={currentUser} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
        // </AuthProvider>
    );
}

export default App;
