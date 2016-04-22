import { combineReducers } from 'redux'
import cyElements from './cyElements'
import cyStyle from './cyStyle'
import entities from './entities'
import intentPropertiesPanel from './intentPropertiesPanel'
import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.css'


const voiceUIApp = combineReducers({
  cyElements,
  cyStyle,
  entities,
  intentPropertiesPanel
})

export default voiceUIApp


