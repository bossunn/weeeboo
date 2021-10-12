import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home/Home';
import Manga from './pages/Manga/Manga';
import DetailPage from './pages/DetailPage/DetailPage';
import SeasonPage from './pages/SeasonPage/SeasonPage';

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/manga' component={Manga}/>
        <Route path='/:id' exact component={DetailPage} />
        <Route path='/season/:year' component={SeasonPage}/>
      </Switch>
    </Router>
  );
}

export default App;
