import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";

import { toast } from "react-toastify";
import loader from "../../assets/loader.gif";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../components/Context/AuthContext.jsx";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoading(true);
    const { email, password } = data;

    try {
      const { data: responseData } = await apiRequest.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(responseData.data.user));

      toast.success(responseData.message, {
        position: "top-right",
        autoClose: 1500,
      });
      reset();
      setTimeout(() => {
        updateUser(responseData.data.user);
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-content">
        <h3 className="login-header">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-form-group">
            <label htmlFor="email" className="login-form-label">
              Email
            </label>
            <input
              type="email"
              className="login-form-control"
              id="email"
              placeholder="Enter Your Email"
              autoComplete="off"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
            />
            {errors.email && (
              <p className="login-error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">
              Password
            </label>
            <div className="login-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="login-form-control"
                id="password"
                placeholder="Enter Your Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
                  },
                })}
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                }`}
                onClick={toggleShowPassword}
              ></i>
            </div>
            {errors.password && (
              <p className="login-error-message">{errors.password.message}</p>
            )}
          </div>
          <div className="register-section">
            <p>If you don't have an account?</p>
            <Link to="/signup">Register</Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ height: "50px" }}
            className="btn btn-primary"
          >
            {loading ? (
              <img
                src={loader}
                style={{ height: "100%", objectFit: "cover" }}
              />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
