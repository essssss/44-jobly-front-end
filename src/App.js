import { Switch } from "react-router-dom/cjs/react-router-dom";
import "./App.css";
import Companies from "./Companies";
import Jobs from "./Jobs";
import Home from "./Home";
import Navbar from "./NavBar";
import { BrowserRouter, Route } from "react-router-dom";

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
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
