import LocalStorage from '../utils/LocalStorage'

const unselectElement = (element) => {
  return Object.assign({}, element, {selected: false})
}

const modifyElement = (element, targetId, userSays, response) => {
  if (element.data.id !== targetId) {
    return element
  }
  return Object.assign({}, element, {data: {USER_SAYS: userSays, RESPONSE: response, id: targetId}})
}

const cyElements = (state, action) => {
  if (typeof state === 'undefined') {
    const localState = LocalStorage.getElements();
    console.log(localState)
    return localState == null? []:localState.nodes
  }

  switch(action.type) {
    /* panel control */
    case 'CLEAR_INTENTS':
      console.log('clear intents');
      return []

    case 'ADD_INTENT':
      return [ ...state.map(t => unselectElement(t)), {
          group: "nodes",
          data: { USER_SAYS: "", RESPONSE: "", id: action.id },
          position: {x: 100, y: 100},
      }]
      // TODO: position
      // position: { x: -this.state.cy.viewport().pan().x / this.state.cy.zoom() + 40, y: -this.state.cy.viewport().pan().y / this.state.cy.zoom() + 40 }

    case 'ADD_EDGE':
      console.log("add edge");
      return [ ...state.map(t => unselectElement(t)), {
          group: "edges",
          data: {source: action.source, target: action.target},
      }]
    
    case "SAVE_INTENT_PROPERTIES":
      console.log("save intent properties");
      return state.map(t => modifyElement(unselectElement(t), action.nodeId, action.userSays, action.response))

    // TODO: gaigai
    case "UPDATE_INTENT_LABEL":
      console.log("update label in panel");
      return state
      // value = evt.target.value)
      // this.state.cy.style().selector('node').style("label", "data(" + value + ")").update();

    // TODO: gaigai
    // modify intent info
    case 'SEND_CREATE_INTENT_REQUEST':
      console.log("send create intent request");
      return state
//   sendCreateCyIntentRequest: function() {
//     this.state.cy.nodes().map(function(node) {
//         console.log("submit " + node.data("user_says"));
//         // var data = {};
//         // data['name'] = node.id();
//         // data['templates'] = [node.data("user_says")];
//         // data['responses'] = [{'speech': node.data("response")}];

//         // $.ajax({
//         //     url: "https://api.api.ai/v1/intents?v=20160403",
//         //     beforeSend: function (request) {
//         //         request.setRequestHeader("Authorization", "Bearer key");
//         //     },
//         //     type: "POST",
//         //     data: JSON.stringify(data),
//         //     contentType: "application/json",
//         //     complete: function(e) { console.log(e)}
//         // });
//     });
//   },

    default:
      return state
  }
}

export default cyElements
