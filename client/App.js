import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Import pages for routing
import { Home, About } from './pages';

const App = () => {
  return(
    <Router className='app'>
      <main>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' exact component={About} />
        </Switch>
      </main>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));