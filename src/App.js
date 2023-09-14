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

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [token, setToken] = useState("");

    const history = useHistory();

    async function login(user) {
        try {
            const tokenResponse = await JoblyApi.loginUser(user);
            setToken(tokenResponse.token);
        } catch (e) {
            console.error("Error logging in:", e);
        }
    }

    async function signOut() {
        setToken("");
        setCurrentUser({});
    }

    useEffect(() => {
        async function updateTokenAndCurrentUser() {
            JoblyApi.token = token;
            console.log("token updated!");
            if (token) {
                let decodedToken = await jwt_decode(token);
                let userInfo = await JoblyApi.getUserInfo(
                    decodedToken.username
                );
                setCurrentUser(userInfo);
            }
        }
        updateTokenAndCurrentUser();
    }, [token]);

    useEffect(() => {
        console.log(currentUser);
        token ? console.log("Logged in") : console.log("logged out!");
    }, [currentUser]);

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/companies">
                        <Companies />
                    </Route>
                    <Route exact path="/jobs">
                        <Jobs />
                    </Route>
                    <Route path="/companies/:handle">
                        <Company />
                    </Route>
                    <Route exacth path="/login">
                        <Login login={login} />
                    </Route>
                    <Route exact path="/signup">
                        <div>
                            <p>sign up!</p>
                        </div>
                    </Route>
                    <Route path="/profile">
                        <Profile
                            username={currentUser.username}
                            firstName={currentUser.firstName}
                            lastName={currentUser.lastName}
                        />
                    </Route>
                    <Route exact path="/sign-out">
                        <SignOut signOut={signOut} />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
