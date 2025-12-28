import React from "react";

export default function AuthForm({ fields, submitText, onSubmit }) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        {fields.map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              {field.label}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className={`${field.icon} text-gray-500`} />
              </div>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={field.value}
                onChange={field.onChange}
                className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-gradient text-white py-3 rounded-lg hover:opacity-90 transition"
        >
          {submitText}
        </button>
      </form>
    </div>
  );
}
