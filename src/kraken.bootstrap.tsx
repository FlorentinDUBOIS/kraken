import * as React from 'react'
import { render } from 'react-dom'
import { push } from 'react-router-redux'

import Router from './kraken.router'
import { store } from './kraken.store'

class KrakenApplication extends HTMLElement {
  static get is() {
    return 'kraken-application'
  }

  constructor() {
    super()

    render(<Router />, this)

    store.dispatch(push('/'))
  }
}

window.customElements.define(KrakenApplication.is, KrakenApplication)
