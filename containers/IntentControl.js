import { connect } from 'react-redux'
import { clearIntents, addIntent } from '../actions'
import IntentButtons from '../components/IntentButtons'

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClearIntentsClick: () => {
      dispatch(clearIntents())
    },
    onAddIntentClick: () => {
      dispatch(addIntent())
    }
  }
}

const IntentControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntentButtons)

export default IntentControl