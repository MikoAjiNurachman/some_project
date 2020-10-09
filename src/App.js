import React from 'react';
import {BrowserRouter} from 'react-router-dom'
// import Login from './Login';
import Register from './Register';
// import Headers from './templates/headers'

function App() {
  return (
    <BrowserRouter>
    {/* <Headers/> */}
    <div className="container">
      {/* <Login/> */}
      <Register/>
    </div>
    </BrowserRouter>
  );
}

export default App;
