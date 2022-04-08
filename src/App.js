import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import { Homepage } from './components/views/Homepage/Homepage';

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ < Homepage /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;