import React from "react";
import AuthForm from "../components/Auth/AuthForm";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { LoginEndpoint } from "../lib/api/UserApi";
import { useLocalStorage } from "react-use";
import { alertError, alertSuccess } from "../lib/alert";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [_, setToken] = useLocalStorage("token", "");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await LoginEndpoint(form);
    const responseBody = await response.json();

    if (response.status === 200) {
      const token = responseBody.data.token;
      setToken(token);
      await navigate({
        pathname: "/dashboard/contacts",
      });
    } else {
      await alertError(responseBody.errors);
    }
  }

  return (
    <>
      <div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient rounded-full mb-4">
            <i className="fas fa-address-book text-3xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Contact Management</h1>
          <p className="text-gray-300 mt-2">Sign in to your account</p>
        </div>
        <AuthForm
          submitText="Login"
          onSubmit={handleSubmit}
          fields={[
            {
              type: "text",
              label: "Username",
              name: "username",
              icon: "fas fa-user",
              placeholder: "Your Username",
              required: true,
              value: form.username,
              onChange: handleChange,
            },
            {
              type: "password",
              label: "Password",
              name: "password",
              icon: "fas fa-lock",
              placeholder: "Your Password",
              required: true,
              value: form.password,
              onChange: handleChange,
            },
          ]}
        />
        <div className="text-center text-sm text-gray-400">
          Don't have account?
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
