const DefaultVisualStyle = [
  {
    selector: 'node',
    css: {
      'text-valign': 'center',
      'text-halign': 'center',
      'color': 'white',
      'text-outline-width': 2,
      'text-wrap': 'wrap',
      'text-max-width': '1000px',
    }
  }, 
  {
    selector: 'node.user_says',
    css: {
      'label': 'data(user_says)',
      'shape': 'triangle',
      'background-color': '#cd84f5',
      'text-outline-color': '#cd84f5',
    }
  }, 
  {
    selector: 'node.user_says:selected',
    css: {
      'background-color': '#4c0099',
      'text-outline-color': '#4c0099',
    }
  }, 
  {
    selector: 'node.response',
    css: {
      'label': 'data(response)',
      'shape': 'rectangle',
      'background-color': '#ffc162',
      'text-outline-color': '#ffc162',
    }
  }, 
  {
    selector: 'node.response:selected',
    css: {
      'background-color': '#995700',
      'text-outline-color': '#995700',
    }
  }, 
  {
    selector: 'edge',
    css: {
      'target-arrow-shape': 'triangle',
    }
  }, 
  {
    selector: 'edge',
    css: {
      'color': '#ccc',
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
    }
  },
  {
    selector: 'edge:selected',
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