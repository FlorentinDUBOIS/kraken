import { Store } from 'redux'
import { Observable } from 'rxjs'

import { State } from '../../kraken.state'
import { IntlState } from './intl.state'
import { ActionType, Action } from './intl.action'
import { Language } from './intl.enum'
import { ObservableFactory } from '../observable/observable.factory'

export class IntlService {
  private $state$: Observable<State>

  public constructor(private $store: Store<State>) {
    this.$state$ = ObservableFactory.fromReduxStore(this.$store)
  }

  public translation(pKey: string): string {
    return this.transform(pKey)(this.$store.getState().intl)
  }

  public getObservableTranslation(pKey: string): Observable<string> {
    return this.$state$
      .map((pState: State): IntlState => pState.intl)
      .map(this.transform(pKey))
  }

  public changeCurrentLanguage(pCurrentLanguage: Language): void {
    this.$store.dispatch(
      {
        type: ActionType.CHANGE_CURRENT_LANGUAGE,
        language: pCurrentLanguage,
      } as Action
    )
  }

  public changeFallbackLanguage(pFallbackLanguage: Language): void {
    this.$store.dispatch(
      {
        type: ActionType.CHANGE_FALLBACK_LANGUAGE,
        language: pFallbackLanguage,
      } as Action
    )
  }

  private transform(pName: string): (pIntlState: IntlState) => string {
    return (pIntlState: IntlState): string => {
      const { currentLanguage, fallbackLanguage, translations } = pIntlState
      const languages = [currentLanguage, fallbackLanguage]

      for (const language of languages) {
        if (translations.has(language)) {
          if (translations.get(language).has(pName)) {
            return translations.get(language).get(pName)
          }
        }
      }

      return pName
    }
  }
}
