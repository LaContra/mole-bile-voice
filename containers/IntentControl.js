import { connect } from 'react-redux'
import { clearIntents, addIntent } from '../actions'
import IntentButtons from '../components/IntentButtons'

const mapStateToProps = () => { return {} }

const mapDispatchToProps = (dispatch) => {
  return {
    onClearIntentsClick: () => {
      if (confirm("Are you sure you want to clear all elements?")) {
        dispatch(clearIntents())
      }      
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