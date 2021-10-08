import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home/Home';
import Manga from './pages/Manga/Manga';

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/manga' component={Manga}/>
      </Switch>
    </Router>
  );
}

export default App;
