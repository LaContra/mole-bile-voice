import { combineReducers } from 'redux'
import cyElements from './cyElements'
import cyStyle from './cyStyle'
import intentPropertiesPanel from './intentPropertiesPanel'
import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.css'


const voiceUIApp = combineReducers({
  cyElements,
  cyStyle,
  intentPropertiesPanel
})

export default voiceUIApp


