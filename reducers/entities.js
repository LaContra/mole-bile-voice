const addReferenceDefinition = (entityList, entityId, ref) => {
  return entityList.map((entity, index) => {
    if (index != entityId) {
      return entity
    }
    return Object.assign({}, entity, {referenceDefinitions: [...entity.referenceDefinitions, ref]})
  })
}

const entities = (state, action) => {
  if (typeof state === 'undefined') {
    // const entities = LocalStorage.getElements("entities");
    // return entities == null? []: entities
    return []
  }

  switch(action.type) {
    case "ADD_ENTITY":
      return [...state, {
        entityName: '', 
        referenceDefinitions: [{
          value: '',
          synonyms: ''
        }]
      }]
    case "CHANGE_ENTITY_NAME":
      return state.map((entity, index) => {
        if (index == action.entityId) {
          return Object.assign({}, entity, {entityName: action.entityName});
        }
        return entity
      })
    // TODO
    case "SAVE_ENTITIES":
      return state
    case "ADD_REFERENCE_DEFINITION":
      return addReferenceDefinition(state, action.entityId, {
        value: '',
        synonyms: ''
      })
    default:
      return state
  }
}

export default entities