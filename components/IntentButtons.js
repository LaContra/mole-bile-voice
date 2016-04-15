import React, { PropTypes } from 'react'

const IntentButtons = ({ onClearIntentsClick }) => (
  <div>
    <div>
      <button 
        id="clear_btn" 
        className="btn btn-default" 
        onClick={() => onClearIntentsClick()}>Clear
      </button>
    </div>
    <div>
      <button 
        id="add_intent_btn" 
        className="btn btn-default">Create Intent
      </button>
    </div>
  </div>
)

IntentButtons.propTypes = {
  onClearIntentsClick: PropTypes.func.isRequired
}

// var IntentButtons = React.createClass({
//     // TODO
//     /* panel control */
//     clearIntents: function() {
//         if (confirm("Are you sure you want to clear all elements?")) {
//             // cy.elements().remove();
//             var removeIntents = window.removeIntents;
//             removeIntents();
//         }
//     },

//     // TODO
//     // add intent
//     addIntents: function() {
//         var unselectElements = window.unselectElements;
//         unselectElements();
//     },

//     render: function() {
//         return (
//             <div>
//                 <div>
//                     <button id="clear_btn" className="btn btn-default" onClick={this.clearIntents}>Clear</button>
//                 </div>
//                 <div>
//                     <button id="add_intent_btn" className="btn btn-default" onClick={this.addIntents}>Create Intent</button>
//                 </div>
//             </div>
//         );
//     }
// });

export default IntentButtons