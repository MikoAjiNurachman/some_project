import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Headers from './templates/headers'

function App() {
  return (
    <BrowserRouter>
    <div className="container">
        <Headers/>
    </div>
    </BrowserRouter>
  );
}

export default App;
