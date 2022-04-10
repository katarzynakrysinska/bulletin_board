import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import { Homepage } from './components/views/Homepage/Homepage';
import { Product } from './components/features/Product/Product';
import { Cart } from './components/views/Cart/Cart';
import { Order } from './components/views/Order/Order';
import { NotFound } from './components/views/NotFound/NotFound';
import { MainLayout } from './components/layout/MainLayout/MainLayout';

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path='/' element={ < Homepage /> } />
            <Route path='/product/:id' element={ < Product/> } />
            <Route path='/cart' element={ < Cart /> } />
            <Route path='/order' element={ < Order /> } />
            <Route path='*' element={ < NotFound/> } />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;