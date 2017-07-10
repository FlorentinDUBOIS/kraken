import { Setting } from './settings.type'

export interface SettingsState {
  [key: string]: Setting

  api: Setting
}

export const state: SettingsState = {
  api: `${window.location.protocol}//${window.location.hostname}:9300`,
}
