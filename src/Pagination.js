import React from 'react'
import './assets/pagination.css'


export default function Pagination({currentPage,setCurrentPage,dataLength, className,limit, setStart, setEnd,countBox}) {
    const boxPagination = []
    let maxleft = currentPage - Math.floor(countBox/2)
    let maxright = currentPage + Math.floor(countBox/2)
    if (maxleft < 1) {
        maxleft = 1
        maxright = countBox
    }
    if (maxright > Math.ceil(dataLength/limit)){
        maxleft = Math.ceil(dataLength/limit) - (countBox-1)
        maxright = Math.ceil(dataLength/limit)
        if (maxleft < 1) {
            maxleft = 1
        }
    }
    const changeSlice = (index) => {
        setStart((index-1)*limit)
        setEnd(index*limit)
        setCurrentPage(index)
    }
    const actPage = (type) => {
        if (type === 'prev') {
            setCurrentPage(currentPage--)
            changeSlice(currentPage)
        } else {
            setCurrentPage(currentPage++)
            changeSlice(currentPage)
        }
    }
    if (dataLength  > limit) {
        for (let i = maxleft; i <= maxright; i++) {
        boxPagination.push(<div key={i} onClick={() => changeSlice(i)} className={`box-pagination ${currentPage === i? 'active-page': ''}`}><span>{i}</span></div>)
        }
    }
    return (
        <>
            <div className={`pagination-container ${className}`}>
                <div key={'info'} className="box-pagination-info"><span>{currentPage}/{Math.ceil(dataLength/limit)}</span></div>
                <div key={'prev'} style={currentPage <= 1? {display: "none"}:{}} onClick={() => actPage('prev')} className="box-pagination"><span>Prev</span></div>
                {boxPagination}
                <div key={'Next'} style={currentPage >= Math.ceil(dataLength/limit)? {display: "none"}:{}} onClick={() => actPage('next')} className="box-pagination"><span>Next</span></div>
            </div>
        </>
    )
}
