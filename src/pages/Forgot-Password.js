import React from 'react';
import "../assets/css/styles.min.css";

const ForgotPassword = () =>{
    return(
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
                 <p className="text-center fs-4 mb-4 fw-bold">Forgot Password</p>
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  </div>
                  {/* <a href="./index.html" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Recover Password</a> */}
                  <button type="submit" class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Recover Password</button>
                  {/* <div className="d-flex align-items-center justify-content-center">
                    <p className="fs-4 mb-0 fw-bold">New to Modernize?</p>
                    <a className="text-primary fw-bold ms-2" href="Register">Create an account</a>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
};

export default ForgotPassword;