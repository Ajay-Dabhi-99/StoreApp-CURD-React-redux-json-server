import React, { useState } from "react";
import logo from "../Assets/images/loq8Logo.png";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser, logInUser } from "./Slice/StoreSlice";
import { toast } from "react-toastify";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(true);

  // onChange Handler
  const setFormField = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  //   Register User
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      setLoading(false);
      const payload = { ...userData };
      let findUser = await dispatch(logInUser()).unwrap();
      const foundUser = findUser.data.find(
        (users) => users.email === userData.email
      );
      if (!foundUser) {
        const response = await dispatch(RegisterUser(payload)).unwrap();
        if (response) {
          navigate("../login");
          toast.success("Register successful!");
        } else {
          toast.warn("User Already Register!!");
        }
      } else {
        toast.warn("User Already Register!!");
      }
      setLoading(true);
    } catch (error) {
      toast.error(error);
      setLoading(true);
    }
  };
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
            <button className="btn" onClick={handleRegister} type="submit">
              Register
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
        <Link
          className="inline-block text-white font-semibold pt-4"
          to={"../login"}
        >
          Have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
