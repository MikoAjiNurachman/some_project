import React, {useCallback, useEffect, useRef, useState} from 'react'
import Headers from './../templates/headers'
import './../assets/product.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Logout,products } from '../redux/action'
import Pagination from '../Pagination'
import { confirmAlert } from 'react-confirm-alert'
import ContentExport from '../ContentExport'
import Modal from '../templates/Modal'

export default function Index() {
    const dispatch = useDispatch()
    const search = useRef('')
    const date_start = useRef()
    const date_end = useRef()
    const [between,setBetween] = useState()
    var product_code = useRef('')
    const packaging = useRef('')
    const product_name = useRef('')
    const product_desc = useRef('')
    const l_market = useRef('')
    const product_status = useRef('')
    const ctgy = useRef('')
    const created_at = useRef('')
    const update_at = useRef('')
    const [product_qty,setProductQty] = useState('')
    const [buying_price,setBuyingPrice] = useState('')
    const [selling_price,setSellingPrice] = useState('')
    const [start,setStart] = useState(0)
    const [dataLength,setDataLength] = useState(0)
    const limit = 5
    const countBox = 5
    const [end,setEnd] = useState(0)
    const [currentPage,setCurrentPage] = useState(1)
    const selector = useSelector(state => state)
    const active = 'product'
    const [stateSearch, setStateSearch] = useState(false)
    const [editState, setEditState] = useState('')
    const [FillProduct, setFillProduct] = useState([])
    const [defaultProduct,setDefaultProduct] = useState([])
    const [product,setProduct] = useState([])
    const [productAct,setProductAct] = useState(false)
    const [button,setButton] = useState('add')
    const [modal,setModal] = useState(false)
    const [zeroData,setZeroData] = useState(false)
    const [exportPage,setExportPage] = useState(false)
    const [validty,setValidty] = useState(false)

    const USE = useCallback(async (url,method,data) => {
        let settingFetch = {}
        if (method === 'POST') {
            settingFetch = {
                method: method,
                body: data,
                headers: {'Content-Type':'application/json', 'Authorization': selector.login.token}
            }
        } else if (method === 'GET' || method === 'DELETE') {
            settingFetch = {
                method: 'GET',
                headers: {'Content-Type':'application/json', 'Authorization': selector.login.token}
            }
        }
        const fetchPost = await fetch(`http://localhost:8080/${url}/`, settingFetch)
        if (fetchPost.status === 500) {
            dispatch(Logout())
        }
        const response = await fetchPost.json()
        if (method === 'POST' || method === 'DELETE') {
            response.status === 200 ? toast.success(response.message) : toast.dark(response.message)
        }
        if (method === 'GET') {
            return response
        }
    },[selector.login.token,dispatch])
    useEffect(() => {
        const fetchingProduct = async () => {
            const f = await fetch(`http://localhost:8080/getProduct/${selector.login.data.user_id}/`,
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': selector.login.token}
            })
            const fetchers = await f.json()
            const arrS = (stateSearch === true ? FillProduct: fetchers.length === undefined ? [] : fetchers)
            const arrslice = arrS.slice(start, end)
            if (zeroData && arrslice.length < 1) {
                setCurrentPage(prevState => prevState--)
                setStart(prevStart => {
                    let num = 0
                    if (prevStart > 0) {
                        num = prevStart-limit 
                    }
                    return num
                })
                setEnd(prevEnd => {
                    let num = limit
                    if (prevEnd > limit) {
                        num = prevEnd-limit 
                    }
                    return num
                })
            }
            setDataLength(stateSearch === true ? FillProduct.length : fetchers.length)
            setProduct(arrslice)
            setDefaultProduct(fetchers)
            dispatch(products(fetchers))
        }
        fetchingProduct()
    },[start,end,productAct,selector.login,dispatch,zeroData,FillProduct,stateSearch])
    useEffect(() => {
        if (FillProduct.length > 0 && product.length < 1) {
            setCurrentPage(1)
            setStart(0)
            setEnd(limit)
        }
    },[FillProduct,product])
    const resetById = (arrId) => {
        arrId.forEach(el => {
            let dom = document.getElementById(el)
            if (dom === null) return
            dom.value = ""
        })
    }
    const validNumber = (e,name) => {
        if (e.target.validity.patternMismatch) {
            return e.target.value = null
        } else {
            if (name === 'qty') {
                setProductQty(e.target.value)
            } else if (name === 'buy') {
                setBuyingPrice(e.target.value)
            } else if (name === 'sell') {
                setSellingPrice(e.target.value)
            }
            return Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(e.target.value)
        }
    }
    const actionButton = async (type, dataParameter) => {
        let code = ""
        code = product_code.current.value === "" ? "kosong" : product_code.current.value
        if (product_name.current.value === "" || packaging.current.value === "" || ctgy.current.value === "***Product Category" || product_qty === "") return toast.warn(`Product Name, packaging, description, Quantity, and Category are required !`)
        let data = JSON.stringify({
            code,
            user_id: selector.login.data.user_id,
            pack: packaging.current.value,
            name: product_name.current.value,
            qty: product_qty.toString(),
            desc: product_desc.current.value,
            ctgy: ctgy.current.value,
            l_market: l_market.current.value,
            status: product_status.current.value,
            buy_p: buying_price.toString(),
            sel_p: selling_price.toString()
        })
        if (dataParameter) data = dataParameter
        if (type === 'save') {
            await USE('saveProduct','POST',data)
        } else if (type === 'update') {
            await USE('updateProduct','POST',data)
            search.current.value = ""
            setStateSearch(false)
        } else {
            let c = product_code.current.value
            confirmAlert({
                customUI: ({onClose}) => {
                  return (
                    <div className="custom-ui">
                        <h1>Are you sure ?</h1>
                        <p>Do you want to delete this ?</p>
                        <div>
                        <button className="btn-confirm-no" onClick={onClose}>No</button>
                        <button className="btn-confirm-yes" onClick={async () => {
                            await USE(`deleteProduct/${c}`,'DELETE')
                            setZeroData(true)
                            reset()
                            onClose()
                        }}>Yes</button>
                        </div>
                    </div>
                  )
                }
            })
        }
        reset()
    }

    useEffect(() => {
        setEnd(limit)
    },[])

    const reset = () => {
        setButton('add')
        setEditState('')
        setValidty(false)
        setProductAct((prevState) => !prevState)
        document.querySelector('.boxed').removeAttribute('style')
        document.querySelectorAll('.input-left-product').forEach(element => {
            element.removeAttribute('style')
        })
        document.querySelectorAll('.input-timestamp').forEach(element => {
            element.removeAttribute("readOnly")
            element.removeAttribute('style')
            element.setAttribute("disabled","")
        })
        product_code.current.value = ""
        packaging.current.value = ""
        product_name.current.value = ""
        setProductQty("")
        product_desc.current.value = ""
        ctgy.current.value = "***Product Category"
        l_market.current.value = ""
        product_status.current.value = "active"
        setBuyingPrice("")
        setSellingPrice("")
        created_at.current.value = ""
        update_at.current.value = ""
    }
    const rowForm = (id) => {
        setButton('notAdd')
        setEditState('notEditable')
        let form = document.querySelector('.boxed')
        form.setAttribute("style", "background-color:#f1f1f1;")
        document.querySelectorAll('.input-left-product').forEach(element => {
            element.setAttribute("style", "background-color:#f1f1f1;")
        })
        document.querySelectorAll('.input-timestamp').forEach(element => {
            element.removeAttribute("disabled")
            element.setAttribute("style", "background-color:#f1f1f1;")
            element.setAttribute("readonly", "true")
        })
        const arr = (stateSearch === true ? FillProduct: product).find(element => element.product_id === id)
        product_code.current.value = arr.product_id
        packaging.current.value = arr.packaging
        product_name.current.value = arr.product_name
        product_name.current.value = arr.product_name
        setProductQty(arr.product_qty)
        product_desc.current.value = arr.product_desc
        ctgy.current.value = arr.ctgy_id
        l_market.current.value = arr.launch_market
        product_status.current.value = arr.product_status
        setBuyingPrice(arr.buying_price)
        setSellingPrice(arr.selling_price)
        created_at.current.value = arr.created_at
        update_at.current.value = arr.update_at
    }
    const searchProduct = () => {
        let searchVal = search.current.value
        if (searchVal === "") {
            return setStateSearch((prevState) => !prevState)
        }
        let searchstr = escape(searchVal).trim().replace(/%20/g, ' ')
        let rgExp = new RegExp(`${searchstr}`,`gmsi`)
        const arr = defaultProduct.filter(element => {
            const boolId = rgExp.test(element.product_id)
            const boolName = rgExp.test(element.product_name)
            return boolId || boolName
        })
        setFillProduct((prevState) => {
            setStateSearch(true)
            return ([...prevState], arr)
        })
    }
    const doExport = (type) => {
        if (date_start.current.value === "" || date_end.current.value === "") {
            return toast.warn(`field can't be null !`)
        }
        setBetween({start:date_start.current.value, end: date_end.current.value})
        setExportPage(type)

    }
    const someHandle = (e,type) => {
        if (type === 'category') {
            if (e.target.value === '***Product Category') return setValidty(false)
        } else {
            if (e.target.value === 'active') return setValidty(false)
        }
        setValidty(true)
    }
    const backModal = () => {
        const arr = ["f_date","l_date"]
        resetById(arr)
        setModal((prevState) => !prevState)
    }
    const pen = () => {
        setEditState('editable')
        document.querySelector('.boxed').removeAttribute('style')
        document.querySelectorAll('.input-left-product').forEach(element => {
            element.removeAttribute('style')
        })
        document.querySelectorAll('.input-timestamp').forEach(element => {
            element.removeAttribute('style')
        })
    }
    const getDateNowToString = () => {
        let dateobj = new Date()
        let getZero = (number) => {
            return 0 < number && number < 10 ? "0"+number : number 
        }
        return (dateobj.getFullYear()+"-"+getZero(dateobj.getMonth()+1)+"-"+getZero(dateobj.getDate())).toString()
    }
    return (
        <>
        {exportPage === false ?<>
            <Headers active={active} validty={validty}/>
            <div className="product-content">
                <div className="product-list">
                    <form onSubmit={e => e.preventDefault()} className="search-box">
                        <input onChange={searchProduct} type="search" ref={search} required placeholder="Search Product Code or Product Name here . . . "/>
                        <div className="svg-search">
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.7068 23.2226L16.8818 16.1133C18.2038 14.4123 18.9998 12.2509 18.9998 9.89673C18.9998 4.44053 14.7378 0.000976562 9.49988 0.000976562C4.26193 0.000976562 0 4.44048 0 9.89668C0 15.3529 4.26197 19.7924 9.49992 19.7924C11.7599 19.7924 13.8349 18.9633 15.4678 17.5862L22.2928 24.6955C22.4878 24.8986 22.7438 25.0007 22.9998 25.0007C23.2558 25.0007 23.5118 24.8986 23.7068 24.6955C24.0978 24.2882 24.0978 23.6299 23.7068 23.2226ZM9.49992 17.7091C5.36395 17.7091 2 14.205 2 9.89668C2 5.58837 5.36395 2.08426 9.49992 2.08426C13.6359 2.08426 16.9998 5.58837 16.9998 9.89668C16.9998 14.205 13.6359 17.7091 9.49992 17.7091Z" fill="black"/>
                            </svg>
                        </div>
                    </form>
                    <div className="list-box-container">
                        <div className="list-box">
                            {product.length > 0 ? product.forEach(element => (
                            <div key={element.product_id} onClick={() => rowForm(element.product_id)} className="product-item">
                                <div className="left-item">
                                    <span style={{display:"flex", width:"200px"}}><span style={{ width: "200px", fontWeight: "bold" }}>Product Code</span><span style={{width: "200px"}}>{element.product_id}</span></span>
                                    <small style={{display:"flex", width:"200px"}}><small style={{ width: "200px",fontWeight: "bold" }}>Product Name</small><small style={{width: "200px"}}>{element.product_name}</small></small>
                                </div>
                                <div className="left-item">
                                <small style={{display:"flex", width:"200px"}}><small style={{ width: "200px", fontWeight: "bold" }}>Packaging</small><small style={{width: "200px"}}>{element.packaging}</small></small>
                                <span style={{display:"flex", width:"200px"}}><span style={{ width: "200px", fontWeight: "bold" }}>Qty</span><span style={{width: "200px"}}>{element.product_qty}</span></span>
                                </div>
                            </div>
                            )): <div className="product-null">Empty !</div>}
                        {(stateSearch === true ? FillProduct : defaultProduct).length > limit ? <Pagination className="pagination-product" currentPage={currentPage} setCurrentPage={setCurrentPage} dataLength={dataLength} limit={limit} setStart={setStart} setEnd={setEnd} countBox={countBox}/>:""}
                        </div>
                    </div>
                </div>
                <div className="product-form">
                    <div className="button-form">
                        <i onClick={() => setModal(true)} className="export tooltip" data-tooltip="Export to. . .">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0ZM39.0625 33.5938C39.0625 36.1784 36.9597 38.2812 34.375 38.2812H17.1875C14.6028 38.2812 12.5 36.1784 12.5 33.5938V16.4062C12.5 13.8216 14.6028 11.7188 17.1875 11.7188H25C25.8629 11.7188 26.5625 12.4184 26.5625 13.2812C26.5625 14.1441 25.8629 14.8438 25 14.8438H17.1875C16.326 14.8438 15.625 15.5447 15.625 16.4062V33.5938C15.625 34.4553 16.326 35.1562 17.1875 35.1562H34.375C35.2365 35.1562 35.9375 34.4553 35.9375 33.5938V25.7812C35.9375 24.9184 36.6371 24.2188 37.5 24.2188C38.3629 24.2188 39.0625 24.9184 39.0625 25.7812V33.5938ZM38.9117 17.0725C38.7475 17.4205 38.8043 17.3115 35.4798 20.6361C35.1747 20.9412 34.7749 21.0938 34.375 21.0938C32.9955 21.0938 32.2831 19.4135 33.2702 18.4265L33.6966 18.0001C29.7054 18.3453 26.5625 21.7021 26.5625 25.7812C26.5625 26.6441 25.8629 27.3438 25 27.3438C24.1371 27.3438 23.4375 26.6441 23.4375 25.7812C23.4375 19.9613 28.0068 15.1892 33.7463 14.8622L33.2701 14.386C32.6599 13.7759 32.6599 12.7865 33.2701 12.1764C33.8803 11.5661 34.8696 11.5661 35.4798 12.1764C38.875 15.5716 38.7856 15.4276 38.9435 15.8084C39.1186 16.2318 39.0931 16.6893 38.9117 17.0725V17.0725Z" fill="black"/>
                            </svg>
                        </i>
                        <div className="button-float-group">
                            <i hidden={button === 'add'} onClick={reset} className="export tooltip" data-tooltip="Reset">
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.838 33.4254C24.8383 33.4254 24.8385 33.4254 24.8388 33.4254C24.8323 33.4254 24.8258 33.4252 24.8193 33.4252C24.8256 33.4252 24.8318 33.4254 24.838 33.4254Z" fill="black"/>
                                    <path d="M25 0C11.2149 0 0 11.2149 0 25C0 38.7851 11.2149 50 25 50C38.7851 50 50 38.7851 50 25C50 11.2149 38.7851 0 25 0ZM36.8555 33.0972C36.7298 33.8047 36.1557 34.5124 35.2384 35.0899C32.8709 36.5805 30.175 37.4041 26.8731 37.6363C26.7972 37.6419 26.7211 37.6465 26.6452 37.6514C26.5188 37.6591 26.3924 37.667 26.2642 37.6729C26.0771 37.6822 25.8894 37.6892 25.7015 37.6946C25.6615 37.6957 25.6215 37.6971 25.5814 37.6981C25.3352 37.704 25.0887 37.7072 24.8416 37.7072C24.8409 37.7072 24.8409 37.7072 24.8403 37.7072C23.2119 37.7072 21.6003 37.5283 20.0377 37.1798C20.797 38.4066 20.4867 40.0279 19.2956 40.8783C18.8091 41.2258 18.2482 41.3928 17.6927 41.393C16.8307 41.393 15.9814 40.9906 15.4423 40.2355L11.3413 34.492C10.6996 33.5936 10.5425 32.4617 10.921 31.4642C11.2993 30.4668 12.1678 29.7242 13.2442 29.4775L20.1221 27.8996C21.6093 27.5577 23.0913 28.4873 23.4323 29.9743C23.7227 31.2392 23.092 32.4977 21.9826 33.0562C22.92 33.2091 23.8767 33.2873 24.838 33.2873C27.32 33.2873 29.0671 32.8133 31.8209 31.8175C31.9699 31.7635 32.1152 31.7105 32.2568 31.6587C33.3333 31.2648 34.1834 30.9537 34.9126 30.9537C35.5695 30.9537 36.0754 31.2126 36.5043 31.7682C36.821 32.1787 36.9391 32.6257 36.8555 33.0972ZM39.0793 18.5358C38.701 19.5331 37.8325 20.2758 36.7561 20.5225L29.8782 22.1004C29.6703 22.1482 29.4624 22.1711 29.258 22.1711C27.9992 22.1711 26.8613 21.305 26.568 20.0258C26.2776 18.7609 26.9083 17.5025 28.0177 16.9439C27.0802 16.791 26.1236 16.7128 25.1623 16.7128C22.6802 16.7128 20.9331 17.1869 18.1794 18.1826C18.0304 18.2366 17.8851 18.2896 17.7435 18.3414C16.667 18.7354 15.8169 19.0464 15.0877 19.0464C14.4308 19.0464 13.9249 18.7876 13.496 18.2319C13.1791 17.8215 13.061 17.3746 13.1446 16.903C13.2703 16.1956 13.8445 15.4878 14.7617 14.9104C17.5977 13.1244 20.9014 12.2928 25.1584 12.2928C26.7874 12.2928 28.3996 12.4717 29.9624 12.8202C29.2032 11.5934 29.5134 9.9721 30.7044 9.12169C31.9457 8.23522 33.6711 8.52279 34.5577 9.7645L38.6587 15.508C39.3006 16.4064 39.4577 17.5384 39.0793 18.5358Z" fill="black"/>
                                </svg>
                            </i>
                            <i hidden={button === 'add'} onClick={() => actionButton('delete')} className="trash tooltip" data-tooltip="Delete Data">
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M32.2575 19.7832H17.7418C17.4131 19.7832 17.1453 20.0511 17.1453 20.3797V35.0947C17.1453 35.4234 17.4131 35.6913 17.7418 35.6913H32.2575C32.5862 35.6913 32.8541 35.4234 32.8541 35.0947V20.3797C32.8541 20.0505 32.5862 19.7832 32.2575 19.7832ZM20.8242 33.5037C20.8242 33.833 20.5569 34.1003 20.2276 34.1003C19.8983 34.1003 19.6311 33.833 19.6311 33.5037V22.1694C19.6311 21.8401 19.8983 21.5728 20.2276 21.5728C20.5569 21.5728 20.8242 21.8401 20.8242 22.1694V33.5037ZM23.2103 33.5037C23.2103 33.833 22.9431 34.1003 22.6138 34.1003C22.2845 34.1003 22.0172 33.833 22.0172 33.5037V22.1694C22.0172 21.8401 22.2845 21.5728 22.6138 21.5728C22.9431 21.5728 23.2103 21.8401 23.2103 22.1694V33.5037ZM25.5965 33.5037C25.5965 33.833 25.3293 34.1003 25 34.1003C24.6707 34.1003 24.4034 33.833 24.4034 33.5037V22.1694C24.4034 21.8401 24.6707 21.5728 25 21.5728C25.3293 21.5728 25.5965 21.8401 25.5965 22.1694V33.5037ZM27.9827 33.5037C27.9827 33.833 27.7154 34.1003 27.3862 34.1003C27.0563 34.1003 26.7896 33.833 26.7896 33.5037V22.1694C26.7896 21.8401 27.0563 21.5728 27.3862 21.5728C27.7154 21.5728 27.9827 21.8401 27.9827 22.1694V33.5037ZM30.3689 33.5037C30.3689 33.833 30.1016 34.1003 29.7723 34.1003C29.4424 34.1003 29.1758 33.833 29.1758 33.5037V22.1694C29.1758 21.8401 29.4424 21.5728 29.7723 21.5728C30.1016 21.5728 30.3689 21.8401 30.3689 22.1694V33.5037Z" fill="#DC3545"/>
                                    <path d="M32.2576 14.6356H27.9822C27.6529 14.6356 27.3857 14.3684 27.3857 14.0391V13.5189C27.3857 13.1902 27.1178 12.9224 26.7891 12.9224H23.2098C22.8812 12.9224 22.6133 13.1902 22.6133 13.5189V14.0391C22.6133 14.3684 22.3461 14.6356 22.0168 14.6356H17.7413C17.4126 14.6356 17.1448 14.9035 17.1448 15.2322V15.9051C17.1448 16.2338 17.4126 16.5016 17.7413 16.5016H32.257C32.5857 16.5016 32.8536 16.2338 32.8536 15.9051V15.2322C32.8542 14.9035 32.5863 14.6356 32.2576 14.6356Z" fill="#DC3545"/>
                                    <path d="M25 0C11.1924 0 0 11.193 0 25.0006C0 38.8082 11.193 50 25 50C38.807 50 50 38.8076 50 25.0006C50 11.193 38.807 0 25 0ZM34.0472 35.0941C34.0472 36.0802 33.2442 36.8838 32.2576 36.8838H17.7418C16.7552 36.8838 15.9522 36.0802 15.9522 35.0941V20.3798C15.9522 19.3931 16.7552 18.5901 17.7418 18.5901H32.2576C33.2442 18.5901 34.0472 19.3931 34.0472 20.3798V35.0941ZM34.0472 15.9057C34.0472 16.8924 33.2442 17.6953 32.2576 17.6953H17.7418C16.7552 17.6953 15.9522 16.8924 15.9522 15.9057V15.2328C15.9522 14.2461 16.7552 13.4431 17.7418 13.4431H21.4219C21.4619 12.4916 22.2487 11.7299 23.2098 11.7299H26.789C27.7495 11.7299 28.5375 12.4916 28.5769 13.4431H32.257C33.2431 13.4431 34.0466 14.2461 34.0466 15.2328L34.0472 15.9057Z" fill="#DC3545"/>
                                </svg>
                            </i>
                            <i hidden={button === 'add' || editState === 'editable'} onClick={pen} className="edit tooltip" data-tooltip="Edit Data">
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="edit-svg" d="M50 25C50 38.8073 38.8073 50 25 50C11.1927 50 0 38.8073 0 25C0 11.1927 11.1927 0 25 0C38.8073 0 50 11.1927 50 25Z" fill="#FFC107"/>
                                    <path d="M39.8537 10.1463C38.562 8.855 36.845 8.14355 35.0185 8.14355C33.1921 8.14355 31.4751 8.855 30.1834 10.1463L11.525 28.8051C11.3464 28.9836 11.2171 29.2049 11.1496 29.4483L8.21839 39.9772C8.07648 40.4876 8.22106 41.035 8.5968 41.4085C8.87528 41.6854 9.24797 41.835 9.62982 41.835C9.76334 41.835 9.898 41.8167 10.03 41.7793L20.5593 38.7885C21.0583 38.6466 21.4455 38.2511 21.5763 37.749C21.7072 37.2466 21.5626 36.7126 21.1964 36.3452L14.6721 29.8011L29.9107 14.5622L35.4343 20.0862L23.7083 31.7798C23.1358 32.3512 23.1342 33.2786 23.7057 33.8516C24.2771 34.4245 25.2045 34.4257 25.7774 33.8542L39.8537 19.8165C41.1453 18.5249 41.8564 16.8079 41.8564 14.9814C41.8564 13.1549 41.1449 11.4379 39.8537 10.1463V10.1463ZM17.3637 36.6504L11.7413 38.2476L13.316 32.59L17.3637 36.6504ZM37.7834 17.7432L37.5088 18.0171L31.982 12.4908L32.2552 12.218C32.9933 11.4799 33.9745 11.0732 35.0185 11.0732C36.0626 11.0732 37.0438 11.4799 37.7819 12.218C38.52 12.9562 38.9267 13.9373 38.9267 14.9814C38.9267 16.0251 38.52 17.0066 37.7834 17.7432Z" fill="white"/>
                                </svg>
                            </i>
                            <i hidden={button === 'add' || editState === 'notEditable'} onClick={() => actionButton('update')} className="edit tooltip" data-tooltip="Update Data">
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="edit-svg" d="M25.0001 50.0001C38.8072 50.0001 50.0001 38.8072 50.0001 25.0001C50.0001 11.1929 38.8072 0 25.0001 0C11.1929 0 0 11.1929 0 25.0001C0 38.8072 11.1929 50.0001 25.0001 50.0001Z" fill="#B6E2EB"/>
                                    <path d="M27.3966 18.5525H30.2088C30.4847 18.5525 30.7094 18.3279 30.7094 18.0516V11.7868C30.7094 11.5093 30.4853 11.2859 30.2088 11.2859H27.3966C27.1207 11.2859 26.8969 11.5089 26.8969 11.7868V18.0516C26.8973 18.3278 27.1206 18.5525 27.3966 18.5525ZM32.3646 10.2061H17.8316C17.8316 10.2061 16.5033 19.8638 18.3017 19.8638H31.9706C33.7684 19.8639 32.3646 10.2061 32.3646 10.2061Z" fill="#BFBEBE"/>
                                    <path d="M27.3967 18.5525H30.2089C30.4848 18.5525 30.7095 18.3279 30.7095 18.0516V11.7868C30.7095 11.5093 30.4853 11.2859 30.2089 11.2859H27.3967C27.1208 11.2859 26.8969 11.5089 26.8969 11.7868V18.0516C26.8973 18.3278 27.1207 18.5525 27.3967 18.5525ZM34.6665 10.2061H32.3647V18.5946C32.3647 19.2863 31.8042 19.8472 31.1113 19.8472H19.083C18.3918 19.8472 17.8312 19.2863 17.8312 18.5946V10.2061H14.396C12.5967 10.2061 11.1405 11.6635 11.1405 13.4616V33.8583C11.1405 35.6568 12.5967 37.1136 14.396 37.1136H35.2254C37.0232 37.1136 38.4798 35.6569 38.4798 33.8583V14.0195L34.6665 10.2061Z" fill="#357180"/>
                                    <path d="M34.1624 26.0403C34.1624 26.0403 34.0918 26.0403 17.4184 26.0403C16.8337 26.0758 16.5985 26.3071 16.4153 26.5898C16.2413 26.8749 16.1927 27.2305 16.1852 27.3573C16.1821 27.3928 16.1841 27.401 16.1841 27.401V35.387C16.1841 35.6286 15.9863 35.8244 15.7459 35.8244C15.5039 35.8244 15.3065 35.6286 15.3065 35.387V27.401C15.3085 27.3655 15.3042 26.8836 15.5556 26.3423C15.7917 25.8015 16.3901 25.1951 17.3806 25.1647H17.3865H17.3994C34.0922 25.1636 34.1629 25.1636 34.1629 25.1636V25.1647C34.4049 25.1647 34.601 25.3605 34.601 25.6033C34.6006 25.8445 34.4045 26.0403 34.1624 26.0403Z" fill="#2F6E77"/>
                                    <path opacity="0.4" d="M27.4388 27.8769L18.6318 22.0484L28.9855 6.40283L37.7937 12.2327L27.4388 27.8769Z" fill="url(#paint0_linear)"/>
                                    <path d="M34.3006 41.0247C37.8508 41.0247 40.7288 38.1467 40.7288 34.5965C40.7288 31.0462 37.8508 28.1682 34.3006 28.1682C30.7503 28.1682 27.8723 31.0462 27.8723 34.5965C27.8723 38.1467 30.7503 41.0247 34.3006 41.0247Z" fill="#0EA24A"/>
                                    <path d="M35.4891 31.2607H33.5228V38.0956H35.4891V31.2607Z" fill="white"/>
                                    <path d="M37.926 33.6924H31.0912V35.6583H37.926V33.6924Z" fill="white"/>
                                </svg>
                            </i>
                            <i hidden={button === 'notAdd'} onClick={() => actionButton('save')} className="add tooltip" data-tooltip="Add Data">
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="add-svg" d="M25 0C11.2144 0 0 11.2144 0 25C0 38.7856 11.2144 50 25 50C38.7856 50 50 38.7856 50 25C50 11.2144 38.7856 0 25 0Z" fill="#28A745"/>
                                    <path d="M35.9375 27.0832H27.0832V35.9374C27.0832 37.0876 26.1501 38.0207 25 38.0207C23.8498 38.0207 22.9167 37.0876 22.9167 35.9374V27.0832H14.0625C12.9123 27.0832 11.9792 26.1501 11.9792 25C11.9792 23.8498 12.9123 22.9167 14.0625 22.9167H22.9167V14.0625C22.9167 12.9123 23.8498 11.9792 25 11.9792C26.1501 11.9792 27.0832 12.9123 27.0832 14.0625V22.9167H35.9375C37.0876 22.9167 38.0207 23.8498 38.0207 25C38.0207 26.1501 37.0876 27.0832 35.9375 27.0832V27.0832Z" fill="#FAFAFA"/>
                                </svg>
                            </i>
                        </div>
                    </div>
                    <div className="form-box">
                        <div className="boxed">
                            <div style={{display:"flex",justifyContent:"space-between",margin: "30px 0"}}>
                                <div className="form-group">
                                {button !== 'add'? <input required className="input-left-product" readOnly ref={product_code} type="text"/> : <input required className="input-left-product" ref={product_code} type="text"/>}
                                    <label>Product Code</label>
                                </div>
                                <div className="form-group">
                                    <input ref={packaging} readOnly={editState === 'notEditable'} required className="input-left-product" type="text"/>
                                    <label>***Packaging</label>
                                </div>
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between",margin: "25px 0"}}>
                            <div className="form-group">
                                <input ref={product_name} readOnly={editState === 'notEditable'} required className="input-left-product" type="text"/>
                                <label>***Product Name</label>
                            </div>
                            <div className="form-group">
                                <textarea ref={product_desc} className="input-left-product" readOnly={editState === 'notEditable'} placeholder="Product Description"></textarea>
                            </div>
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between",margin: "25px 0"}}>
                            <div className="form-group">
                                    <input value={product_qty} readOnly={editState === 'notEditable'} required className="input-left-product" type="text" pattern="[0-9]+" onChange={e => validNumber(e,'qty')}/>
                                    <label>***Product Quantity</label>
                            </div>
                            <div className="form-group">
                                <select onChange={(e) => someHandle(e,'category')} disabled={editState === 'notEditable'} className="input-left-product" ref={ctgy} defaultValue={`***Product Category`}>
                                        <option disabled>***Product Category</option>
                                        <option value="top item">top item</option>
                                        <option value="standard">standard</option>
                                </select>
                            </div>
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between",margin: "25px 0"}}>
                                <div className="form-group">
                                    <input ref={l_market} min={getDateNowToString()} readOnly={editState === 'notEditable'} required className="input-left-product" type="date"/>
                                </div>
                                <div className="form-group">
                                    <select onChange={(e) => someHandle(e,'status')} disabled={editState === 'notEditable'} className="input-left-product" ref={product_status} defaultValue={`active`}>
                                        <option value="active">active</option>
                                        <option value="inactive">inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between",margin: "25px 0"}}>
                                <div className="form-group">
                                    <input required className="input-left-product" pattern="[0-9]+" readOnly={editState === 'notEditable'} onChange={e => validNumber(e,'buy')} value={buying_price} type="text"/>
                                    <label>Buying Price</label>
                                </div>
                                <div className="form-group">
                                    <input required className="input-left-product" pattern="[0-9]+" readOnly={editState === 'notEditable'} onChange={e => validNumber(e,'sell')} value={selling_price} type="text"/>
                                    <label>Selling Price</label>
                                </div>
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between",margin: "25px 0"}}>
                                <div className="form-group">
                                    <input required className="input-timestamp" disabled={true} ref={created_at} type="text"/>
                                    <label>Created at</label>
                                </div>
                                <div className="form-group">
                                    <input required className="input-timestamp" disabled={true} ref={update_at} type="text"/>
                                    <label>Update at</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal date_start={date_start} date_end={date_end} modal={modal} setModal={setModal} doExport={doExport} back={backModal} />
            </>:<ContentExport setExportPage={setExportPage} between={between} title="Product" data={defaultProduct} headers={["Product Code","Packaging","Product Name","Product Description","Product Quantity","Product Category","Date Launch Market","Product Status","Buying Price","Selling Price"]}/>}
        </>
    )
}
