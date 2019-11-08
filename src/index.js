import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './reset.scss';
import Home from './pages/Home';
import NewDilema from './pages/NewDilemma';
import Dilemmas from './pages/Dilemmas';
import Dilemma from './pages/Dilemma';


ReactDOM.render(
<Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/new-dilemma' component={NewDilema} />
      <Route exact path='/dilemmas' component={Dilemmas} />
      <Route exact path='/dilemma/:id' component={Dilemma} />


    </Switch>
  </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
