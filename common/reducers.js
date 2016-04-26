import { combineReducers } from 'redux'
import cyElements from '../cy_canvas/reducers/cyElements'
import cyStyle from '../cy_canvas/reducers/cyStyle'
import entities from '../entity_panel/reducers/entities'
import intentPropertiesPanel from '../property_panel/reducers/intentPropertiesPanel'
import intentControlPanel from '../property_panel/reducers/intentControlPanel'
import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.css'

const voiceUIApp = combineReducers({
  cyElements,
  cyStyle,
  entities,
  intentPropertiesPanel,
  intentControlPanel,
})

export default voiceUIApp


