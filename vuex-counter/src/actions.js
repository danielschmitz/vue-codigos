
export const incrementCounter = function ({ dispatch, state },callback) {
    setTimeout(function(){
        dispatch('INCREMENT')
        callback();
    },2000)
}

export const decrementCounter = function ({ dispatch, state }) {
    dispatch('DECREMENT')
}

export const incrementCounterWithValue = function ({ dispatch, state }, value) {

    let intValue = parseInt(value);
    if (isNaN(intValue)) {
        throw "Impossível converter para número inteiro"
    } else {
        dispatch('INCREMENTVALUE', intValue)
    }
}