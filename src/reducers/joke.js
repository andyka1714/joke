const initialState = {
  jokeList: [],
  categories: []
}
const joke = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RANDOM_JOKE':
      return {
        ...state,
        jokeList: [...state.jokeList, action.jokeList]
      }
    case 'SET_JOKE':
      return {
        ...state,
        jokeList: [...action.jokeList]
      }
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: [...action.categories]
      }
    default:
      return state
  }
}

export default joke
