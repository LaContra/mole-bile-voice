const DefaultVisualStyle = [
  {
    selector: 'node',
    css: {
      'text-valign': 'center',
      'text-halign': 'center',
      'color': 'white',
      'text-outline-width': 2,
      'text-outline-color': '#888',
      'text-wrap': 'wrap',
      'text-max-width': '1000px',
    }
  }, 
  {
    selector: 'node.user_says',
    css: {
      'label': 'data(user_says)',
      'shape': 'triangle',
    }
  }, 
  {
    selector: 'node.response',
    css: {
      'label': 'data(response)',
      'shape': 'rectangle',
    }
  }, 
  {
    selector: 'edge',
    css: {
      'target-arrow-shape': 'triangle',
    }
  }, 
  {
    selector: 'edge.us2r',
    css: {
      'color': '#555',
      'line-color': '#555',
      'target-arrow-color': '#555',
    }
  },
  {
    selector: 'edge.r2us',
    css: {
      'color': '#ccc',
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
    }
  },
  {
    selector: ':selected',
    css: {
      'background-color': 'black',
      'line-color': 'black',
      'target-arrow-color': 'black',
      'source-arrow-color': 'black',
      'text-outline-color': 'black',
    }
  }
]

export default DefaultVisualStyle