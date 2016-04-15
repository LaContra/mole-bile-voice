import { connect } from 'react-redux'
import { updateIntentLabel } from '../actions'
import IntentPropFields from '../components/IntentPropFields'

const mapStateToProps = () => { return {} }

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateIntentLabelClick: (event) => {
      dispatch(updateIntentLabel(event))
    }
  }
}

var IntentPropDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntentPropFields)

export default IntentPropDisplay