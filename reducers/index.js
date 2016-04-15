import { combineReducers } from 'redux'
import Intent from './Intent'
import IntentProps from './IntentProps'

const voiceUIApp = combineReducers({
  Intent,
  IntentProps
})

export default voiceUIApp


