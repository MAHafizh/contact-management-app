import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ContactCreateEndpoint } from "../../lib/api/ContactApi";
import { useLocalStorage } from "react-use";
import { alertError, alertSuccess } from "../../lib/alert";

export default function CreateContact() {
  const [token, _] = useLocalStorage("token", "");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await ContactCreateEndpoint(token, form);
    const responseBody = await response.json();

    if (response.status === 200) {
      await alertSuccess("Contact Created Successfully");
      navigate({
        pathname: "/dashboard/contacts",
      });
    } else {
      await alertError(responseBody.errors);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex-grow">
      <div className="flex items-center mb-6">
        <Link
          to="/dashboard/contacts"
          className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
        >
          <i className="fas fa-arrow-left mr-2" /> Back to Contacts
        </Link>
        <h1 className="text-2xl font-bold text-white flex items-center">
          <i className="fas fa-user-plus text-blue-400 mr-3" /> Create New
          Contact
        </h1>
      </div>
      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user-tag text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter first name"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user-tag text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter last name"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter email address"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-phone text-gray-500" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter phone number"
                  required
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Link
                to="/dashboard/contacts"
                className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
              >
                <i className="fas fa-times mr-2" /> Cancel
              </Link>
              <button
                type="submit"
                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2" /> Create Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
