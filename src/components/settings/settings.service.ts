import { Store } from 'redux'
import { Observable } from 'rxjs'

import { State } from '../../kraken.state'
import { ObservableFactory } from '../observable/observable.factory'
import { Setting } from './settings.type'
import { SettingsState } from './settings.state'

export class SettingsService {
  private $state$: Observable<State>

  public constructor(private $store: Store<State>) {
    this.$state$ = ObservableFactory.fromReduxStore(this.$store)
  }

  public get settings(): SettingsState {
    return this.$store.getState().settings
  }

  public getObservableSettings(pKey: string): Observable<Setting> {
    return this.$state$
      .map((pState: State): SettingsState => pState.settings)
      .map(this.transform(pKey))
  }

  private transform(pKey: string): (pSettingsState: SettingsState) => Setting {
    return (pSettingsState: SettingsState): Setting => pSettingsState[pKey]
  }
}
