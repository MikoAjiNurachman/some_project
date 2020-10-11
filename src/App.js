import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Product from './product/'
import Sales from './sales/'


function App() {
  return (
    <div className="container">
    <BrowserRouter>
    <Switch>
    <Route exact path="/">
        <Login/>
    </Route>
    <Route exact path="/register">
        <Register/>
    </Route>
    <Route exact path="/app/product">
        <Product/>
    </Route>
    <Route exact path="/app/sales">
        <Sales/>
    </Route>
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
