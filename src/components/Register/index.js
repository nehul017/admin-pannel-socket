import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import profile from "../../image/a.png";
import email from "../../image/email.jpg";
import pass from "../../image/pass.png";
import name from "../../image/name.png";
import axios from "axios";

import "./register.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitLoginForm = async (data) => {
    const { temail, tpassword, lname, fname } = data;
    const body = {
      email: temail,
      password: tpassword,
      first_name: fname,
      last_name: lname,
    };

    await axios
      .post("http://localhost:5000/register", body)
      .then(({ data }) => {
        navigate("/admin/login");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
          <div>
            <h1>Register Page</h1>
            <form name="admin-register">
              <div>
                <img src={name} alt="email" className="email" />
                <input
                  type="text"
                  placeholder="First Name"
                  className="name"
                  name="fname"
                  id="fname"
                  {...register("fname", {
                    required: "First Name is required",
                  })}
                />
              </div>
              {errors.fname && errors.fname.type === "required" && (
                <div className="error">Please enter First name.</div>
              )}
              <div className="second-input">
                <img src={name} alt="email" className="email" />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="name"
                  name="lname"
                  id="lname"
                  {...register("lname", {
                    required: "Last Name is required",
                  })}
                />
              </div>
              {errors.lname && errors.lname.type === "required" && (
                <div className="error">Please enter Last name.</div>
              )}
              <div className="second-input">
                <img src={email} alt="email" className="email" />
                <input
                  type="text"
                  placeholder="Email"
                  className="name"
                  name="temail"
                  id="temail"
                  {...register("temail", {
                    required: "email is required",
                  })}
                />
              </div>
              {errors.temail && errors.temail.type === "required" && (
                <div className="error">Please enter email.</div>
              )}
              <div className="second-input">
                <img src={pass} alt="pass" className="email" />
                <input
                  type="password"
                  placeholder="Password"
                  className="name"
                  name="tpassword"
                  id="tpassword"
                  {...register("tpassword", {
                    required: "Password is required",
                  })}
                />
              </div>
              {errors.tpassword && errors.tpassword.type === "required" && (
                <div className="error">Please enter email.</div>
              )}
            </form>
            <div className="error">{errorMessage}</div>
            <div className="login-button">
              <button
                type="submit"
                onClick={handleSubmit(handleSubmitLoginForm)}
              >
                Register
              </button>
            </div>
            <p className="link">
              <Link to="/admin/login">Login in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
