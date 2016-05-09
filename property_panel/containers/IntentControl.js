import { connect } from 'react-redux'
import { addIntent, addUserSays, addResponse, addConversationComponent } from '../../common/actions'
import IntentButtons from '../components/IntentButtons'

const mapStateToProps = (state) => { return {} }

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIntentClick: () => {
      dispatch(addIntent())
    },
    onAddUserSaysClick: () => {
      dispatch(addUserSays())
    },
    onAddResponseClick: () => {
      dispatch(addResponse())
    },
    onAddConversationComponent: (cType) => {
      dispatch(addConversationComponent(cType))
    }
  }
}

const IntentControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntentButtons)

export default IntentControl