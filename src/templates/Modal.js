import React from 'react'

export default function Modal({date_start, date_end, modal, setModal, doExport, back}) {

    const getDateTimeNowToString = (op) => {
        let additionalDate = typeof op === 'number' ? op : 0
        let dateobj = new Date()
        let getZero = (number) => {
            return 0 < number && number < 10 ? "0"+number : number 
        }
        return (dateobj.getFullYear()+"-"+getZero(dateobj.getMonth()+1)+"-"+getZero(dateobj.getDate()-additionalDate))+"T00:00:00".toString()
    }

    if (modal === true) {
        document.body.style.overflowY = 'hidden'
    } else {
        document.body.style.overflowY = 'auto'
    }

    return (
        <>
        {modal === true ? <div onClick={() => setModal((prevState) => !prevState)} className="modal-shadow"></div> : "" }
            <div className={modal === true ? "modal-box show-modal": "modal-box"}>
            <div className="category-action">
                    <i onClick={back} className="back tooltip" data-tooltip="Back">
                    <svg width="19" height="20" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.5946 10.8138L23.6336 10.824H6.90476L12.1637 4.47853C12.4212 4.16873 12.5625 3.74906 12.5625 3.30859C12.5625 2.86812 12.4212 2.45138 12.1637 2.14085L11.3454 1.15517C11.0881 0.845367 10.7452 0.674072 10.3796 0.674072C10.0137 0.674072 9.67061 0.844144 9.4133 1.15394L0.398461 12.0065C0.140127 12.3175 -0.00113288 12.7318 -0.000116625 13.1725C-0.00113288 13.6156 0.140127 14.0302 0.398461 14.3407L9.4133 25.1942C9.67061 25.5038 10.0135 25.6741 10.3796 25.6741C10.7452 25.6741 11.0881 25.5035 11.3454 25.1942L12.1637 24.2085C12.4212 23.8992 12.5625 23.4861 12.5625 23.0457C12.5625 22.6054 12.4212 22.2142 12.1637 21.9046L6.84541 15.5236H23.6133C24.3667 15.5236 24.9999 14.7418 24.9999 13.8351V12.4411C24.9999 11.5344 24.348 10.8138 23.5946 10.8138Z" fill="black"/>
                    </svg>
                    </i>
                    <h2>Export Modal</h2>
            </div>
                <form className="form-modal">
                <div className="form-group">
                        <input type="datetime-local" max={getDateTimeNowToString(1)} ref={date_start} required/>
                    </div>
                    <div className="form-group">
                        <input type="datetime-local" min={getDateTimeNowToString()} ref={date_end} required/>
                    </div>
                    <div className="form-group">
                        <div className="export-group">
                            <button onClick={() => doExport(true)} className="btn-primary">Preview Filter !</button>
                        </div>
                    </div>
                </form>
            </div>  
        </>
    )
}
