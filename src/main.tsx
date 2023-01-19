import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/reset.scss';
import './assets/main.scss';
import './assets/codemirror.scss';
import Home from "./Pages/Home/Home";
import {Redirect, Route, Switch} from "wouter";
import Builder from "./Pages/Builder/Builder";
import Player from "./Pages/Player/Player";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Switch>
      <Route path="/"><Home /></Route>
      <Route path="/builder"><Builder /></Route>
      <Route path="/player"><Player /></Route>
      <Redirect to="/" />
    </Switch>

  </React.StrictMode>,
)
