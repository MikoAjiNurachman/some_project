import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Login from './Login'
import Product from './product/'
import Sales from './sales/'


function App() {
  return (
    <div className="container">
    <BrowserRouter>
    <Route exact path="/">
        <Login/>
    </Route>
    <Route exact path="/app/product">
        <Product/>
    </Route>
    <Route exact path="/app/sales">
        <Sales/>
    </Route>
    </BrowserRouter>
    </div>
  );
}

export default App;
