import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearSomeState, login } from "../../redux/features/UserSlice";
import { loginSchema } from "../../schema";
import "./login.css";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError } = useSelector((state) => ({ ...state.user }));

  const { values, handleBlur, handleChange, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (isError) {
      toast.warn("Invalid login credentials");
      dispatch(clearSomeState());
    }
    if (isSuccess) {
      toast.success("Successful login!");
      dispatch(clearSomeState());
      navigate("/home");
    }
  });

  return (
    <div>
      <div className="login-wrapper">
        <h1>Login to your account</h1>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password ? <p>{errors.password}</p> : null}
          <div className="bttns">
            <button type="submit" className="login-btn">
              Login
            </button>
            <Link to="/forgotPassword" className="fgpassword">
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
