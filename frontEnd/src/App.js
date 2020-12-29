import React from "react";
import HomePage from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import TopNav from "./Components/TopNav";
import Help from "./Components/Help";
import About from "./Components/About";
import Footer from "./Components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



function App() {
  return (
    <Router>
      <TopNav />
      <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/help">
            <Help />
          </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;