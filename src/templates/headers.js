import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Logout } from "../redux/action";
import "./../assets/header.css";
import { confirmAlert } from "react-confirm-alert";

export default function Headers({ active, validty }) {
  const dispatchers = useDispatch();
  const history = useHistory();
  const selector = useSelector((state) => state);
  const [modal, setModal] = useState(false);
  const [href, setHref] = useState(false);
  const [humberger, setHumberger] = useState(false)
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
      setHref(true);
    }
  }, [selector.login.token]);
  const reset = (arrId) => {
    arrId.forEach(el => {
      document.getElementById(el).value = ""
    })
  }
  const doChangePassword = (e) => {
    e.preventDefault();
    const { oldPassword, thePassword, theConfirmPassword } = e.target
    let regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,100}$/
    if (regexPassword.test(e.target.thePassword.value) === false) {
      e.target.thePassword.value = ""
      e.target.theConfirmPassword.value = ""
      return toast.dark('Password must be contain at least word,Uper Case,Number, and Special Character !', {
        position: "top-right",
        closeButton: true,
        closeOnClick: true,
        progress: undefined,
        hideProgressBar: true
      })
    }
    if (e.target.thePassword.value !== e.target.theConfirmPassword.value) {
      e.target.thePassword.value = "";
      e.target.theConfirmPassword.value = "";
      return toast.warn("Not Match !", {
        position: "top-right",
        progress: undefined,
        hideProgressBar: true,
        autoClose: 5000,
        closeButton: true,
        closeOnClick: true,
        pauseOnHover: true,
      })
    }
      fetch("http://localhost:8080/u/changePass/", {
        method: "POST",
        body: JSON.stringify({ password: e.target.thePassword.value,oldPw: e.target.oldPassword.value }),
        headers: {
          "Content-Type": "application/json",
          Authorization: selector.login.token,
        },
      }).then(resp => resp.json())
      .then(json => {
        json.status === 200
        ? toast.success(json.message)
        : toast.dark(json.message);
        oldPassword.value = ""
        thePassword.value = ""
        theConfirmPassword.value = ""
      }).catch(err => {
        dispatchers(Logout())
    })
  };
  const logout = () => {
    confirmAlert({
      customUI: ({onClose}) => {
        return (
      <div className="custom-ui">
          <h1>Are you sure ?</h1>
          <p>want to Logout ?</p>
          <div>
            <button className="btn-confirm-no" onClick={onClose}>No</button>
            <button className="btn-confirm-yes" onClick={() => {
                dispatchers(Logout());
                onClose()
                history.push("/");
            }}>Yes</button>
          </div>
      </div>
        )
      }
    })
  };
  const checkInput = (e) => {
    const {textContent, dataset} = e.target
    const link = dataset.linked
    if (textContent.toLowerCase() === active) return
    let status = 0
    if (active === 'product') {
      let inputs = document.querySelectorAll('.input-left-product')
      for (let i = 0;i < inputs.length; i++) {
        if (inputs[3].value === "") {
          if (i !== 3 && i !== 5 && i !== 7) {
            if (inputs[i].checkValidity()) {
              status = 1
            }
          }
          if (validty) {
            status = 1
          }          
        } else {
          if (i !== 5 && i !== 7) {
            if (inputs[i].checkValidity()) {
              status = 1
            }
          }
          if (validty) {
            status = 1
          }
        }
      }
    } else if (active === 'sales' && validty !== undefined) {
        if (validty.data.length === 0) {
          if (validty.row.length > 0 || validty.select === true) {
            status = 1
          }
        } else {
          if (validty.select === true) {
            status = 1
          }
        }
    }
    if (status === 1) {
      confirmAlert({
        customUI: ({onClose}) => {
          return (
            <div className="custom-ui">
                <h1>Check Your Form !</h1>
                <p>Are you sure want to direct to another page ?</p>
                <div>
                  <button className="btn-confirm-no" onClick={onClose}>No</button>
                  <button className="btn-confirm-yes" onClick={() => {
                    onClose()
                    history.push(link)
                  }}>Yes</button>
                </div>
            </div>
          )
        }
      })
    } else {
      history.push(link)
    }
  }
  const back = () => {
    const formname = ["oldPassword","thePassword","theConfirmPassword"]
    reset(formname)
    setModal((prevState) => !prevState)
  }
  return (
    <>
      {href === true ? <Redirect to="/" /> : ""}
      <div
        onClick={() => setModal((prevState) => !prevState)}
        className={modal === true ? "modal-shadow" : ""}
      ></div>
      <div className={modal === true ? "modal-box show-modal" : "modal-box"}>
        <div className="category-action">
          <i
            onClick={back}
            className="back tooltip"
            data-tooltip="Back"
          >
            <svg width="19" height="20" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.5946 10.8138L23.6336 10.824H6.90476L12.1637 4.47853C12.4212 4.16873 12.5625 3.74906 12.5625 3.30859C12.5625 2.86812 12.4212 2.45138 12.1637 2.14085L11.3454 1.15517C11.0881 0.845367 10.7452 0.674072 10.3796 0.674072C10.0137 0.674072 9.67061 0.844144 9.4133 1.15394L0.398461 12.0065C0.140127 12.3175 -0.00113288 12.7318 -0.000116625 13.1725C-0.00113288 13.6156 0.140127 14.0302 0.398461 14.3407L9.4133 25.1942C9.67061 25.5038 10.0135 25.6741 10.3796 25.6741C10.7452 25.6741 11.0881 25.5035 11.3454 25.1942L12.1637 24.2085C12.4212 23.8992 12.5625 23.4861 12.5625 23.0457C12.5625 22.6054 12.4212 22.2142 12.1637 21.9046L6.84541 15.5236H23.6133C24.3667 15.5236 24.9999 14.7418 24.9999 13.8351V12.4411C24.9999 11.5344 24.348 10.8138 23.5946 10.8138Z" fill="black"/>
            </svg>
          </i>
        </div>
        <form onSubmit={doChangePassword} className="form-modal">
          <div style={{marginBottom: "1rem"}} className="form-group">
            <input required name="oldPassword" id="oldPassword" type="password" />
            <label>Old Password</label>
          </div>
          <div style={{marginBottom: "1rem"}} className="form-group">
            <input required name="thePassword" id="thePassword" type="password" />
            <label>New Password</label>
          </div>
          <div style={{marginBottom: "1rem"}} className="form-group">
            <input required name="theConfirmPassword" id="theConfirmPassword" type="password" />
            <label>Confirm Password</label>
          </div>
          <button className="btn-primary">Change !</button>
        </form>
      </div>


      <div className="header">
        <h1 className="header-brand" onClick={() => history.push("/app/dashboard/")}>
          <div className="f1">Nex</div>
          <div className="f2">chief</div>
        </h1>

        <div className="header-two">
        <div onClick={() => setHumberger(prev => !prev)} className={humberger === true ? 'hamburger rotate':'hamburger'}>
            <span className="left"></span>
            <span className="tokubetsu"></span>
            <span className="right"></span>
        </div>
        <ul className="header-list">
            <li data-linked="/app/product/" onClick={checkInput} className={active === "product" ? "active" : ""}>Product</li>
            <li data-linked="/app/sales/" onClick={checkInput} className={active === "sales" ? "active" : ""}>Sales</li>
            <li data-linked="/app/dashboard/" onClick={checkInput} className={active === "dashboard" ? "active" : ""}>Dashboard</li>
        </ul>
        <div className="user-content">
          <div className="user-icon">
            <svg
              width="50"
              height="50"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 0C13.458 0 0 13.458 0 30C0 37.245 2.582 43.898 6.874 49.088C6.885 49.103 6.886 49.122 6.898 49.136C9.997 52.873 13.889 55.738 18.226 57.589C18.276 57.61 18.325 57.633 18.375 57.654C18.726 57.802 19.081 57.939 19.437 58.073C19.577 58.126 19.717 58.18 19.859 58.231C20.166 58.341 20.475 58.445 20.786 58.545C20.985 58.609 21.184 58.672 21.385 58.732C21.66 58.814 21.936 58.893 22.214 58.968C22.458 59.034 22.704 59.095 22.95 59.154C23.199 59.214 23.449 59.274 23.7 59.327C23.98 59.387 24.263 59.44 24.547 59.492C24.775 59.534 25.002 59.578 25.232 59.615C25.547 59.666 25.864 59.706 26.182 59.747C26.387 59.773 26.591 59.803 26.797 59.825C27.157 59.863 27.52 59.89 27.884 59.915C28.053 59.927 28.221 59.945 28.391 59.954C28.922 59.984 29.459 60 30 60C30.541 60 31.078 59.984 31.611 59.956C31.781 59.947 31.949 59.929 32.118 59.917C32.482 59.891 32.845 59.865 33.205 59.827C33.411 59.805 33.615 59.775 33.82 59.749C34.138 59.708 34.455 59.668 34.77 59.617C34.999 59.58 35.227 59.536 35.455 59.494C35.738 59.442 36.021 59.389 36.302 59.329C36.553 59.275 36.802 59.216 37.052 59.156C37.298 59.096 37.544 59.035 37.788 58.97C38.066 58.896 38.342 58.816 38.617 58.734C38.818 58.674 39.017 58.611 39.216 58.547C39.527 58.447 39.836 58.343 40.143 58.233C40.284 58.182 40.424 58.128 40.565 58.075C40.922 57.941 41.276 57.803 41.627 57.656C41.677 57.635 41.726 57.612 41.776 57.591C46.112 55.74 50.005 52.875 53.104 49.138C53.116 49.124 53.117 49.104 53.128 49.09C57.418 43.898 60 37.245 60 30C60 13.458 46.542 0 30 0ZM42.157 55.22C42.142 55.227 42.128 55.235 42.113 55.242C41.756 55.414 41.393 55.576 41.027 55.734C40.944 55.769 40.862 55.805 40.779 55.84C40.459 55.974 40.135 56.101 39.809 56.223C39.673 56.274 39.537 56.324 39.4 56.372C39.111 56.475 38.821 56.574 38.528 56.668C38.346 56.726 38.163 56.781 37.98 56.835C37.72 56.913 37.459 56.988 37.195 57.058C36.973 57.117 36.749 57.171 36.525 57.224C36.29 57.28 36.056 57.337 35.819 57.387C35.56 57.442 35.299 57.489 35.039 57.536C34.828 57.575 34.618 57.616 34.405 57.65C34.112 57.696 33.816 57.733 33.521 57.77C33.334 57.794 33.148 57.822 32.959 57.842C32.622 57.878 32.282 57.901 31.943 57.925C31.792 57.935 31.642 57.952 31.489 57.96C30.994 57.986 30.498 58 30 58C29.502 58 29.006 57.986 28.512 57.96C28.36 57.952 28.21 57.936 28.058 57.925C27.718 57.902 27.379 57.878 27.042 57.842C26.853 57.822 26.667 57.794 26.48 57.77C26.185 57.733 25.889 57.696 25.596 57.65C25.383 57.616 25.173 57.575 24.962 57.536C24.701 57.489 24.44 57.441 24.182 57.387C23.945 57.337 23.71 57.28 23.476 57.224C23.252 57.17 23.028 57.117 22.806 57.058C22.543 56.988 22.281 56.912 22.021 56.835C21.838 56.781 21.655 56.726 21.473 56.668C21.18 56.574 20.889 56.475 20.601 56.372C20.464 56.323 20.328 56.273 20.192 56.223C19.866 56.101 19.542 55.974 19.222 55.84C19.139 55.806 19.058 55.77 18.975 55.735C18.609 55.578 18.246 55.415 17.888 55.243C17.873 55.236 17.859 55.229 17.844 55.221C14.355 53.533 11.273 51.137 8.772 48.227C10.705 41.109 16.177 35.371 23.217 33.088C23.356 33.173 23.501 33.249 23.644 33.329C23.728 33.376 23.811 33.426 23.896 33.471C24.194 33.629 24.496 33.777 24.805 33.91C25.042 34.014 25.287 34.102 25.531 34.192C25.579 34.209 25.627 34.228 25.675 34.245C27.031 34.725 28.482 35 30 35C31.518 35 32.969 34.725 34.324 34.245C34.372 34.228 34.42 34.209 34.468 34.192C34.712 34.102 34.957 34.014 35.194 33.91C35.503 33.777 35.805 33.629 36.103 33.471C36.188 33.425 36.271 33.376 36.355 33.329C36.498 33.249 36.644 33.173 36.784 33.087C43.824 35.371 49.295 41.109 51.229 48.226C48.728 51.135 45.646 53.531 42.157 55.22ZM19 22C19 15.935 23.935 11 30 11C36.065 11 41 15.935 41 22C41 25.858 38.999 29.253 35.984 31.217C35.59 31.473 35.18 31.702 34.759 31.902C34.709 31.926 34.66 31.951 34.61 31.974C31.714 33.291 28.286 33.291 25.39 31.974C25.34 31.951 25.29 31.926 25.241 31.902C24.819 31.702 24.41 31.473 24.016 31.217C21.001 29.253 19 25.858 19 22ZM52.729 46.323C50.462 39.629 45.29 34.219 38.682 31.649C41.325 29.268 43 25.83 43 22C43 14.832 37.168 9 30 9C22.832 9 17 14.832 17 22C17 25.83 18.675 29.268 21.319 31.649C14.711 34.22 9.539 39.629 7.272 46.323C3.959 41.724 2 36.088 2 30C2 14.561 14.561 2 30 2C45.439 2 58 14.561 58 30C58 36.088 56.041 41.724 52.729 46.323Z"
                fill="white"
              />
            </svg>
            <ul className="user-details">
              <li>{selector.login.data.username}</li>
              <li>
                <button
                  onClick={() => setModal((prevState) => !prevState)}
                  className="btn-change-password"
                >
                  Change Password
                </button>
              </li>
            </ul>
          </div>
          <div className="tooltip" data-tooltip="Logout">
          <svg 
            onClick={logout}
            width="25"
            height="25"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M39.4581 8.77067C38.2485 8.30848 36.894 8.91352 36.4317 10.1227C35.9694 11.3316 36.5747 12.6866 37.7836 13.1489C46.0682 16.3171 51.7969 24.3028 51.7969 33.5156C51.7969 45.5345 42.0189 55.3125 30 55.3125C17.9811 55.3125 8.20312 45.5345 8.20312 33.5156C8.20312 24.2978 13.9345 16.3165 22.2156 13.1493C23.4246 12.6868 24.0298 11.3318 23.5675 10.1229C23.1049 8.91387 21.7496 8.30883 20.5411 8.77102C10.4514 12.6301 3.51562 22.3467 3.51562 33.5156C3.51562 48.1549 15.3621 60 30 60C44.6393 60 56.4844 48.1535 56.4844 33.5156C56.4844 22.3418 49.5443 12.628 39.4581 8.77067Z"
                fill="white"
              />
              <path
                d="M30 0C28.7055 0 27.6562 1.0493 27.6562 2.34375V25.295C27.6562 26.5895 28.7055 27.6388 30 27.6388C31.2945 27.6388 32.3438 26.5894 32.3438 25.295V2.34375C32.3438 1.0493 31.2945 0 30 0Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="60" height="60" fill="white" />
              </clipPath>
            </defs>
          </svg>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
