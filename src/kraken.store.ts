import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  Store,
} from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import { State } from './kraken.state'
import { DevTool } from './kraken.dev-tool'
import * as reducers from './kraken.reducer'

// history JavaScript API
export const history = createHistory()

// store redux store
export const store: Store<State> = createStore<any>(
  combineReducers({ ...reducers } as any),
  compose(applyMiddleware(routerMiddleware(history)), DevTool.instrument())
)
