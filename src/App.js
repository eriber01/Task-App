import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"

import Authenticate from "./Components/Authenticate/Authenticate";
import Header from "./Components/Header/Header"
import Home from "./Components/Home/Home";
import Task from "./Components/Task/Task";


function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Switch>
        
          <Route exact path='/'>
            <Home/>
          </Route>

          <Route path='/task'>
            <Task/>
          </Route>

          <Route path='/authenticate'>
            <Authenticate/>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
