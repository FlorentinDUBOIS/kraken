import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()
export const store = createStore(
  combineReducers({
    router: routerReducer as any,
  }),
  applyMiddleware(routerMiddleware(history))
)
