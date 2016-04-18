import { connect } from 'react-redux'
import { updateIntentLabel } from '../actions'
import IntentDisplayOptions from '../components/IntentDisplayOptions'

const mapStateToProps = () => { return {} }

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateIntentLabelClick: (value) => {
      dispatch(updateIntentLabel(value))
    }
  }
}

const IntentNameDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntentDisplayOptions)

export default IntentNameDisplay