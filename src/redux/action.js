export const getData = (data,token) => {
    return {
        type: "GETDATA",
        data,
        token
    }
}
export const Logout = () => {
    return {
        type: "LOGOUT"
    }
}

export const products = (arr) => {
    return {
        type: "PRODUCT",
        arr
    }
}