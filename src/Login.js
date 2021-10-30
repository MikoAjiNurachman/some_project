import React, { useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useDispatch, useSelector} from 'react-redux';
import {getData} from './redux/action'
import { Link, Redirect, useHistory } from 'react-router-dom';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './assets/login.css'

export default function Login() {
    const dispatchers = useDispatch()
    const history = useHistory()
    const selector = useSelector(state => state)
    const secretKey = "6LdqWtUZAAAAAIJf237Ff4lAgGDDBqirOEHYpPAy"
    const siteKey = "6LdqWtUZAAAAAKnR3qc-ldCTRuTR_s_F9lQFdamY"
    const [captcha, setCaptcha] = useState(false)
    const settingToast = {
        position: "top-right",
        autoClose: 5000,
        closeButton: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
    }
    var [href,setHref] = useState(false)
    useEffect(() => {
        if (selector.login === {}) {
            selector.login = {data:"", token:null}
        }
        if (selector.login.token !== null) return history.push("/app/dashboard/")
    },[history,selector.login])
    const doLogin = (e) => {
        e.preventDefault()
        if (captcha === true) {
            let email = e.target.email.value.toString()
            let pass = e.target.password.value.toString()
            let regexEmail = /[a-z A-Z].*@[a-z].*\.[a-z]+/
            if (regexEmail.test(email) === false) {
                toast.dark('Email Invalid!', settingToast)
            } else {
                fetch('http://localhost:8080/login/',
                {
                    method: 'POST',
                    body: JSON.stringify({email,pass,secretKey:secretKey}),
                    headers: {'Content-Type': 'Application/json'}
                })
                .then(resp => resp.json())
                .then (res => {
                    if (res.status === 200) {
                        toast.success(`Login ${res.message}`,settingToast)  
                        dispatchers(getData(res.data,res.token))
                        setHref(true)
                    } else if (res.status === 404) {
                        toast.dark(res.message, settingToast)
                    } else {
                        toast.dark(`Login ${res.message}`,settingToast)
                    }
                })
            }
        } else {
            toast.warn('Bad Request!',settingToast)
        }
    }
        return (
        <>
        {href === true ? <Redirect to="/app/dashboard/"/>:""}
        <div className="login-content">
            <div className="login-box">
                <form className="login-form" onSubmit={doLogin}>
                    <h2 className="brand"><span>Nex</span>chief</h2>
                    <div className="form-group-center">
                        <input type="text" autoComplete="off" name="email" required/>
                        <label>Email</label>
                    </div>
                    <div className="form-group-center">
                        <input type="password" autoComplete="off" name="password" required/>
                        <label>Password</label>
                    </div> 
                    <ReCAPTCHA sitekey={siteKey} size="normal" onChange={() => setCaptcha((prevState) => !prevState)}/>
                    <button type="submit" className="btn-primary">Login</button>
                    <small>Haven't an Account ? <Link style={{textDecoration: "none", fontSize: "1rem"}} to="/">Register</Link></small>
                </form>
            </div>
        </div>
        </>
    )
}
