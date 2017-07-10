import * as React from 'react'
import { Route } from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { history, store } from './kraken.store'
import { DevTool } from './kraken.dev-tool'
import { IntlProvider } from './components/intl/intl.provider'
import muiTheme from './components/material-ui/material-ui.theme'

/**
 * Router pure component in order to handle routing in "kraken-application"
 * @constructor
 */
export function Router() {
  return (
    <Provider store={store}>
      <IntlProvider>
        <MuiThemeProvider muiTheme={muiTheme}>
          <ConnectedRouter history={history}>
            <div>
              <Route path="/">
                <Route />
              </Route>

              <DevTool />
            </div>
          </ConnectedRouter>
        </MuiThemeProvider>
      </IntlProvider>
    </Provider>
  )
}
