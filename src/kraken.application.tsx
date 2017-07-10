import * as React from 'react'

import { Router } from './kraken.router'

/**
 * KrakenApplication pure component in order to be used as a template
 * to the "kraken-application" web component
 * @constructor
 */
export function KrakenApplication() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />

      <Router />
    </div>
  )
}
