import { connect } from 'react-redux'
import { clearIntents } from '../../common/actions'
import IntentDeleteButtons from '../components/IntentDeleteButtons'

const mapStateToProps = (state) => { return {} }

const mapDispatchToProps = (dispatch) => {
  return {
    onClearIntentsClick: () => {
      if (confirm("Are you sure you want to clear all elements?")) {
        dispatch(clearIntents())
      }      
    }
  }
}

const IntentDeteleControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntentDeleteButtons)

export default IntentDeteleControl