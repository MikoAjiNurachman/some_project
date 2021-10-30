import {combineReducers, createStore} from 'redux'
import LoginReducers from './LoginReducers'
import storage from 'redux-persist/lib/storage/'
import { createTransform, persistReducer, persistStore } from 'redux-persist'
import CryptoJS from 'crypto-js'
import ProductReducers from './ProductReducers'

const keys = btoa("the SECRET_KEY")

const transform = createTransform(
    (inboundState, key) => {
        if (!inboundState) return inboundState
        let encrypt = CryptoJS.AES.encrypt(JSON.stringify(inboundState), keys)
        return encrypt.toString()
    },
    (outboundState, key) => {
        if (!outboundState) return outboundState
        let decrypt = CryptoJS.AES.decrypt(outboundState, keys)
        let decrypting =  decrypt.toString(CryptoJS.enc.Utf8)
        return JSON.parse(decrypting)
    }
)

const AllReducers = combineReducers({
    login: LoginReducers,
    Product: ProductReducers
})

const config = {
    key: btoa("Honshou"),
    storage,
    transforms: [transform]
}

const persistReduc = persistReducer(config, AllReducers)
const store = createStore(persistReduc)
const persisStore = persistStore(store)

export {
    store,
    persisStore
}