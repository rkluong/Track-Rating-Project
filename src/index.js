import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory } from 'react-router';
import Track from './Track';
import Login from './Login';
import Corner from './Corner';
import Main from './Main';
import History from "./History"

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Login} />
        <Route path="/main" component={Main} />
        <Route path="/track" component={Track} />
        <Route path="/corner" component={Corner} />
        <Route path="/history" component={History} />
    </Router>,
    document.getElementById('root')
);
