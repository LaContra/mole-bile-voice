import React from 'react'
import Toolbar from '../toolbar/components/Toolbar'
import Panel from '../property_panel/components/Panel'
import CyReact from '../cy_canvas/containers/CyReact'
import EntityPanel from '../entity_panel/containers/EntityPanel'

const App = () => (
	<div>
    <Toolbar />
		<Panel/>
		<CyReact containerId='react'/>
    <EntityPanel />
	</div>
)

export default App