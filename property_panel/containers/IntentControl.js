import { connect } from 'react-redux'
import { clearIntents, addIntent, addUserSays } from '../../common/actions'
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
    },
    onAddUserSaysClick: () => {
      dispatch(addUserSays())
    }
  }
}

const IntentControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntentButtons)

export default IntentControl