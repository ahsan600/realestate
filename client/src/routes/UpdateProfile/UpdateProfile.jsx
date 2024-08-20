import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./updateprofile.scss";
import { toast } from "react-toastify";
import loader from "../../assets/loader.gif";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../components/Context/AuthContext.jsx";
function UpdateProfile() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const { currentUser, updateUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(currentUser.avatar);
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  function uploader(e) {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => setResult(e.target.result);
    reader.readAsDataURL(imageFile);
    setImage(imageFile);
  }
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", currentUser._id);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("phoneno", data.ph_no);
    formData.append("password", data.password);
    formData.append("avatar", image);
    try {
      const { data: responseData } = await apiRequest.put(
        "/api/user/update-user",
        formData
      );
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
      setTimeout(() => {
        updateUser(responseData.data);
        navigate("/profile");
      }, 1500);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

      reset();
    }
  };
  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);
  return (
    <div className="updateprofile">
      <div className="rightContainer form-container">
        <div className="form-content">
          <h3>Update Information</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                defaultValue={currentUser.username}
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
                defaultValue={currentUser.email}
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
                defaultValue={currentUser.phoneno}
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
                "Update"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="leftContainer">
        <div className="wrapper">
          <div className="update-img">
            <img src={result ? result : currentUser.avatar} alt="" />
            <label htmlFor="file-upload" className="custom-file-upload">
              Upload Image
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                uploader(e);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
