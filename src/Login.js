import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import './assets/login.css'

export default function Login() {
    const siteKey = "6LdqWtUZAAAAAKnR3qc-ldCTRuTR_s_F9lQFdamY"
    // const secretKey = "6LdqWtUZAAAAAIJf237Ff4lAgGDDBqirOEHYpPAy"
    const onChapta = async (e) => {
        console.log(e)
    }
    return (
        <div className="login-content">
            <div className="login-box">
                <form className="login-form">
                    <h2 className="brand"><span>Nex</span>chief</h2>
                    <div className="form-group-center">
                        <input type="text" name="email" required/>
                        <label>Email</label>
                    </div>
                    <div className="form-group-center">
                        <input type="password" name="password" required/>
                        <label>Password</label>
                    </div> 
                    <ReCAPTCHA sitekey={siteKey} size="normal" onChange={onChapta}/>
                    <button type="submit" className="btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}
