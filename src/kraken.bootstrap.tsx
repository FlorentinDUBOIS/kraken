import * as React from 'react'
import { render } from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'

import { KrakenApplication as Kraken } from './kraken.application'
import { store } from './kraken.store'

import * as intl from './components/intl/intl.action'
import * as settings from './components/settings/settings.action'
import { Language } from './components/intl/intl.enum'

/**
 * Custom element knows as "web component". This web component can be used
 * by create a "kraken-application" html tag in your web page.
 * @type {KrakenApplication}
 */
class KrakenApplication extends HTMLElement {
  /**
   * Create this web component from a HTMLElement
   * @see {HTMLElement}
   * @return {KrakenApplication} the web component
   */
  public constructor() {
    super()

    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941
    injectTapEventPlugin()

    // Render the react kraken application in the shadow dom
    // the "any" cast was here because of the shadow dom. It is not considered
    // as a valid element which can be rendered.
    // /!\ work pretty well according to react's author
    render(<Kraken />, this.attachShadow({ mode: 'open' }) as any)

    store.dispatch(
      {
        type: intl.ActionType.CHANGE_CURRENT_LANGUAGE,
        language: navigator.language || Language.ENGLISH,
      } as intl.Action
    )
  }

  public attributeChangedCallback(
    pAttributeName: string,
    pOldValue: string,
    pNewValue: string
  ): void {
    if (pAttributeName === 'uri') {
      store.dispatch(
        {
          type: settings.ActionType.CHANGE_API_URI,
          setting: pNewValue || pOldValue,
        } as settings.Action
      )
    }
  }

  /**
   * Get the html tag of this web component
   * @return {String} the web component's name
   */
  public static get is(): string {
    return 'kraken-application'
  }

  public static get observedAttributes(): string[] {
    return ['uri']
  }
}

// Define our web component
window.customElements.define(KrakenApplication.is, KrakenApplication)
