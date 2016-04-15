import { connect } from 'react-redux'
import { updateIntentLabel } from '../actions'
import IntentDisplayOptions from '../components/IntentDisplayOptions'

const mapStateToProps = () => { return {} }

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateIntentLabelClick: (event) => {
      dispatch(updateIntentLabel(event))
    }
  }
}

const IntentNameDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntentDisplayOptions)

export default IntentNameDisplay