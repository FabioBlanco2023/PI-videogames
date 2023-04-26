import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import React from "react";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import VideogameCreate from './components/VideogameCreate';
import Details from "./components/Details";
//import Loader from "./components/Loader";


function App() {
  return (
    <Router>
      <div className="App">
         <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/home" component={Home}/>
          <Route path="/videogame" component={VideogameCreate}/>
          <Route path="/videogame/:id" component={Details}/>
         </Switch>
      </div>
    </Router>
  );
}

export default App;
