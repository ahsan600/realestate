import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import axios from "axios";
import { toast } from "react-toastify";
import loader from "../../assets/loader.gif";
function Login() {
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
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
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

export default Login;
