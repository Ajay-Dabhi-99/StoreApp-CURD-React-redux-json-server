import React, { useEffect, useState } from "react";
import logo from "../Assets/images/loq8Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInUser } from "./Slice/StoreSlice";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem("user");
  const userInfo = JSON.parse(user);
  const token = userInfo || null;

  // onChange Handler
  const setFormField = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  // USer Login API Calling
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData && userData.email && userData.password !== "") {
      try {
        setLoading(false);
        let response = await dispatch(logInUser()).unwrap();
        const foundUser = response.data.find(
          (user) =>
            user.email === userData.email && user.password === userData.password
        );
        if (foundUser) {
          localStorage.setItem("user", JSON.stringify(foundUser));
          navigate("../dashboard");
          toast.success("Login successful!");
        } else {
          toast.error("Invalid username or password");
        }
      } catch (error) {
        toast.error("Something Went To Wrong!!!");
      }
      setLoading(true);
    } else {
      toast.warn("Email or password is Required");
    }
  };

  // Privet Authentication
  useEffect(() => {
    if (token !== null) return navigate("../dashboard");
  }, [token]);

  return (
    <div className="loginWarpper">
      <div className="loginBox">
        <img src={logo} alt="LOQ8 Logo" className="mx-auto" />
        <form>
          <input
            type="text"
            name="email"
            placeholder="Username"
            value={userData.email}
            onChange={(e) => {
              setFormField("email", e.target.value);
            }}
            autoComplete="off"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => {
              setFormField("password", e.target.value);
            }}
            autoComplete="off"
            required
          />
          {loading ? (
            <button className="btn" onClick={handleSubmit} type="submit">
              Login
            </button>
          ) : (
            <button
              type="button"
              className="flex w-full items-center bg-[#71a73f] rounded-[10px] py-2.5 text-white font-bold justify-center transition ease-in-out duration-150 cursor-not-allowed"
              disabled=""
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              wait...
            </button>
          )}
        </form>
        <Link className="inline-block text-white font-semibold pt-4" to={"../register"}>Don’t have an account? Register</Link>
      </div>
    </div>
  );
}

export default Login;
