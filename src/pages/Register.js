import React, { useState } from 'react';
import "../assets/css/styles.min.css";
import { register } from '../restApi/ApplicationRestApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [registerDetails, setRegisterDetails] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (event, field) => {
    let actualValue = event.target.value
    setRegisterDetails({
      ...registerDetails,
      [field]: actualValue
    })

    setErrors({
      ...errors,
      [field]: '',
    });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate(registerDetails);

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }


    register(registerDetails).then((response) => {

      if (response !== null && response !== '') {
        if (response.status === "SUCCESS") {
          toast.success(response.response, {
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

          setTimeout(() => {
            navigate('/login');
          }, 5000);
        }
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

    if (!values.phoneNumber) {
      errors.phoneNumber = 'The phone number is required. Please provide a phone number.';
    } else if (!/^[0-9]*$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'The Phone number is not in the correct format. Please enter a valid phone number.';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@.#$%^&*])[a-zA-Z0-9!@.#$%^&*]{8,15}/.test(values.password)) {
      errors.password = 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@.#$%^&*])[a-zA-Z0-9!@.#$%^&*]{8,15}/.test(values.confirmPassword)) {
      errors.confirmPassword = 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Your password and confirmation password do not match.';
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
                  <p className="text-center fs-4 mb-4 fw-bold">Register User</p>
                  <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e) => handleChange(e, 'email')} value={registerDetails.email} aria-describedby="emailHelp" />
                      {errors.email && (<span style={{ color: 'red' }}>{errors.email}</span>)}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPhoneNumber1" className="form-label">Phone Number</label>
                      <input type="text" className="form-control" id="exampleInputPhoneNumber1" onChange={(e) => handleChange(e, 'phoneNumber')} value={registerDetails.phoneNumber} aria-describedby="phoneNumberHelp" />
                      {errors.phoneNumber && (<span style={{ color: 'red' }}>{errors.phoneNumber}</span>)}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                      <input type="password" className="form-control" id="exampleInputtext1" value={registerDetails.password} onChange={(e) => handleChange(e, 'password')} aria-describedby="passwordHelp" />
                      {errors.password && (<span style={{ color: 'red' }}>{errors.password}</span>)}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                      <input type="password" className="form-control" value={registerDetails.confirmPassword} onChange={(e) => handleChange(e, 'confirmPassword')} />
                      {errors.confirmPassword && (<span style={{ color: 'red' }}>{errors.confirmPassword}</span>)}
                    </div>
                    {/* <a href="./index.html" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign Up</a> */}
                    <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign Up</button>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                      <a className="text-primary fw-bold ms-2" href="Login">Sign In</a>
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

export default Register;