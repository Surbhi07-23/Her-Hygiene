import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../api/auth";

const Register = () => {

  const navigate = useNavigate();

  // ---------------- FORM ----------------
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // ---------------- ERROR ----------------
  const [error, setError] = useState("");

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError("");
  };

  // ---------------- VALIDATE EMAIL ----------------
  const isValidEmail = (email) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  };

  // ---------------- HANDLE SUBMIT ----------------
  const handleSubmit = async (e) => {

    e.preventDefault();

    // EMPTY FIELDS
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {

      setError("Please fill all fields");
      return;
    }

    // EMAIL VALIDATION
    if (!isValidEmail(form.email)) {

      setError("Please enter a valid email address");
      return;
    }

    // PASSWORD LENGTH
    if (form.password.length < 6) {

      setError(
        "Password should be at least 6 characters"
      );

      return;
    }

    // CONFIRM PASSWORD
    if (
      form.password !== form.confirmPassword
    ) {

      setError("Passwords do not match");
      return;
    }

    try {

      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password
      });

      alert("Registration successful!");

      navigate("/");

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
        "Error registering account"
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-3xl shadow-lg p-8"
      >

        {/* TITLE */}
        <h2 className="text-4xl font-bold text-center text-rose-500 mb-6">

          Create Account

        </h2>

        {/* ERROR BOX */}
        {error && (

          <div className="bg-pink-100 border border-pink-200 text-rose-600 rounded-2xl p-4 mb-5 text-center font-medium">

            ⚠️ {error}

          </div>

        )}

        {/* NAME */}
        <div className="mb-4">

          <label className="block text-gray-700 mb-2">

            Name

          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
            className="w-full border border-pink-100 rounded-xl p-3 outline-none focus:border-rose-400"
          />

        </div>

        {/* EMAIL */}
        <div className="mb-4">

          <label className="block text-gray-700 mb-2">

            Email

          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
            className="w-full border border-pink-100 rounded-xl p-3 outline-none focus:border-rose-400"
          />

        </div>

        {/* PASSWORD */}
        <div className="mb-4">

          <label className="block text-gray-700 mb-2">

            Password

          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full border border-pink-100 rounded-xl p-3 outline-none focus:border-rose-400"
          />

        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-6">

          <label className="block text-gray-700 mb-2">

            Confirm Password

          </label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full border border-pink-100 rounded-xl p-3 outline-none focus:border-rose-400"
          />

        </div>

        {/* BUTTON */}
        <button
          className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl p-3 text-lg font-medium transition"
        >

          Register

        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-500 mt-5">

          Already have an account?
          {" "}

          <span
            onClick={() => navigate("/")}
            className="text-rose-500 cursor-pointer font-medium"
          >
            Login
          </span>

        </p>

      </form>

    </div>
  );
};

export default Register;