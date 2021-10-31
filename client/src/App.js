import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)}>
        </Route>
        <Route path="/login" component={Auth(LoginPage, false)}>
        </Route>
        <Route path="/register" component={Auth(RegisterPage, false)}>
          {/*<RegisterPage /> */}
        </Route>
        
      </Switch>
    </div>
  </Router>
  );
}

export default App;
