import React from "react";
import { useState } from "react";
import { alertError, alertSuccess } from "../lib/alert";
import { RegisterEndpoint } from "../lib/api/UserApi";
import { Link, useNavigate } from "react-router";
import AuthForm from "../components/Auth/AuthForm";

export default function UserRegister() {
  const [form, setForm] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      await alertError("Password don't match");
      return;
    }

    const response = await RegisterEndpoint(form);
    const responseBody = await response.json();

    if (response.status === 200) {
      await alertSuccess("User Created Successfully");
      await navigate({
        pathname: "/login",
      });
    } else {
      await alertError(responseBody.errors);
    }
  }

  return (
    <div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient rounded-full mb-4">
          <i className="fas fa-user-plus text-3xl text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">Contact Management</h1>
        <p className="text-gray-300 mt-2">Create a new account</p>
      </div>
      <AuthForm
        submitText="Register"
        onSubmit={handleSubmit}
        fields={[
          {
            type: "text",
            label: "Username",
            name: "username",
            icon: "fas fa-user",
            placeholder: "Choose a username",
            required: true,
            value: form.username,
            onChange: handleChange,
          },
          {
            type: "text",
            label: "Full Name",
            name: "name",
            icon: "fas fa-id-card",
            placeholder: "Enter your full name",
            required: true,
            value: form.name,
            onChange: handleChange,
          },
          {
            type: "password",
            label: "Password",
            name: "password",
            icon: "fas fa-lock",
            placeholder: "Create a Password",
            required: true,
            value: form.password,
            onChange: handleChange,
          },
          {
            type: "password",
            label: "Confirm Password",
            name: "confirmPassword",
            icon: "fas fa-lock",
            placeholder: "Create a Password",
            required: true,
            value: form.confirmPassword,
            onChange: handleChange,
          },
        ]}
      />
      <div className="text-center text-sm text-gray-400">
        Already have an account?
        <Link
          to="/login"
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
