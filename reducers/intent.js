const intent = (state = '', action) => {
  // TODO: return correct state: clear/add intents
  switch(action.type) {
    case 'CLEAR_INTENTS':
      console.log('clear intents');
      return state;
    case 'ADD_INTENT':
      console.log('add intent');
      return state;
    default:
      console.log('default state');
      return state;
  }
}

export default intent

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