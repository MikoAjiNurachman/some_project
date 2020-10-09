import React from 'react'
import './assets/login.css'

export default function Login() {
    return (
        <div className="login-content">
            <div className="login-box">
                <form className="login-form">
                    <div className="form-group-center">
                        <input type="text" name="email" required/>
                        <label>Email</label>
                    </div>
                    <div className="form-group-center">
                        <input type="password" name="password" required/>
                        <label>Password</label>
                    </div> 
                </form>
            </div>
        </div>
    )
}
