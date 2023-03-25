import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../globals";
import { forgotPasswordSchema } from "../../schema";
import "./forgotPassword.css";

const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { values, handleBlur, handleSubmit, handleChange, errors } = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      fetch(`${API}/users/forgotPassword`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((data) => {
          console.log(data);
          if (data.status === 404) {
            throw new Error(data.statusText);
          }
          navigate("/");
          toast.success("Password reset link sent to your email successfully!");
          return data.json();
        })
        .catch((err) => {
          toast.warn("There is no user created with this email ID.");
        });
    },
  });

  return (
    <div>
      <div className="fg-wrapper">
        <h1>Enter email associated to your account</h1>
        <form className="fg-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email ? <p>{errors.email}</p> : null}
          <button type="submit" className="btn btn-primary fg-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
