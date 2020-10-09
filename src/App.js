import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Login from './Login';
// import Headers from './templates/headers'

function App() {
  return (
    <BrowserRouter>
    {/* <Headers/> */}
    <div className="container">
      <Login/>
    </div>
    </BrowserRouter>
  );
}

export default App;
