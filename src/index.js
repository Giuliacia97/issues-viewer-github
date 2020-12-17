import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './app/App';
import Issues from './components/Issues'
import IssueDetails from './components/IssueDetails'
import HeaderComponent from './components/Header'
import AddIssue from './components/AddIssue'

import { BrowserRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <div className="container mt-4">
    <HeaderComponent user="Giuliacia97" repo="example" />
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Issues user="Giuliacia97" repo="example"/>
        </Route>
        <Route exact path='/issues/:id'>
          <IssueDetails user="Giuliacia97" repo="example"/>
        </Route>
        <Route exact path='/new/issue'>
          <AddIssue user="Giuliacia97" repo="example"/>
        </Route>
      </Switch>
    </BrowserRouter>
  </div>,
 document.getElementById('root'));

