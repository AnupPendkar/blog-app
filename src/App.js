import Login from "./pages/loginPage/Login";
import Homepage from "./pages/homePage/Homepage";
import Navbar from "./components/top header/Navbar";
import Register from "./pages/registerPage/Register";
import Create from "./pages/createPage/Create";
import About from "./pages/aboutPage/About";
import Setting from "./pages/settingPage/Setting";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    // <div className="App">
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/posts">
          <Homepage />
        </Route>
        <Route path="/register">{user ? <Homepage /> : <Register />}</Route>
        <Route path="/login">{user ? <Homepage /> : <Login />}</Route>
        <Route path="/write">{user ? <Create /> : <Register />}</Route>
        <Route path="/post/:postId">
          <About />
        </Route>
        <Route path="/settings">
          <Setting />
        </Route>
      </Switch>
    </Router>
    // </div>
  );
}

export default App;
