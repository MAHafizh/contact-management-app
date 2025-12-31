import React, { useState } from "react";
import { useParams } from "react-router";
import { ContactDetailEndpoint } from "../../lib/api/ContactApi";
import { useLocalStorage, useEffectOnce } from "react-use";
import { alertError } from "../../lib/alert";
import ShowAddress from "./Address/ShowAddress";

export default function DetailContact() {
  const params = useParams();
  const id = Number(params.id);
  const [token, _] = useLocalStorage("token", "");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  async function fetchContactDetail() {
    try {
      const response = await ContactDetailEndpoint(token, id);
      const responseBody = await response.json();

      if (response.status === 200) {
        setForm({
          firstName: responseBody.data.first_name,
          lastName: responseBody.data.last_name,
          email: responseBody.data.email,
          phone: responseBody.data.phone,
        });
      } else {
        await alertError(responseBody.errors);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffectOnce(() => {
    fetchContactDetail();
  });

  return (
    <div className="container mx-auto px-4 py-8 flex-grow">
      <div className="flex items-center mb-6">
        <a
          href="dashboard.html"
          className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
        >
          <i className="fas fa-arrow-left mr-2" /> Back to Contacts
        </a>
        <h1 className="text-2xl font-bold text-white flex items-center">
          <i className="fas fa-id-card text-blue-400 mr-3" /> Contact Details
        </h1>
      </div>
      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div className="p-8">
          {/* Contact Header */}
          <div className="mb-8 text-center">
            <div className="w-20 h-20 bg-gradient rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
              <i className="fas fa-user text-3xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {form.firstName}
              <span> {form.lastName}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient mx-auto rounded-full" />
          </div>
          {/* Contact Information */}
          <div className="space-y-5 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
                <div className="flex items-center mb-2">
                  <i className="fas fa-user-tag text-blue-400 mr-2" />
                  <h3 className="text-gray-300 text-sm font-medium">
                    First Name
                  </h3>
                </div>
                <p className="text-white text-lg ml-6">{form.firstName}</p>
              </div>
              <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
                <div className="flex items-center mb-2">
                  <i className="fas fa-user-tag text-blue-400 mr-2" />
                  <h3 className="text-gray-300 text-sm font-medium">
                    Last Name
                  </h3>
                </div>
                <p className="text-white text-lg ml-6">{form.lastName}</p>
              </div>
            </div>
            <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
              <div className="flex items-center mb-2">
                <i className="fas fa-envelope text-blue-400 mr-2" />
                <h3 className="text-gray-300 text-sm font-medium">Email</h3>
              </div>
              <p className="text-white text-lg ml-6">{form.email}</p>
            </div>
            <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
              <div className="flex items-center mb-2">
                <i className="fas fa-phone text-blue-400 mr-2" />
                <h3 className="text-gray-300 text-sm font-medium">Phone</h3>
              </div>
              <p className="text-white text-lg ml-6">{form.phone}</p>
            </div>
          </div>
          {/* Addresses Section */}
          <ShowAddress />
          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <a
              href="dashboard.html"
              className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
            >
              <i className="fas fa-arrow-left mr-2" /> Back
            </a>
            <a
              href="edit_contact.html"
              className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
            >
              <i className="fas fa-user-edit mr-2" /> Edit Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
