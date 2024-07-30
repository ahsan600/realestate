import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./register.scss";
import axios from "axios";
import { toast } from "react-toastify";
import loader from "../../assets/loader.gif";
import { Link } from "react-router-dom";
function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleConfirmShowPassword = () =>
    setConfirmShowPassword(!confirmShowPassword);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("phoneno", data.ph_no);
    formData.append("password", data.password);

    if (data.image.length > 0) {
      formData.append("avatar", data.image[0]);
    }

    const { data: responseData } = await axios.post(
      "/api/auth/register",
      formData
    );
    setLoading(false);
    toast.success(responseData.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    reset();
  };
  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);
  return (
    <div className="form-container">
      <div className="form-content">
        <h3>Register</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter Your Username"
              autoComplete="off"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z0-9_]{3,16}$/,
                  message: "Invalid username",
                },
              })}
            />
            {errors.username && (
              <p className="error-message">{errors.username.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
              autoComplete="off"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="ph_no" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="ph_no"
              placeholder="Enter Your Phone Number"
              {...register("ph_no", {
                required: "Phone number is required",
              })}
            />
            {errors.ph_no && (
              <p className="error-message">{errors.ph_no.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
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
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <div className="password-wrapper">
              <input
                type={confirmShowPassword ? "text" : "password"}
                className="form-control"
                id="confirm_password"
                placeholder="Confirm Your Password"
                {...register("confirm_password", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
              <i
                className={`fa-solid ${
                  confirmShowPassword ? "fa-eye" : "fa-eye-slash"
                }`}
                onClick={toggleConfirmShowPassword}
              ></i>
            </div>
            {errors.confirm_password && (
              <p className="error-message">{errors.confirm_password.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Upload Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/png, image/jpeg"
              {...register("image")}
            />
            {errors.image && (
              <p className="error-message">{errors.image.message}</p>
            )}
          </div>
          <div className="register-section">
            <p>If you already have an account?</p>
            <Link to="/signin">Login</Link>
          </div>
          <button
            type="submit"
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

export default Register;
