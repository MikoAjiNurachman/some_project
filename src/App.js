import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Product from './product/'


function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <Product/>
    </div>
    </BrowserRouter>
  );
}

export default App;
