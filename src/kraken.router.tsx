import * as React from 'react'
import { Route } from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import { history, store } from './kraken.store'

import Root from './components/root.route'

export default class Router extends React.Component<any, any> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/">
              <Route component={Root as any} />
            </Route>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}
