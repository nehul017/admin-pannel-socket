import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import profile from "../../image/a.png";
import email from "../../image/email.jpg";
import pass from "../../image/pass.png";
import "./login.css";
import axios from "axios";

const Login = () => {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitLoginForm = async (data) => {
    const { temail, tpassword } = data;
    const body = {
      email: temail,
      password: tpassword,
    };

    await axios
      .post("http://localhost:5000/login", body)
      .then(({ data }) => {
        navigate("/admin/dashboard");
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
            <h1>Login Page</h1>
            <form name="admin-login">
              <div>
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
              {errors.tpassword && errors.tpassword.type === "required" && (
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
                    required: true,
                  })}
                />
              </div>
              {errors.tpassword && errors.tpassword.type === "required" && (
                <div className="error">Please enter password.</div>
              )}
            </form>
            <div className="error">{errorMessage}</div>
            <div className="login-button">
              <button
                type="submit"
                onClick={handleSubmit(handleSubmitLoginForm)}
              >
                Login
              </button>
            </div>

            <p className="link">
              <Link to="/admin/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
