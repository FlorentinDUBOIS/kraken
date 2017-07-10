import { ActionType, Action } from './settings.action'
import { SettingsState, state } from './settings.state'

export function settings(
  pSettingsState: SettingsState = state,
  pAction: Action
): SettingsState {
  switch (pAction.type) {
    case ActionType.CHANGE_API_URI: {
      pSettingsState.api = pAction.setting

      break
    }

    default: {
      break
    }
  }

  return pSettingsState
}
