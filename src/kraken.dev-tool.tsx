import * as React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export const DevTool = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-m"
    changePositionKey="ctrl-q"
    defaultIsVisible={true}
  >
    <LogMonitor />
  </DockMonitor>
)
