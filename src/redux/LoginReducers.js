const LoginReducers = (state = {}, action) => {
    if (action.type === 'GETDATA') {
        state = {data: action.data,token:action.token}        
        return state
    } else if (action.type === 'LOGOUT') {
        state = {data:{},token:null,product:{}}
        return state
    }
    return state
}
export default LoginReducers