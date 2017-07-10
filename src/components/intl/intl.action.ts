import * as redux from 'redux'

import { Language } from './intl.enum'

export enum ActionType {
  CHANGE_CURRENT_LANGUAGE = Symbol('@@intl/CHANGE_CURRENT_LANGUAGE') as any,
  CHANGE_FALLBACK_LANGUAGE = Symbol('@@intl/CHANGE_FALLBACK_LANGUAGE') as any,
}

export interface Action extends redux.Action {
  type: ActionType
  language: Language
}
