import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import DetailPage from './pages/DetailPage/DetailPage';
import HomePage from './pages/HomePage/HomePage';
import MangaPage from "./pages/Manga/MangaPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import SeasonPage from './pages/SeasonPage/SeasonPage';

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/manga' exact component={MangaPage}/>
        <Route path='/:id' exact component={DetailPage} />
        <Route path='/search/search' exact component={SearchPage} />
        <Route path='/season/:year' exact component={SeasonPage}/>     
      </Switch>
    </Router>
  );
}

export default App;
