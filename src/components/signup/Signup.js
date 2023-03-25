import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../globals";
import { signUpSchema } from "../../schema";
import "./signup.css";

const initialValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
};

const Signup = () => {
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      fetch(`${API}/users/signup`, {
        method: "POST",
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
          action.resetForm();
          navigate("/");
          toast.success(
            "Please verify your email by clicking on the link sent to your email address."
          );
          return data.json();
        })
        .catch((err) => {
          toast.warn("Something went wrong. Please try again later");
        });
    },
  });

  return (
    <div>
      <div className="signup-wrapper">
        <h1>Create your account</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.name ? <p>{errors.name}</p> : null}
          <input
            type="text"
            placeholder="Enter your email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.email ? <p>{errors.email}</p> : null}
          <input
            type="number"
            placeholder="Phone no."
            name="phone"
            id="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.phone ? <p>{errors.phone}</p> : null}
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.password ? <p>{errors.password}</p> : null}
          <div className="bttns">
            <button type="submit">Sign Up</button>
            <Link to="/forgotPassword" className="fgpassword">
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
