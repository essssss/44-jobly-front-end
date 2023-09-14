import { Switch } from "react-router-dom/cjs/react-router-dom";
import "./App.css";
import Companies from "./Companies";
import Jobs from "./Jobs";
import Home from "./Home";
import Navbar from "./NavBar";
import { BrowserRouter, Route } from "react-router-dom";
import Company from "./Company";

function App() {
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
                        <div>
                            <p>login!</p>
                            <p>Want to sign up?</p>
                        </div>
                    </Route>
                    <Route exact path="/signup">
                        <div>
                            <p>sign up!</p>
                        </div>
                    </Route>
                    <Route path="/profile">
                        <div>
                            <p>This is you!</p>
                        </div>
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
