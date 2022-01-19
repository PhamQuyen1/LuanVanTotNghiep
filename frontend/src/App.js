import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Home from './site/screens/Home';
import Header from './site/components/Header';
import Footer from './site/components/Footer';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div id="home">
        <Header />
        
        <Switch>
          {/* <Route path="/" exact>
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route> */}
          <Route path="/" exact={true}> 
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>

  );
}

export default App;
