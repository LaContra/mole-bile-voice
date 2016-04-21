import { combineReducers } from 'redux'
import nameDisplayFilter from './nameDisplayFilter'
import cyElements from './cyElements'
import cyStyle from './cyStyle'
import userSaysPropertyPanel from './userSaysPropertyPanel'
import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.css'


const voiceUIApp = combineReducers({
  nameDisplayFilter,
  cyElements,
  cyStyle,
  userSaysPropertyPanel
})

export default voiceUIApp


