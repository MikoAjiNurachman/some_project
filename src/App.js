import React, { useEffect } from 'react';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Product from './product/'
import Sales from './sales/'
import Dashboard from './dashboard/'
import {ToastContainer} from 'react-toastify'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useSelector } from 'react-redux';
import NotFoundPage from './NotFoundPage';

function App() {
    const selector = useSelector(state => state)
    const history = useHistory()
    useEffect(() => {
        if (history !== undefined) {
            if (selector.login.token === null) history.push("/")
        }
    },[selector.login,history])
  return (
    <div className="container">
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
    <BrowserRouter>
    <Switch>
    <Route exact path="/register/">
        <Register/>
    </Route>
    <Route exact path="/">
        <Login/>
    </Route>
    <Route exact path="/app/product/">
        <Product/>
    </Route>
    <Route exact path="/app/sales/">
        <Sales/>
    </Route>
    <Route exact path="/app/dashboard/">
        <Dashboard/>
    </Route>
    <Route path="*">
        <NotFoundPage/>
    </Route>
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
