import { connect } from 'react-redux'
import { clearIntents } from '../actions'
import IntentButtons from '../components/IntentButtons'

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClearIntentsClick: () => {
      dispatch(clearIntents())
    }
  }
}

const IntentControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntentButtons)

export default IntentControl