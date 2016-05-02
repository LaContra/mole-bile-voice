import { connect } from 'react-redux'
import { clearIntents, addIntent, addUserSays, addResponse, deleteElements, addConversationComponent } from '../../common/actions'
import IntentButtons from '../components/IntentButtons'

const mapStateToProps = (state) => { 
  return {
    selectedElements: state.intentControlPanel.selectedElements
  }
}

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
    },
    onAddResponseClick: () => {
      dispatch(addResponse())
    },
    onDeleteClick: (elements) => {
      dispatch(deleteElements(elements))
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