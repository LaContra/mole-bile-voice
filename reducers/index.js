import { combineReducers } from 'redux'
import nameDisplayFilter from './nameDisplayFilter'
import cyElements from './cyElements'
import cyStyle from './cyStyle'
import intentPropertyPanel from './intentPropertyPanel'

const voiceUIApp = combineReducers({
  nameDisplayFilter,
  cyElements,
  cyStyle,
  intentPropertyPanel
})

export default voiceUIApp


