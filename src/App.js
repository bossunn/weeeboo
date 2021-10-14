import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import DetailPage from './pages/DetailPage/DetailPage';
import HomePage from './pages/HomePage/HomePage';
import MangaPage from "./pages/Manga/MangaPage";
import SeasonPage from './pages/SeasonPage/SeasonPage';

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/manga' component={MangaPage}/>
        <Route path='/:id' exact component={DetailPage} />
        <Route path='/season/:year' component={SeasonPage}/>
      </Switch>
    </Router>
  );
}

export default App;
