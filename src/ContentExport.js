import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
import Excel from 'react-html-table-to-excel'
import uid from 'uid'
import './assets/contentExport.css'

export default function ContentExport({setExportPage,between,title,data,headers}) {
    const printedContent = useRef()
    const selector = useSelector(state => state)
    const {start, end} = between
    const [arrState, setArrState] = useState([])
    useEffect(() => {
        const startObj = new Date(start)
        const endObj = new Date(end)
        if (title === 'Product') {
            const fill = data.filter(element => {
                const l_mark = new Date(element.created_at)
                return startObj.getTime() <= l_mark.getTime() && l_mark.getTime() <= endObj.getTime()
            })
            setArrState(fill)
        }
        if (title === 'Sales') {
            const fill = data.filter(ele => {
                const theDate = new Date(ele.l_market)
                return ele.status ==='paid' && startObj.getTime() <= theDate.getTime() && theDate.getTime() <= endObj.getTime()
            })
                fetch('http://localhost:8080/getDistributor/', {method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': selector.login.token}})
                .then(res => res.json())
                .then(resp => {
                    const newFIll = []
                    fill.forEach(element => {
                            let total_item = 0, total_qty = 0
                            total_item = element.invoice_item.length
                            element.invoice_item.forEach (subElement => {
                                total_qty += parseInt(subElement.qty)
                            })
                        let obj = resp.find(ele => ele.distributor_id === element.distributor_id)
                        let distributor = obj.distributor_name
                        newFIll.push({...element,total_item,total_qty,distributor})
                    })
                    setArrState(newFIll)
                })
                .catch(err => console.warn('Ada yang Salah Dengan mu !'))
        }
    },[start,end,data,selector.login,title])
    const printPdf = useReactToPrint({
        content: () => printedContent.current
    })
    const printThisToPdf = () => {
        printPdf()
    }
    const printThisToCsv = () => {
        const rowCsv = []
        let see = []
        see.push(headers)
        if (title === 'Product') {
            arrState.forEach(element => {
              see.push([element.product_id,element.packaging,element.product_name,element.product_desc,element.product_qty,element.ctgy_id,element.launch_market,element.product_status,element.buying_price,element.selling_price])  
            })
        } else {
            arrState.forEach(element => {
                see.push([element.invoice_id,element.l_market,element.customer_name,element.total_item,element.total_qty,element.distributor,element.gross_amount,element.tax,element.invoice,element.status])  
            })
        }
        see.forEach(element => {
            let strRow = element.join(',')
            rowCsv.push(strRow)
        })
        const csvStr = rowCsv.join("%0A")
        const strCsvWithSpace = csvStr.replace(/ /g, "%20")
        let a = document.createElement('a')
        a.href="data:attachment/csv,"+strCsvWithSpace
        a.target="__blank"
        a.download=`${title}.csv`
        document.body.appendChild(a)
        a.click()
    }
    return (
        <>
        <div className="button-group-export">
            <button className="button-export-back" onClick={() => setExportPage(false)}>Back</button>
            {
            arrState.length > 0 ?<>
                <button className="button-export pdf" onClick={printThisToPdf}>Export to Pdf !</button>
                <Excel className="subButtonExport excel" table="table-export" filename={title} sheet="sheet1" buttonText="Export to Excel !" />
                <button className="button-export csv" onClick={printThisToCsv}>Export to Csv !</button></>:<></>}   
        </div>
        <div ref={printedContent} className="content-export-container">
        <div className="table-container-export">
            <table id="table-export" className="table-export">
                <caption>{title}</caption>
                <thead>
                    <tr>
                        {headers.map(element => (
                            <th key={uid()}>{element}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {arrState.length < 1 ? 
                    <tr style={{pointerEvents: 'none', cursor: 'none'}}>
                        <td colSpan={headers.length}>Empty !</td>
                    </tr>:
                    title === 'Product' ? arrState.map(element => (
                        <tr key={element.product_id}>
                            <td>{element.product_id}</td>
                            <td>{element.packaging}</td>
                            <td>{element.product_name}</td>
                            <td>{element.product_desc}</td>
                            <td>{element.product_qty}</td>
                            <td>{element.ctgy_id}</td>
                            <td>{Intl.DateTimeFormat('id-ID', {dateStyle: 'full'}).format(new Date(element.launch_market))}</td>
                            <td>{element.product_status}</td>
                            <td>{Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(element.buying_price)}</td>
                            <td>{Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(element.selling_price)}</td>
                        </tr>
                    )):
                    arrState.map(element => (
                        <tr key={element.invoice_id}>
                            <td>{element.invoice_id}</td>
                            <td>{Intl.DateTimeFormat('id-ID', {dateStyle: 'full'}).format(new Date(element.l_market))}</td>
                            <td>{element.customer_name}</td>
                            <td>{element.total_item}</td>
                            <td>{element.total_qty}</td>
                            <td>{element.distributor}</td>
                            <td>{Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(element.gross_amount)}</td>
                            <td>{Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(element.tax)}</td>
                            <td>{Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(element.invoice)}</td>
                            <td>{element.status}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table> 
        </div>
        </div>
        </>
    )
}
