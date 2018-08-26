import React, { Component } from 'react';
import store from './store'
import {Provider} from 'react-redux'
import Batches from './containers/Batches'
import BatchPage from './containers/BatchPage'
import { Route } from 'react-router-dom'
import ErrorMessage from './containers/ErrorMessage'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ErrorMessage />
          <Route path="/" exact component={Batches} />
          <Route path="/batches/:id" component={BatchPage} />
        </div>
      </Provider>
    );
  }
}

export default App;
