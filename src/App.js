import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ContactsList from './components/ContactsList';
import ContactDetails from './components/ContactDetails';
import MessagesList from './components/MessagesList';
import ComposeMessage from './components/ComposeMessage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <a href="/">Contacts</a>
            </li>
            <li>
              <a href="/messages">Messages</a>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/messages">
            <MessagesList />
          </Route>
          <Route path="/contact/:id">
            <ContactDetails />
          </Route>
          <Route path="/compose/:id">
            <ComposeMessage />
          </Route>
          <Route path="/">
            <ContactsList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
