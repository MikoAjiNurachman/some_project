import React from 'react'
import Headers from './../templates/headers'
import './../assets/product.css'

export default function Index() {
    return (
        <>
            <Headers/>
            <div className="product-content">
                <div className="product-list">
                    <form className="search-box">
                        <input type="text" name="search" required placeholder="Search Product Code or Product Name here . . . "/>
                        <div className="svg-search">
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.7068 23.2226L16.8818 16.1133C18.2038 14.4123 18.9998 12.2509 18.9998 9.89673C18.9998 4.44053 14.7378 0.000976562 9.49988 0.000976562C4.26193 0.000976562 0 4.44048 0 9.89668C0 15.3529 4.26197 19.7924 9.49992 19.7924C11.7599 19.7924 13.8349 18.9633 15.4678 17.5862L22.2928 24.6955C22.4878 24.8986 22.7438 25.0007 22.9998 25.0007C23.2558 25.0007 23.5118 24.8986 23.7068 24.6955C24.0978 24.2882 24.0978 23.6299 23.7068 23.2226ZM9.49992 17.7091C5.36395 17.7091 2 14.205 2 9.89668C2 5.58837 5.36395 2.08426 9.49992 2.08426C13.6359 2.08426 16.9998 5.58837 16.9998 9.89668C16.9998 14.205 13.6359 17.7091 9.49992 17.7091Z" fill="black"/>
                            </svg>
                        </div>
                    </form>
                    <div className="list-box">
                        <div className="product-item">
                            <span>4X5X160G</span>
                            <span>Delux Cookies Cream CHO</span>
                            <span>Snack</span>
                            <span>2020-7-10</span>
                            <span>Active</span>
                            <span>IDR. 150.000.00</span>
                        </div>
                        <div className="product-item">
                            <span>4X5X160G</span>
                            <span>Delux Cookies Cream CHO</span>
                            <span>Snack</span>
                            <span>2020-7-10</span>
                            <span>Active</span>
                            <span>IDR. 150.000.00</span>
                        </div>
                        <div className="product-item">
                            <span>4X5X160G</span>
                            <span>Delux Cookies Cream CHO</span>
                            <span>Snack</span>
                            <span>2020-7-10</span>
                            <span>Active</span>
                            <span>IDR. 150.000.00</span>
                        </div>
                        <div className="product-item">
                            <span>4X5X160G</span>
                            <span>Delux Cookies Cream CHO</span>
                            <span>Snack</span>
                            <span>2020-7-10</span>
                            <span>Active</span>
                            <span>IDR. 150.000.00</span>
                        </div>
                        <div className="product-item">
                            <span>4X5X160G</span>
                            <span>Delux Cookies Cream CHO</span>
                            <span>Snack</span>
                            <span>2020-7-10</span>
                            <span>Active</span>
                            <span>IDR. 150.000.00</span>
                        </div>
                        <div className="product-item">
                            <span>4X5X160G</span>
                            <span>Delux Cookies Cream CHO</span>
                            <span>Snack</span>
                            <span>2020-7-10</span>
                            <span>Active</span>
                            <span>IDR. 150.000.00</span>
                        </div>
                        
                    </div>
                </div>
                <div className="product-form">
                    <div className="button-form">

                    </div>
                    <div className="form-box">

                    </div>
                </div>
            </div>
        </>
    )
}
