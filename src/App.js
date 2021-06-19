import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
// import Nav from './Nav';
import Home from './Home';
import Shop from './Shop';
import Register from './Register';
import Login from './Login';
import Weather from './Weather';

function App() {
  return (
    <Router>
      {/* <Nav /> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute path="/weather" component={Weather} />
      </Switch>
    </Router>
  );
}

export default App;
