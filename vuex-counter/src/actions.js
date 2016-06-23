
export const incrementCounter = function ({ dispatch, state }) {
  dispatch('INCREMENT')
}

export const decrementCounter = function ({ dispatch, state }) {
  dispatch('DECREMENT')
}