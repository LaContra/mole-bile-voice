import React, { PropTypes } from 'react'

const ResponseProperty = ({ panel, onSaveResponsePropertiesClick, onResponseChange }) => (
  <form id="response_info" 
    action="#" 
    hidden={ panel.hideProperty }
    onSubmit={e => {
      e.preventDefault(); 
      onSaveResponsePropertiesClick(panel.selectedNode, e.target.user_says.value);
    }} >
    <label>Response</label>
    <textarea 
      className="form-control" 
      name="user_says" 
      rows={ panel.text.split("\n").length }
      value={ panel.text }
      onChange={e => onResponseChange(e.target.value)} />
    <button className="btn btn-default" type="submit">Save</button>
  </form>
)

ResponseProperty.propTypes = {
  panel: PropTypes.shape({
    hideProperty: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    selectedNode: PropTypes.number.isRequired
  }).isRequired,
  onSaveResponsePropertiesClick: PropTypes.func.isRequired,
  onResponseChange: PropTypes.func.isRequired,
}

export default ResponseProperty