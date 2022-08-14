import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/Home';
import Category from './components/Category';
import Checkout from './components/Checkout';
import 'rsuite/dist/styles/rsuite-default.css';
import { ProfileProvider } from './Context/profile.context';

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/category/:id">
          <Category />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route>
          <div>This is 404 page</div>
        </Route>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
