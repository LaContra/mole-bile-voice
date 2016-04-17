const DefaultVisualStyle = [
  {
    selector: 'node',
    css: {
      'label': 'data(user_says)',
      'text-valign': 'center',
      'text-halign': 'center',
      'color': 'white',
      'text-outline-width': 2,
      'text-outline-color': '#888',
      'shape': 'rectangle',
    }
  }, 
  {
    selector: '$node > node',
    css: {
      'padding-top': '10px',
      'padding-left': '10px',
      'padding-bottom': '10px',
      'padding-right': '10px',
      'text-valign': 'top',
      'text-halign': 'center',
      'background-color': '#bbb'
    }
  }, 
  {
    selector: 'edge',
    css: {
      'target-arrow-shape': 'triangle',
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