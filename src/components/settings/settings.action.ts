import * as redux from 'redux'

import { Setting } from './settings.type'

export enum ActionType {
  CHANGE_API_URI = Symbol('@@settings/CHANGE_API_URI') as any,
}

export interface Action extends redux.Action {
  type: ActionType
  setting: Setting
}
