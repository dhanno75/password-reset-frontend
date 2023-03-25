import { useFormik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../globals";
import { resetYourPassword } from "../../schema";
import "./resetPassword.css";

const initialValues = {
  password: "",
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const { values, handleBlur, handleSubmit, handleChange, errors } = useFormik({
    initialValues,
    validationSchema: resetYourPassword,
    onSubmit: (values) => {
      fetch(`${API}/users/resetPassword/${token}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((data) => {
          if (data.status === 400) {
            throw new Error(data.statusText);
          }
          return data.json();
        })
        .then((data) => {
          localStorage.setItem("token", data.token);
          navigate("/");
          toast.success(
            "Password updated successfully. Please login using your new password!"
          );
        })
        .catch((err) => {
          toast.warn("Token is invalid or expired");
        });
    },
  });

  return (
    <div>
      <div className="fg-wrapper">
        <h1>Reset your password</h1>
        <form className="fg-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter your email"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password ? <p>{errors.password}</p> : null}
          <button type="submit" className="btn btn-primary fg-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
