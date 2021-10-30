import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Pagination from '../Pagination'
import Headers from '../templates/headers'
import './../assets/sales.css'
import {toast} from 'react-toastify'
import FormInvoice from './FormInvoice'
import ContentExport from '../ContentExport'
import Modal from '../templates/Modal'

export default function Index() {
    const active = 'sales'
    const [between, setBetween] = useState()
    const [exportPage, setExportPage] = useState(false)
    const date_start = useRef()
    const date_end = useRef()
    const selector = useSelector(state => state)
    const history = useHistory()
    const [defaultData,setDefaultData] = useState([])
    const [invoice,setInvoice] = useState([])
    const [start,setStart] = useState(0)
    const [end,setEnd] = useState(0)
    const [dataLength,setDataLength] = useState(0)
    const limit = 4
    const maxBox = 5
    const [modal, setModal] = useState(false)
    const [selectedData, setSelectedData] = useState([])
    const [detailState,setDetailState] = useState(false)
    const [zeroData,setZeroData] = useState(false)
    const [currentPage,setCurrentPage] = useState(1)
    useEffect(() => {
        setEnd(limit)
    },[limit])
    useEffect(() => {
        fetch(`http://localhost:8080/getInvoice/${selector.login.data.user_id}`,{
          method: 'GET',
          headers: {'COntent-Type': 'application/json','Authorization': selector.login.token}
        })
        .then(res => res.json())
        .then(resp => {
            setDefaultData(resp)
            const arr = resp.slice(start,end)
            if (zeroData && arr.length < 1) {
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
            setDataLength(resp.length)
            setInvoice(arr)
        })
        .catch(err => history.push("//"))
    },[selector.login,history,start,end,detailState,zeroData])

    const detailInvoice = (id) => {
        const data = defaultData.find(element => element.invoice_id === id)
        setSelectedData(data)
        setDetailState(true)
    }

    const back = () => {
        date_start.current.value = ""
        date_end.current.value = ""
        
        setModal((prevState) => !prevState)
    }

    const doExport = (type) => {
        if (date_start.current.value === "" || date_end.current.value === "") {
            return toast.warn(`field can't be null !`)
        }
        setBetween({start:date_start.current.value, end: date_end.current.value})
        setExportPage(type)
    }
    return (
        <>
        {exportPage === false ?<>
        {detailState === false ?<>
            <Modal date_start={date_start} date_end={date_end} modal={modal} setModal={setModal} doExport={doExport} back={back}/>
            <Headers active={active}/>
            <div className="sales-container">
                <div className="sales-box">
                        <div className="list-title">
                            <h3>Sales Invoice</h3>
                        </div>
                        <div className="button-group">
                            <i onClick={() => setModal((prevState) => !prevState)} className="export tooltip" data-tooltip="Export to . . .">
                                <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="export-svg" d="M25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0ZM39.0625 33.5938C39.0625 36.1784 36.9597 38.2812 34.375 38.2812H17.1875C14.6028 38.2812 12.5 36.1784 12.5 33.5938V16.4062C12.5 13.8216 14.6028 11.7188 17.1875 11.7188H25C25.8629 11.7188 26.5625 12.4184 26.5625 13.2812C26.5625 14.1441 25.8629 14.8438 25 14.8438H17.1875C16.326 14.8438 15.625 15.5447 15.625 16.4062V33.5938C15.625 34.4553 16.326 35.1562 17.1875 35.1562H34.375C35.2365 35.1562 35.9375 34.4553 35.9375 33.5938V25.7812C35.9375 24.9184 36.6371 24.2188 37.5 24.2188C38.3629 24.2188 39.0625 24.9184 39.0625 25.7812V33.5938ZM38.9117 17.0725C38.7475 17.4205 38.8043 17.3115 35.4798 20.6361C35.1747 20.9412 34.7749 21.0938 34.375 21.0938C32.9955 21.0938 32.2831 19.4135 33.2702 18.4265L33.6966 18.0001C29.7054 18.3453 26.5625 21.7021 26.5625 25.7812C26.5625 26.6441 25.8629 27.3438 25 27.3438C24.1371 27.3438 23.4375 26.6441 23.4375 25.7812C23.4375 19.9613 28.0068 15.1892 33.7463 14.8622L33.2701 14.386C32.6599 13.7759 32.6599 12.7865 33.2701 12.1764C33.8803 11.5661 34.8696 11.5661 35.4798 12.1764C38.875 15.5716 38.7856 15.4276 38.9435 15.8084C39.1186 16.2318 39.0931 16.6893 38.9117 17.0725V17.0725Z" fill="black"/>
                                </svg>
                            </i>
                            <button className="btn-redirect" onClick={() => setDetailState(true)}>Sales Form</button>
                        </div>
                        <div className="list-box">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Invoice ID</th>
                                        <th>Date</th>
                                        <th>Customer</th>
                                        <th>Gross Amount</th>
                                        <th>Tax</th>
                                        <th>Invoice</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.length > 0 ? invoice.map(element => (
                                    <tr onClick={() => detailInvoice(element.invoice_id)} key={element.invoice_id}>
                                        <td>{element.invoice_id}</td>
                                        <td>{Intl.DateTimeFormat('id-ID', {dateStyle: 'full'}).format(new Date(element.l_market))}</td>
                                        <td>{element.customer_name}</td>
                                        <td>{Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(element.gross_amount)}</td>
                                        <td>{Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(element.tax)}</td>
                                        <td>{Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(element.invoice)}</td>
                                        <td>{element.status}</td>
                                    </tr>
                                    )):
                                    <tr style={{pointerEvents: 'none'}}>
                                        <td colSpan="7">Empty !</td>
                                    </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        {dataLength > limit ?<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} dataLength={dataLength} setStart={setStart} setEnd={setEnd} className={"pagination-sales"} limit={limit} countBox={maxBox}/>:""}
                    </div>
            </div>
            </>: <FormInvoice selectedData={selectedData} setDetailState={setDetailState} setSelectedData={setSelectedData} setZeroData={setZeroData}/>}
        </>: <ContentExport setExportPage={setExportPage} between={between} title="Sales" data={invoice} headers={["Invoice ID","Date","Customer","Total Item","Total Quantity","Distributor","Gross Amount","Tax (10%)","Invoice","Status"]}/>}
        </>
    )
}
