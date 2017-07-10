import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Store } from 'redux'

import { IntlService } from './intl.service'
import { State as KrakenState } from '../../kraken.state'

export namespace IntlProvider {
  export interface Props {}
  export interface State {}
  export interface Context {
    store: Store<KrakenState>
  }
}

export class IntlProvider extends React.Component<
  IntlProvider.Props,
  IntlProvider.State
> {
  public getChildContext() {
    const { store }: IntlProvider.Context = this.context

    return {
      intl: new IntlService(store),
    }
  }

  public render(): JSX.Element {
    return this.props.children as any
  }

  public static get childContextTypes() {
    return {
      intl: PropTypes.object.isRequired,
    }
  }

  public static get contextTypes() {
    return {
      store: PropTypes.object.isRequired,
    }
  }
}
