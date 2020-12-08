import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './app/App';
import Issues from './components/Issues'
import IssueDetails from './components/IssueDetails'
import HeaderComponent from './components/Header'

import { BrowserRouter, Route, Switch } from "react-router-dom";


ReactDOM.render(
  <div className="container mt-4">
<HeaderComponent user="Giuliacia97" repo="example" />
<BrowserRouter>
    <Switch>
      <Route user="Giuliacia97" repo="example" exact path='/' component={Issues} />
      <Route user="Giuliacia97" repo="example" exact path='/issues/:id' component={IssueDetails}/>
    </Switch>
</BrowserRouter>
 </div>,
 document.getElementById('root'));

