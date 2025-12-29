/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useEffectOnce, useLocalStorage } from "react-use";
import {
  ContactDeleteEndpoint,
  ContactListEndpoint,
} from "../lib/api/ContactApi";
import { alertConfirm, alertError, alertSuccess } from "../lib/alert";
import { Link } from "react-router";
import CardContact from "../components/Contact/CardContact";
import SearchContact from "../components/Contact/SearchContact";

export default function Contact() {
  const [token, _] = useLocalStorage("token", "");
  const [page, setPage] = useState({
    currentPage: 1,
    totalPage: 1,
  });
  const [contacts, setContacts] = useState([]);
  const [searchParams, setSearchParams] = useState({});

  async function fetchContact() {
    try {
      const response = await ContactListEndpoint(token, {
        page: page.currentPage,
        ...searchParams,
      });
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status === 200) {
        setContacts(responseBody.data);
        setPage((prev) => ({
          ...prev,
          totalPage: responseBody.paging.total_page,
        }));
      } else {
        await alertError(responseBody.errors);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSearchContact(searchData) {
    setPage((prev) => ({
      ...prev,
      currentPage: 1,
    }));
    setSearchParams(searchData);
  }

  function getPages() {
    const pages = [];
    for (let i = 1; i <= page.totalPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  async function handlePageChange(page) {
    setPage((prev) => ({
      ...prev,
      currentPage: page,
    }));
  }

  async function handleContactDelete(id) {
    if (!(await alertConfirm("You won't be able to revert this!"))) {
      return;
    } else {
      const response = await ContactDeleteEndpoint(token, id);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status === 200) {
        await alertSuccess("Contact Deleted Successfully");
        await fetchContact();
      } else {
        await alertError(responseBody.errors);
      }
    }
  }

  useEffect(() => {
    fetchContact().then(() => console.log("Contact Fetched"));
  }, [page.currentPage, searchParams]);

  useEffectOnce(() => {
    const toggleButton = document.getElementById("toggleSearchForm");
    const searchFormContent = document.getElementById("searchFormContent");
    const toggleIcon = document.getElementById("toggleSearchIcon");

    searchFormContent.style.transition =
      "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out";
    searchFormContent.style.overflow = "hidden";
    searchFormContent.style.maxHeight = "0px";
    searchFormContent.style.opacity = "0";
    searchFormContent.style.marginTop = "0";

    function toggleSearchForm() {
      if (searchFormContent.style.maxHeight !== "0px") {
        // Hide the form
        searchFormContent.style.maxHeight = "0px";
        searchFormContent.style.opacity = "0";
        searchFormContent.style.marginTop = "0";
        toggleIcon.classList.remove("fa-chevron-up");
        toggleIcon.classList.add("fa-chevron-down");
      } else {
        // Show the form
        searchFormContent.style.maxHeight =
          searchFormContent.scrollHeight + "px";
        searchFormContent.style.opacity = "1";
        searchFormContent.style.marginTop = "1rem";
        toggleIcon.classList.remove("fa-chevron-down");
        toggleIcon.classList.add("fa-chevron-up");
      }
    }

    toggleButton.addEventListener("click", toggleSearchForm);

    return () => {
      toggleButton.removeEventListener("click", toggleSearchForm);
    };
  });
  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      <div className="flex items-center mb-6">
        <i className="fas fa-users text-blue-400 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-white">My Contacts</h1>
      </div>
      {/* Search form */}
      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <i className="fas fa-search text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold text-white">
              Search Contacts
            </h2>
          </div>
          <button
            type="button"
            id="toggleSearchForm"
            className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200"
          >
            <i className="fas fa-chevron-down text-lg" id="toggleSearchIcon" />
          </button>
        </div>
        <div id="searchFormContent" className="mt-4">
          <SearchContact onSubmit={handleSearchContact} />
        </div>
      </div>
      {/* Contact cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Contact Card */}
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
          <Link to="/dashboard/contacts/create" className="block p-6 h-full">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                <i className="fas fa-user-plus text-3xl text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Create New Contact
              </h2>
              <p className="text-gray-300">Add a new contact to your list</p>
            </div>
          </Link>
        </div>
        {/* Contact Card 1 */}
        {contacts.map((contact) => (
          <CardContact
            key={contact.id}
            contact={contact}
            onDelete={() => handleContactDelete(contact.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center">
        <nav className="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in">
          {page.currentPage > 1 && (
            <a
              href="#"
              onClick={() => handlePageChange(page.currentPage - 1)}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
            >
              <i className="fas fa-chevron-left mr-2" /> Previous
            </a>
          )}
          {getPages().map((currPage) => {
            if (currPage === page.currentPage) {
              return (
                <a
                  key={currPage}
                  href="#"
                  onClick={() => handlePageChange(currPage)}
                  className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md"
                >
                  {currPage}
                </a>
              );
            } else {
              return (
                <a
                  key={currPage}
                  href="#"
                  onClick={() => handlePageChange(currPage)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
                >
                  {currPage}
                </a>
              );
            }
          })}

          {page.currentPage < page.totalPage && (
            <a
              href="#"
              onClick={() => handlePageChange(page.currentPage + 1)}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
            >
              Next <i className="fas fa-chevron-right ml-2" />
            </a>
          )}
        </nav>
      </div>
      {/* Footer */}
      <div className="mt-10 mb-6 text-center text-gray-400 text-sm animate-fade-in">
        <p>© 2025 Contact Management. All rights reserved.</p>
      </div>
    </main>
  );
}
