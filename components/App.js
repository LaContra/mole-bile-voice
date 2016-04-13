import React from 'react'
import Panel from './Panel'
import CyReact from './CyReact'

const App = () => (
	<div>
		<Panel/>
		<CyReact containerId='react'/>
	</div>
)

// <div id="react" className="cy_container"></div>

export default App