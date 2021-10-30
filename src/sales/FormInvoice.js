import React, { useCallback, useEffect, useRef, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'react-toastify'
import uid from 'uid'
import { Logout } from '../redux/action'
import Headers from '../templates/headers'
import './../assets/formInvoice.css'

export default function FormInvoice({selectedData,setDetailState, setSelectedData,setZeroData}) {
    var qty = useRef(0) 
    var l_market = useRef({})
    var customer = useRef({})
    var status = useRef({})
    var [i,setI] = useState(0) 
    const dispatch = useDispatch()
    const history = useHistory()
    const selector = useSelector(state => state)
    var distributor = useRef('')
    const active = "sales"
    const [prod,setProd] = useState([])
    const [actState,setActState] = useState(false)
    const [productCodeOptions,setProductCodeOptions] = useState([])
    const [validty, setValidty] = useState(false)
    
    useEffect(() => {
        if (selector.login.token === null || selector.login.token === "") {
          toast.warn("Access Denied", {
            position: "top-right",
            closeOnClick: true,
            closeButton: true,
            hideProgressBar: true,
            pauseOnHover: true,
            autoClose: 5000,
          });
          dispatch(Logout())
        }
      }, [selector.login.token,dispatch]);

    useEffect(() => {
            const headers = {
                method: 'GET',
                headers: {'Authorization': selector.login.token}
            }
            fetch(`http://localhost:8080/getProduct/${selector.login.data.user_id}/`,headers)
            .then(res => res.json())
            .then(resp => {
                const newArr = []
                resp.forEach(element => {
                if (element.product_status === 'active') {
                    setProductCodeOptions((prevArr) => {
                        newArr.push({label: element.product_id+"-"+element.product_name, value: element.product_id})
                        return ([...prevArr],newArr)
                    })
                }
            })
            })
            .catch(err => {
                history.push("/")
            }) 
    },[selector,actState,history])
    
    useEffect(() => {
        const fetching = async() => {
            const headers = {
                method: 'GET',
                headers: {'Authorization': selector.login.token}
            }
            const fetchs = await fetch(`http://localhost:8080/getProduct/${selector.login.data.user_id}/`,headers)
            const resp = await fetchs.json()
           setProd(resp)
        }
        fetching()
    },[selector,actState])
    useEffect(() => {
        async function fetching() {
          const fetchingDistributor = await fetch('http://localhost:8080/getDistributor/')
          const data = await fetchingDistributor.json()
          let distr = data.find(element => element.distributor_id === selector.login.data.distributor)
          distributor.current.value = distr.distributor_name
        }
        fetching()
    },[selector]) 
    
    const getDateNowToString = () => {
        let dateobj = new Date()
        let getZero = (number) => {
            return 0 < number && number < 10 ? "0"+number : number 
        }
        return (dateobj.getFullYear()+"-"+getZero(dateobj.getMonth()+1)+"-"+getZero(dateobj.getDate())).toString()
    }

    const validNumber = (e) => {
            let val = parseInt(e.target.value)
            if (e.target.validity.patternMismatch) val = 0
            if (e.target.value === "") val = 0
            document.getElementById(`total${i}`).innerHTML = parseInt(document.getElementById(`sel${i}`).textContent) * val
            let total_item = 0
            let qtysArr = document.querySelectorAll('td[name="subTotal[]"]')
            for (let index = 0; index < qtysArr.length; index++) {
                const element = qtysArr[index];
                let val = document.getElementById(element.id).textContent === "" ? 0 : document.getElementById(element.id).textContent
                total_item += parseInt(val)
            }
            document.getElementById('total_item').innerHTML = total_item
            document.getElementById('tax_item').innerHTML = (10/100) * total_item
            document.getElementById('invoice').innerHTML = total_item+((10/100) * total_item)
            return val
    }
    const handleChangeOptions = useCallback((e) => {
        const obj = selector.Product.find(element => element.product_id === e.value)
        let qty = document.getElementById(`qty${i}`)
        document.getElementById(`name${i}`).innerHTML = obj.product_name
        document.getElementById(`sel${i}`).innerHTML = obj.selling_price
        document.getElementById(`qty${i}`).removeAttribute(`disabled`)
        document.getElementById(`total${i}`).innerHTML = isNaN(parseInt(document.getElementById(`sel${i}`).textContent) * parseInt(qty.value)) ? 0: parseInt(document.getElementById(`sel${i}`).textContent) * parseInt(qty.value)
        let total_item = 0
        let qtysArr = document.querySelectorAll('td[name="subTotal[]"]')
        for (let index = 0; index < qtysArr.length; index++) {
            const element = qtysArr[index];
            let val = document.getElementById(element.id).textContent === "" ? 0 : document.getElementById(element.id).textContent
            total_item += parseInt(val)
        }
        document.getElementById('total_item').innerHTML = isNaN(total_item) ? 0 : total_item
        document.getElementById('tax_item').innerHTML = isNaN((10/100) * total_item) ? 0 : (10/100) * total_item
        document.getElementById('invoice').innerHTML = isNaN(total_item+((10/100) * total_item)) ? 0 : total_item+((10/100) * total_item)
    },[i,selector.Product])
    const deleteRow = (index) => {
        setRowTable((prevArr) => {
            const splicers = [...prevArr]
            const newIndex = splicers.findIndex(ele => ele.key === index)
            splicers.splice(newIndex,1)
            return splicers
        })
    }
    const [rowTable,setRowTable] = useState([])
    const addRowTable = () => {
        setRowTable((prevState) => {
            const arr = [...prevState]
            let key = uid()
            arr.push(
                <tr key={key}>
                        <td>
                            <div className="product-code">
                                <Select id={`code${i}`} name="theCode[]" className="select" onChange={handleChangeOptions} options={productCodeOptions}/>
                            </div>
                        </td>
                        <td><div className="named" id={`name${i}`}></div></td>
                        <td>
                            <input required id={`qty${i}`} type="text" name="qtys[]" ref={qty} disabled pattern="[0-9]+" onChange={validNumber} />
                        </td>
                        <td className="selling" id={`sel${i}`}></td>
                        <td className="total" name="subTotal[]" id={`total${i}`}></td>
                        <td>
                            <svg onClick={() => deleteRow(key)} className="contentDelete" width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="cancel-svg" d="M25 49.9835C38.8071 49.9835 50 38.798 50 25C50 11.2019 38.8071 0.0163574 25 0.0163574C11.1929 0.0163574 0 11.2019 0 25C0 38.798 11.1929 49.9835 25 49.9835Z" fill="#E04F5F"/>
                                <path d="M32.9318 36.7941L36.7982 32.9277L17.0718 13.2013L13.2054 17.0677L32.9318 36.7941Z" fill="white"/>
                                <path d="M17.0723 36.7992L36.7987 17.0728L32.9323 13.2064L13.2059 32.9328L17.0723 36.7992Z" fill="white"/>
                            </svg>
                        </td>
                    </tr>
            )
            setI((prevI) => prevI+1)
            return arr
        })
    }
    const saveInvoice = async (e) => {
        e.preventDefault()
        let invoice_item = []
        const {l_market,customer_name,invoice_status} = e.target
        let distributor_id = selector.login.data.distributor
        let theCode = document.querySelectorAll(`input[name="theCode[]"]`)
        let qtyArr = document.querySelectorAll(`input[name="qtys[]"]`)
        let totals = document.querySelectorAll(`td[name="subTotal[]"]`)
        let amount = document.getElementById('total_item').textContent
        let tax = document.getElementById('tax_item').textContent
        let invoice = document.getElementById('invoice').textContent
        let count = 0
        for (let index = 0; index < theCode.length; index++) {
            const code = theCode[index]
            for (let j = 0; j < index; j++) {
                const element = theCode[j];
                if (code.value === element.value) {
                    count++
                }
            }
            const qty = qtyArr[index]
            const total = totals[index]
            let qtyval = document.getElementById(qty.id).value
            if (code.value === "") return toast.warn('Choose the Product !')
            if (parseInt(qtyval) < 1) return toast.warn('Qty cannot be empty !')
            let arr = prod.find(element => element.product_id === code.value)
            if (parseInt(qtyval) > parseInt(arr.product_qty)) {
                document.getElementById(qty.id).value = ""
                return toast.warn(`Stock ${arr.product_name} not enough !`) 
            }
             let totalval = parseInt(document.getElementById(total.id).textContent)
            invoice_item.push({code:code.value,qty:qtyval,price:totalval})
        }
        if (count > 0) return toast.warn(`Product Code can't be the same !`)
        let data = {user_id:selector.login.data.user_id,l_market:l_market.value,distributor_id,customer:customer_name.value,status:invoice_status.value,invoice_item,amount,tax,invoice}
        let fetchers = null
        if (selectedData.length !== 0) {
            let invoice_id = selectedData.invoice_id
            let status = invoice_status.value
            fetchers = await fetch(`http://localhost:8080/updateInvoice/`,{
                method: 'POST',
                body: JSON.stringify({invoice_id,status}),
                headers: {'Content-type': 'application/json', 'Authorization': selector.login.token}
            })
            setSelectedData(prev => {
                const n = {...prev}
                n.status = invoice_status.value
                return n
            })
        } else {
            if (rowTable.length < 1) return toast.warn('Choose Product First !')
            fetchers = await fetch(`http://localhost:8080/saveInvoice/`,{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-type': 'application/json', 'Authorization': selector.login.token}
            })
        }
            const response = await fetchers.json()
            if (response.status === 500) {
                dispatch(Logout())
                history.push("/")
            }
            if (response.status === 200) {
                toast.success(response.message)
                setRowTable([])
                l_market.value = getDateNowToString()
                customer_name.value = selectedData.length === 0 ? "": customer_name.value
                invoice_status.value = selectedData.length === 0 ? "unpaid" : invoice_status.value
                document.getElementById('total_item').innerHTML = selectedData.length === 0 ? "" : amount
                document.getElementById('tax_item').innerHTML = selectedData.length === 0 ? "" : tax
                document.getElementById('invoice').innerHTML = selectedData.length === 0 ? "" : invoice
            } else {
                toast.dark(response.message)
            }
        setValidty(false)
        setActState((prevState) => !prevState)
    }
    useEffect(() => {
        if (selectedData.length !== 0) {
            selector.login.data.distributor = selectedData.distributor_id
            l_market.current.value = selectedData.l_market
            customer.current.value = selectedData.customer_name
            status.current.value = selectedData.status
            document.getElementById('l_market').setAttribute("readonly","")
            document.getElementById('customer').setAttribute("readonly","")
            document.getElementById('total_item').innerHTML = selectedData.gross_amount
            document.getElementById('tax_item').innerHTML = selectedData.tax
            document.getElementById('invoice').innerHTML = selectedData.invoice
            setI(selectedData.invoice_item.length)
        }
    },[selectedData,selector])
    useEffect(() => {
        let total_item = 0
        let qtysArr = document.querySelectorAll('td[name="subTotal[]"]')
        for (let index = 0; index < qtysArr.length; index++) {
            const element = qtysArr[index];
            let val = document.getElementById(element.id).textContent === "" ? 0 : document.getElementById(element.id).textContent
            total_item += parseInt(val)
        }
        document.getElementById('total_item').innerHTML = total_item
        document.getElementById('tax_item').innerHTML = (10/100) * total_item
        document.getElementById('invoice').innerHTML = total_item+((10/100) * total_item)
    },[selectedData,rowTable,handleChangeOptions])
    const back = () => {
        setSelectedData([])
        setDetailState(false)
    }
    const deleteInvoice = () => {
        let invoice_id = selectedData.invoice_id
        let status = selectedData.status
        let itemArr = selectedData.invoice_item
        confirmAlert({
            customUI: ({onClose}) => {
              return (
                <div className="custom-ui">
                    <h1>Are you sure ?</h1>
                    <p>Do you want to delete this ?</p>
                    <div>
                    <button className="btn-confirm-no" onClick={onClose}>No</button>
                    <button className="btn-confirm-yes" onClick={() => {
                        if (status === 'unpaid') {
                            fetch(`http://localhost:8080/returnQty/`,
                            {
                                method: 'POST',
                                body: JSON.stringify({itemArr}),
                                headers: {'Content-Type': 'application/json', 'Authorization': selector.login.token}
                            })
                            .catch(err => dispatch(Logout()))
                        }
                        fetch(`http://localhost:8080/deleteInvoice/${invoice_id}/`, {
                            method: 'GET',
                            headers: {'Content-Type': 'application/json', 'Authorization': selector.login.token}
                        })
                        .then(res => res.json())
                        .then(response => {
                            if (response.status === 500) {
                                dispatch(Logout())
                                history.push("/")
                            }
                            if (response.status === 200) {
                                toast.success(response.message)
                                setSelectedData([])
                                setZeroData(true)
                                setDetailState(false)
                            } else {
                                toast.dark(response.message)
                            }
                        })
                        .catch(err => history.push("/"))
                        onClose()
                    }}>Yes</button>
                    </div>
                </div>
              )
            }
        })
    }
    const someHandle = (e,def) => {
        if (e.target.value === def) return setValidty(false)
        setValidty(true)
    }
    return (
        <>
            <Headers active={active} validty={{select: validty, row:rowTable, data:selectedData}}/>
            <div className="sales-container">
                <div className="sales-box">
                    <form onSubmit={saveInvoice}>
                    <div className="button-group-form">
                        <div className="breadcumb">
                            <i className="back tooltip" data-tooltip="Back" onClick={back}>
                                <svg width="25" height="25" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.5946 10.8138L23.6336 10.824H6.90476L12.1637 4.47853C12.4212 4.16873 12.5625 3.74906 12.5625 3.30859C12.5625 2.86812 12.4212 2.45138 12.1637 2.14085L11.3454 1.15517C11.0881 0.845367 10.7452 0.674072 10.3796 0.674072C10.0137 0.674072 9.67061 0.844144 9.4133 1.15394L0.398461 12.0065C0.140127 12.3175 -0.00113288 12.7318 -0.000116625 13.1725C-0.00113288 13.6156 0.140127 14.0302 0.398461 14.3407L9.4133 25.1942C9.67061 25.5038 10.0135 25.6741 10.3796 25.6741C10.7452 25.6741 11.0881 25.5035 11.3454 25.1942L12.1637 24.2085C12.4212 23.8992 12.5625 23.4861 12.5625 23.0457C12.5625 22.6054 12.4212 22.2142 12.1637 21.9046L6.84541 15.5236H23.6133C24.3667 15.5236 24.9999 14.7418 24.9999 13.8351V12.4411C24.9999 11.5344 24.348 10.8138 23.5946 10.8138Z" fill="black"/>
                                </svg>
                            </i>
                            <div className="list-title-form">
                                    <h3>Sales Form</h3>
                            </div>
                        </div>
                        <div className="breadcumb-formInvoice">
                                    {selectedData.length === 0 ? <i onClick={addRowTable} className="tooltip" data-tooltip="Add Invoice">
                                        <svg id="saveInvoice" width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className="add-svg" d="M25 0C11.2144 0 0 11.2144 0 25C0 38.7856 11.2144 50 25 50C38.7856 50 50 38.7856 50 25C50 11.2144 38.7856 0 25 0Z" fill="#28A745"/>
                                            <path d="M35.9375 27.0832H27.0832V35.9374C27.0832 37.0876 26.1501 38.0207 25 38.0207C23.8498 38.0207 22.9167 37.0876 22.9167 35.9374V27.0832H14.0625C12.9123 27.0832 11.9792 26.1501 11.9792 25C11.9792 23.8498 12.9123 22.9167 14.0625 22.9167H22.9167V14.0625C22.9167 12.9123 23.8498 11.9792 25 11.9792C26.1501 11.9792 27.0832 12.9123 27.0832 14.0625V22.9167H35.9375C37.0876 22.9167 38.0207 23.8498 38.0207 25C38.0207 26.1501 37.0876 27.0832 35.9375 27.0832V27.0832Z" fill="#FAFAFA"/>
                                        </svg>
                                    </i>:""}
                                    <button style={{border: "none",outline: "none",backgroundColor: "#fff"}} type="submit">
                                    <i className="tooltip" data-tooltip={selectedData.length === 0 ? "Save Invoice": "Update Invoice"}>
                                        {selectedData.length === 0 ?
                                            <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path className="save-svg" d="M25.0001 50.0001C38.8072 50.0001 50.0001 38.8072 50.0001 25.0001C50.0001 11.1929 38.8072 0 25.0001 0C11.1929 0 0 11.1929 0 25.0001C0 38.8072 11.1929 50.0001 25.0001 50.0001Z" fill="#B6E2EB"/>
                                                    <path d="M27.3966 18.5525H30.2088C30.4847 18.5525 30.7094 18.3279 30.7094 18.0516V11.7868C30.7094 11.5093 30.4853 11.2859 30.2088 11.2859H27.3966C27.1207 11.2859 26.8969 11.5089 26.8969 11.7868V18.0516C26.8973 18.3278 27.1206 18.5525 27.3966 18.5525ZM32.3646 10.2061H17.8316C17.8316 10.2061 16.5033 19.8638 18.3017 19.8638H31.9706C33.7684 19.8639 32.3646 10.2061 32.3646 10.2061Z" fill="#BFBEBE"/>
                                                    <path d="M27.3967 18.5525H30.2089C30.4848 18.5525 30.7095 18.3279 30.7095 18.0516V11.7868C30.7095 11.5093 30.4853 11.2859 30.2089 11.2859H27.3967C27.1208 11.2859 26.8969 11.5089 26.8969 11.7868V18.0516C26.8973 18.3278 27.1207 18.5525 27.3967 18.5525ZM34.6665 10.2061H32.3647V18.5946C32.3647 19.2863 31.8042 19.8472 31.1113 19.8472H19.083C18.3918 19.8472 17.8312 19.2863 17.8312 18.5946V10.2061H14.396C12.5967 10.2061 11.1405 11.6635 11.1405 13.4616V33.8583C11.1405 35.6568 12.5967 37.1136 14.396 37.1136H35.2254C37.0232 37.1136 38.4798 35.6569 38.4798 33.8583V14.0195L34.6665 10.2061Z" fill="#357180"/>
                                                    <path d="M34.1624 26.0403C34.1624 26.0403 34.0918 26.0403 17.4184 26.0403C16.8337 26.0758 16.5985 26.3071 16.4153 26.5898C16.2413 26.8749 16.1927 27.2305 16.1852 27.3573C16.1821 27.3928 16.1841 27.401 16.1841 27.401V35.387C16.1841 35.6286 15.9863 35.8244 15.7459 35.8244C15.5039 35.8244 15.3065 35.6286 15.3065 35.387V27.401C15.3085 27.3655 15.3042 26.8836 15.5556 26.3423C15.7917 25.8015 16.3901 25.1951 17.3806 25.1647H17.3865H17.3994C34.0922 25.1636 34.1629 25.1636 34.1629 25.1636V25.1647C34.4049 25.1647 34.601 25.3605 34.601 25.6033C34.6006 25.8445 34.4045 26.0403 34.1624 26.0403Z" fill="#2F6E77"/>
                                                    <path opacity="0.4" d="M27.4388 27.8769L18.6318 22.0484L28.9855 6.40283L37.7937 12.2327L27.4388 27.8769Z" fill="url(#paint0_linear)"/>
                                                    <path d="M34.3006 41.0247C37.8508 41.0247 40.7288 38.1467 40.7288 34.5965C40.7288 31.0462 37.8508 28.1682 34.3006 28.1682C30.7503 28.1682 27.8723 31.0462 27.8723 34.5965C27.8723 38.1467 30.7503 41.0247 34.3006 41.0247Z" fill="#0EA24A"/>
                                                    <path d="M35.4891 31.2607H33.5228V38.0956H35.4891V31.2607Z" fill="white"/>
                                                    <path d="M37.926 33.6924H31.0912V35.6583H37.926V33.6924Z" fill="white"/>
                                            </svg>    
                                    :       <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path className="edit-svg" d="M50 25C50 38.8073 38.8073 50 25 50C11.1927 50 0 38.8073 0 25C0 11.1927 11.1927 0 25 0C38.8073 0 50 11.1927 50 25Z" fill="#FFC107"/>
                                                    <path d="M39.8537 10.1463C38.562 8.855 36.845 8.14355 35.0185 8.14355C33.1921 8.14355 31.4751 8.855 30.1834 10.1463L11.525 28.8051C11.3464 28.9836 11.2171 29.2049 11.1496 29.4483L8.21839 39.9772C8.07648 40.4876 8.22106 41.035 8.5968 41.4085C8.87528 41.6854 9.24797 41.835 9.62982 41.835C9.76334 41.835 9.898 41.8167 10.03 41.7793L20.5593 38.7885C21.0583 38.6466 21.4455 38.2511 21.5763 37.749C21.7072 37.2466 21.5626 36.7126 21.1964 36.3452L14.6721 29.8011L29.9107 14.5622L35.4343 20.0862L23.7083 31.7798C23.1358 32.3512 23.1342 33.2786 23.7057 33.8516C24.2771 34.4245 25.2045 34.4257 25.7774 33.8542L39.8537 19.8165C41.1453 18.5249 41.8564 16.8079 41.8564 14.9814C41.8564 13.1549 41.1449 11.4379 39.8537 10.1463V10.1463ZM17.3637 36.6504L11.7413 38.2476L13.316 32.59L17.3637 36.6504ZM37.7834 17.7432L37.5088 18.0171L31.982 12.4908L32.2552 12.218C32.9933 11.4799 33.9745 11.0732 35.0185 11.0732C36.0626 11.0732 37.0438 11.4799 37.7819 12.218C38.52 12.9562 38.9267 13.9373 38.9267 14.9814C38.9267 16.0251 38.52 17.0066 37.7834 17.7432Z" fill="white"/>
                                            </svg>
                                    }
                                    </i>
                                    </button>
                                    {selectedData.length !== 0 && selectedData.status !== 'paid' ? <i className="tooltip" data-tooltip="Delete Invoice">
                                        <svg onClick={deleteInvoice} className="delete-svg" width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M32.2575 19.7832H17.7418C17.4131 19.7832 17.1453 20.0511 17.1453 20.3797V35.0947C17.1453 35.4234 17.4131 35.6913 17.7418 35.6913H32.2575C32.5862 35.6913 32.8541 35.4234 32.8541 35.0947V20.3797C32.8541 20.0505 32.5862 19.7832 32.2575 19.7832ZM20.8242 33.5037C20.8242 33.833 20.5569 34.1003 20.2276 34.1003C19.8983 34.1003 19.6311 33.833 19.6311 33.5037V22.1694C19.6311 21.8401 19.8983 21.5728 20.2276 21.5728C20.5569 21.5728 20.8242 21.8401 20.8242 22.1694V33.5037ZM23.2103 33.5037C23.2103 33.833 22.9431 34.1003 22.6138 34.1003C22.2845 34.1003 22.0172 33.833 22.0172 33.5037V22.1694C22.0172 21.8401 22.2845 21.5728 22.6138 21.5728C22.9431 21.5728 23.2103 21.8401 23.2103 22.1694V33.5037ZM25.5965 33.5037C25.5965 33.833 25.3293 34.1003 25 34.1003C24.6707 34.1003 24.4034 33.833 24.4034 33.5037V22.1694C24.4034 21.8401 24.6707 21.5728 25 21.5728C25.3293 21.5728 25.5965 21.8401 25.5965 22.1694V33.5037ZM27.9827 33.5037C27.9827 33.833 27.7154 34.1003 27.3862 34.1003C27.0563 34.1003 26.7896 33.833 26.7896 33.5037V22.1694C26.7896 21.8401 27.0563 21.5728 27.3862 21.5728C27.7154 21.5728 27.9827 21.8401 27.9827 22.1694V33.5037ZM30.3689 33.5037C30.3689 33.833 30.1016 34.1003 29.7723 34.1003C29.4424 34.1003 29.1758 33.833 29.1758 33.5037V22.1694C29.1758 21.8401 29.4424 21.5728 29.7723 21.5728C30.1016 21.5728 30.3689 21.8401 30.3689 22.1694V33.5037Z" fill="#DC3545"/>
                                            <path d="M32.2576 14.6356H27.9822C27.6529 14.6356 27.3857 14.3684 27.3857 14.0391V13.5189C27.3857 13.1902 27.1178 12.9224 26.7891 12.9224H23.2098C22.8812 12.9224 22.6133 13.1902 22.6133 13.5189V14.0391C22.6133 14.3684 22.3461 14.6356 22.0168 14.6356H17.7413C17.4126 14.6356 17.1448 14.9035 17.1448 15.2322V15.9051C17.1448 16.2338 17.4126 16.5016 17.7413 16.5016H32.257C32.5857 16.5016 32.8536 16.2338 32.8536 15.9051V15.2322C32.8542 14.9035 32.5863 14.6356 32.2576 14.6356Z" fill="#DC3545"/>
                                            <path d="M25 0C11.1924 0 0 11.193 0 25.0006C0 38.8082 11.193 50 25 50C38.807 50 50 38.8076 50 25.0006C50 11.193 38.807 0 25 0ZM34.0472 35.0941C34.0472 36.0802 33.2442 36.8838 32.2576 36.8838H17.7418C16.7552 36.8838 15.9522 36.0802 15.9522 35.0941V20.3798C15.9522 19.3931 16.7552 18.5901 17.7418 18.5901H32.2576C33.2442 18.5901 34.0472 19.3931 34.0472 20.3798V35.0941ZM34.0472 15.9057C34.0472 16.8924 33.2442 17.6953 32.2576 17.6953H17.7418C16.7552 17.6953 15.9522 16.8924 15.9522 15.9057V15.2328C15.9522 14.2461 16.7552 13.4431 17.7418 13.4431H21.4219C21.4619 12.4916 22.2487 11.7299 23.2098 11.7299H26.789C27.7495 11.7299 28.5375 12.4916 28.5769 13.4431H32.257C33.2431 13.4431 34.0466 14.2461 34.0466 15.2328L34.0472 15.9057Z" fill="#DC3545"/>
                                        </svg>
                                    </i>:""}
                                </div>
                    </div>
                        <div className="detail-content">
                            <div className="detail-content-left">
                                <div className="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Product Code</th>
                                                <th>Product Name</th>
                                                <th>Product Quantity</th>
                                                <th>Selling Price</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedData.length !== 0 ? 
                                            selectedData.invoice_item.map((element, index) => (
                                                <tr key={uid()}>
                                                    <td>
                                                        <div className="product-code">
                                                            {element.product_id}
                                                        </div>
                                                    </td>
                                                    <td><div className="named" id={`name${index}`}>{element.product_name}</div></td>
                                                    <td>
                                                        {element.qty}
                                                    </td>
                                                    <td className="selling" id={`sel${index}`}>{element.selling_price}</td>
                                                    <td className="total" name="subTotal[]" id={`total${index}`}>{element.price}</td>
                                                    <td>
                                                    </td>
                                                </tr>
                                            ))
                                            :rowTable.length > 0 ? rowTable :
                                            <tr>
                                                <td colSpan="5" style={{border: '.1px solid #ddd'}}>Empty !</td>
                                            </tr>
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td className="row-span" colSpan="3"></td>
                                                <td>Gross Amount</td>
                                                <td id="total_item"></td>
                                            </tr>
                                            <tr>
                                                <td className="row-span" colSpan="3"></td>
                                                <td>Tax (10%)</td>
                                                <td id="tax_item"></td>
                                            </tr>
                                            <tr>
                                                <td className="row-span" colSpan="3"></td>
                                                <td>Invoice</td>
                                                <td id="invoice"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div className="detail-content-right">
                                <div className="detail-form-group">
                                    <label>Date</label>
                                    <input type="date" id="l_market" max={getDateNowToString()} onChange={e => someHandle(e,getDateNowToString())} ref={l_market} name="l_market" defaultValue={getDateNowToString()}/>
                                </div>
                                <div className="detail-form-group">
                                    <label>Distributor</label>
                                    <input type="text" name="distributor_id" readOnly ref={distributor}/>
                                </div>
                                <div className="detail-form-group">
                                    <label>Customer</label>
                                    <input ref={customer} onChange={e => someHandle(e, '')} id="customer" autoComplete="off" required type="text" name="customer_name" />
                                </div>
                                <div className="detail-form-group">
                                    <label>Status</label>
                                    <select onChange={(e) => someHandle(e, 'unpaid')} name="invoice_status" ref={status} defaultValue="unpaid">
                                        <option value="paid">paid</option>
                                        <option value="unpaid">unpaid</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
