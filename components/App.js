import React from 'react'
import Panel from './Panel'
import CyReact from '../containers/CyReact'
import EntityPanel from './EntityPanel'

const App = () => (
	<div>
		<Panel/>
		<CyReact containerId='react'/>
    <EntityPanel />
	</div>
)

export default App