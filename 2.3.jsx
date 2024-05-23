import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './BookList';
import BookDetail from './BookDetail';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={BookList} />
                    <Route path="/book/:id" component={BookDetail} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
