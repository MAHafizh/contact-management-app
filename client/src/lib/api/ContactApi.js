export const ContactCreateEndpoint = async (
  token,
  { firstName, lastName, email, phone }
) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
    }),
  });
};

export const ContactListEndpoint = async (
  token,
  { name, phone, email, page }
) => {
  const url = new URL(`${import.meta.env.VITE_API_PATH}/contacts`);

  if (name) url.searchParams.append("name", name);
  if (phone) url.searchParams.append("phone", phone);
  if (email) url.searchParams.append("email", email);
  if (page) url.searchParams.append("page", page);

  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};

export const ContactDeleteEndpoint = async (token, id) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};
