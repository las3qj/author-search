import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import SearchDash from './components/SearchDash';
import LibraryDash from './components/LibraryDash';
import Home from './components/Home';
import Error from './components/Error';
import NavBar from './components/NavBar';

function App() {
  return (
    <main>
      <NavBar/>
      <Switch>
          <Route path='/' render={() => (
              <Home/>)} exact/>
          <Route path='/search' render={() => (
              <SearchDash/>)}
          />
          <Route path='/library' render={() => (
              <LibraryDash/>)}
          />
          <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
