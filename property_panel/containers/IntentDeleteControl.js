import { connect } from 'react-redux'
import { clearIntents, deleteElements } from '../../common/actions'
import IntentDeleteButtons from '../components/IntentDeleteButtons'

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
    onDeleteClick: (elements) => {
      dispatch(deleteElements(elements))
    }
  }
}

const IntentDeteleControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntentDeleteButtons)

export default IntentDeteleControl