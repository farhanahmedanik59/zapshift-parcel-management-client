import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContex } from "../../../contexts/AuthContex/AuthContex";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";

const Register = () => {
  const { registerUser, updateUserProfile, googleAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleregister = (data) => {
    const profileImage = data.image[0];
    registerUser(data.email, data.password).then((usercred) => {
      if (usercred) {
        const formdata = new FormData();
        formdata.append("image", profileImage);
        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API}`, formdata).then((res) => {
          axiosSecure
            .post("/users", {
              email: data.email,
              displayName: data.name,
              photoURL: res.data.data.display_url,
            })
            .then((res) => console.log(res));
          const update = { displayName: data.name, photoURL: res.data.data.display_url };
          updateUserProfile(update).then(console.log("updated"));
        });
      }
    });
  };

  const handleGoogleLogin = () => {
    googleAuth().then((result) => {
      axiosSecure.post("/users", {
        email: result.user.email,
        displayName: result.user.displayName || "No Display Name",
        photoURL: result.user.photoURL,
      });
      navigate(location.state || "/");
    });
  };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-sm bg-white shadow-xl rounded-lg border border-gray-200 p-8">
          {/* Header */}
          <h1 className="text-4xl font-extrabold text-black mb-6">Register</h1>

          {/* Login with ZapShift */}
          <p className="text-sm text-gray-700 mb-6 border-b border-dotted border-gray-400 pb-2">Register with **ZapShift**</p>

          <form onSubmit={handleSubmit(handleregister)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">**Name**</label>
              <input
                {...register("name")}
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                **Email**
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            {/* image input */}
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              **File**
            </label>
            <input
              type="file"
              {...register("image", {
                required: true,
                validate: (value) => {
                  const file = value?.[0];
                  const alowed = ["image/png"];
                  if (!alowed.includes(file.type)) {
                    return "only png alowed";
                  }
                },
              })}
              className="file-input mb-2"
            />
            {errors.image?.message && <p>{errors.image?.message}</p>}
            {/* Password Input */}
            <div className="mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                **Password**
              </label>
              <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                id="password"
                placeholder=""
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              {errors.password?.type === "required" && <p>email is required</p>}
            </div>

            {/* Forgot Password Link */}
            <div className="text-sm mb-6">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                **Forgot Password?**
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-lime-400 text-white font-semibold rounded-md shadow-md hover:bg-lime-500 focus:outline-none focus:ring-4 focus:ring-lime-300 transition duration-150 ease-in-out"
              // Note: I used a standard lime color as the exact green/yellow shade might need custom color configuration in tailwind.config.js
            >
              **Login**
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-sm text-center text-gray-700">
            Don't have any account?{" "}
            <a href="/auth/login" className="text-green-600 font-medium hover:text-green-700">
              **Login**
            </a>
          </p>

          {/* OR Separator */}
          <div className="flex items-center justify-center my-4">
            <span className="text-sm text-gray-500">**Or**</span>
          </div>

          {/* Login with Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {/* You'd replace this with an actual Google icon */}
            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.343c-1.84 2.87-4.79 4.93-8.843 4.93-6.14 0-11.13-4.99-11.13-11.13S17.36 10.75 23.5 10.75c3.39 0 6.17 1.41 8.24 3.3l5.5-5.22C34.75 4.98 29.56 2 23.5 2 12.72 2 4 10.72 4 21.5S12.72 41 23.5 41c10.78 0 19.5-8.72 19.5-19.5 0-1.38-.18-2.73-.49-4z"
              />
              <path fill="#FF3D00" d="M6.3 15.26c-1.09 3.03-1.66 6.27-1.66 9.74 0 3.47.57 6.71 1.66 9.74l5.37-4.14C11.39 28.53 11.13 25.13 11.13 21.5s.26-7.03.74-10.43L6.3 15.26z" />
              <path fill="#4CAF50" d="M23.5 41c5.96 0 11.23-2.43 14.99-6.33L29.12 28.4C26.7 30.2 23.5 31.25 23.5 31.25c-6.14 0-11.13-4.99-11.13-11.13h-7.8c.84 4.54 3.23 8.64 6.88 11.34L23.5 41z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.343c-.27 1.83-1.07 3.51-2.22 4.92l5.5 5.23c3.6-3.23 6.09-7.59 6.09-12.15C44.71 21.78 44.3 20.89 43.61 20.08z" />
            </svg>
            **Login with google**
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
