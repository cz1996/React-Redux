function color(state = {color: ''}, action) {
  switch (action.type) {
    case 'CHANGE':
      console.log(action.color)
      return { color: action.color }
    default:
    console.log(action.color)
      return state
  }
}

export default color;