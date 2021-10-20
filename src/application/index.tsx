import "./../assets/styles/index.scss";
import SearchBox from "../components/SearchBox";
import HomePage from "../components/HomePage";
import ProductList from "../components/ProductList";
import ProductDetail from "../components/ProductDetail";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <SearchBox />
      <div className="content">
        <div className="contentContainer">
          <Switch>
            <Route path="/items/:id" exact component={ProductDetail} />
            <Route path="/items" component={ProductList} />
            <Route path="/" component={HomePage} />              
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;