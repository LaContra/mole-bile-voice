import React from 'react'
import Entity from '../containers/Entity'

const EntityList = ({ entities }) => (
  <div>
    {entities.map((entity, index) => 
      <Entity key={index}
        entityId={index}
        entity={entity} />
    )}
  </div>
)

export default EntityList