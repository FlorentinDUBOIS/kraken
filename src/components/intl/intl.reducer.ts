import { Action, ActionType } from './intl.action'
import { IntlState, state } from './intl.state'

export function intl(pState: IntlState = state, pAction: Action): IntlState {
  switch (pAction.type) {
    case ActionType.CHANGE_CURRENT_LANGUAGE: {
      pState.currentLanguage = pAction.language

      break
    }

    case ActionType.CHANGE_FALLBACK_LANGUAGE: {
      pState.fallbackLanguage = pAction.language

      break
    }

    default: {
      break
    }
  }

  return pState
}
