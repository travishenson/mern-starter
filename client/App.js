import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Import global components
import { Navbar } from './components';

// Import pages for routing
import { Home, About } from './pages';

const App = () => {
  return(
    <Router className='app'>
      <Navbar />
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
        </Switch>
      </main>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));