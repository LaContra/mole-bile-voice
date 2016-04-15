import { connect } from 'react-redux'
import { saveIntentProperties } from '../actions'
import IntentProperty from '../components/IntentProperty'

const mapStateToProps = () => { return {} }

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveIntentPropertiesClick: () => {
      dispatch(saveIntentProperties())
    }
  }
}

const IntentPropertyControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntentProperty)

export default IntentPropertyControl