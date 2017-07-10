import { RouterState } from './components/router/router.state'
import { IntlState } from './components/intl/intl.state'
import { SettingsState } from './components/settings/settings.state'

export interface State {
  intl: IntlState
  router: RouterState
  settings: SettingsState
}
