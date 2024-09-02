import React, { useState } from 'react';
import "../assets/css/styles.min.css";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { json, useNavigate } from 'react-router-dom';
import { login } from '../restApi/ApplicationRestApi';
import { doLogin } from '../auth/authentication';


const Login = () => {

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (event, field) => {
    let actualValue = event.target.value
    setLoginDetails({
      ...loginDetails,
      [field]: actualValue
    })

    setErrors({
      ...errors,
      [field]: '',
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(loginDetails);
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    login(loginDetails).then((response) => {
      if (response.status === "SUCCESS") {
        toast.success(response.response.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide
        });

        doLogin(response, () => {
          console.log("login details saved successfully");
        })

        setTimeout(() => {
          navigate('/user/User-Dashboard');
        }, 5000);
      }
    }).catch(error => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide
      });
    });
  }


  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'The email is required. Please provide a email.';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'The email is not in the correct format. Please enter a valid email.';
    }

    if (!values.password) {
      errors.password = 'Password is required. Please provide a password';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@.#$%^&*])[a-zA-Z0-9!@.#$%^&*]{8,15}/.test(values.password)) {
      errors.password = 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    return errors;
  };

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      <div
        className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  {/* <a href="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                  <img src="../assets/images/logos/dark-logo.svg" width="180" alt=""/>
                </a> */}
                  <p className="text-center fs-4 mb-4 fw-bold">Login User</p>
                  <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e) => handleChange(e, 'email')} value={loginDetails.email} aria-describedby="emailHelp" />
                      {errors.email && (<span style={{ color: 'red' }}>{errors.email}</span>)}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                      <input type="password" className="form-control" onChange={(e) => handleChange(e, 'password')} value={loginDetails.password} id="exampleInputPassword1" />
                      {/* {errors.password && <label htmlFor="exampleInputPassword1" className="form-label">{errors.password}</label>} */}
                      {errors.password && (<span style={{ color: 'red' }}>{errors.password}</span>)}
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="form-check">
                        <input className="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" />
                        <label className="form-check-label text-dark" htmlFor="flexCheckChecked">
                          Remeber this Device
                        </label>
                      </div>
                      <a className="text-primary fw-bold" href="Forgot-Password">Forgot Password ?</a>
                    </div>
                    {/* <a href="./index.html" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign In</a> */}
                    <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign in</button>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold">Don't have account?</p>
                      <a className="text-primary fw-bold ms-2" href="Register">Sign up</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;