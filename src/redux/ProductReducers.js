const ProductReducers = (state = [], action) => {
    if (action.type === 'PRODUCT') {
        state = action.arr
        return state
    } 
    if (action.type === 'LOGOUT') {
        return state = {}
    }
    return state
}

export default ProductReducers