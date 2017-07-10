import { Observable, Observer } from 'rxjs'
import { Store } from 'redux'

export class ObservableFactory {
  static fromReduxStore<T>(pStore: Store<T>): Observable<T> {
    return Observable.create((pObserver: Observer<T>): void => {
      pStore.subscribe(() => {
        pObserver.next(pStore.getState())
      })
    })
  }
}
